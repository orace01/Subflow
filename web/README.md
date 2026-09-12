# SubFlow — Web

Frontend Next.js (App Router) + TypeScript + Tailwind CSS pour SubFlow,
conforme au design neo-brutaliste validé (voir `../design/`), avec une vraie
base de données et un vrai système d'authentification.

## Démarrer

1. Crée un projet sur [supabase.com](https://supabase.com) (gratuit).
2. Dans le dashboard, bouton **Connect → ORM → Prisma**, récupère les deux
   variables et colle-les dans `.env` (copie `.env.example`) : `DATABASE_URL`
   (pooler mode transaction, port 6543) et `DIRECT_URL` (même pooler, mode
   session, port 5432).
3.
   ```bash
   npm install                        # déclenche `prisma generate` (postinstall)
   npx prisma migrate deploy          # applique les migrations sur ta base Supabase
   npm run dev
   ```

Ouvre [http://localhost:3000](http://localhost:3000).

**Sur Vercel** : ajoute les deux mêmes variables (`DATABASE_URL`, `DIRECT_URL`)
dans Project Settings → Environment Variables, puis redéploie. `prisma
generate` tourne automatiquement après `npm install` (script `postinstall`) —
c'était la cause du premier échec de build (types Prisma introuvables).

## Authentification & base de données (réelles)

- **Base de données** : PostgreSQL (Supabase) via Prisma
  (`prisma/schema.prisma`), pilotée par le driver adapter `@prisma/adapter-pg`.
  Cinq tables : `User`, `Session`, `LoginAttempt`, `Subscription`,
  `PriceChange`. Migrations versionnées dans `prisma/migrations/` — générées
  et vérifiées contre un vrai Postgres avant d'être committées, donc prêtes à
  appliquer telles quelles sur Supabase (`prisma migrate deploy`).
  `DATABASE_URL` (pooler Supabase, mode transaction) est utilisé par l'app à
  l'exécution (`lib/db.ts`) ; `DIRECT_URL` (même pooler, mode session) est
  utilisé uniquement par la CLI Prisma pour les migrations
  (`prisma.config.ts`) — le mode transaction ne supporte pas le verrouillage
  au niveau session dont Prisma Migrate a besoin.
- **Mots de passe** : hashés avec bcrypt (12 rounds, `lib/auth.ts`) — jamais
  stockés ni renvoyés en clair.
- **Sessions** : un jeton aléatoire de 32 octets (pas l'id utilisateur) est
  stocké à la fois dans un cookie `httpOnly` et dans la table `Session`. La
  déconnexion supprime la ligne en base, donc un jeton volé cesse de
  fonctionner immédiatement — ce n'est pas juste un cookie effacé côté client.
  Le cookie n'a l'attribut `Secure` que si la requête arrive réellement en
  HTTPS (détecté via `x-forwarded-proto`), pour ne pas casser silencieusement
  l'auth quand `next start` tourne en local sans TLS.
- **Protection des routes** : `proxy.ts` (le nouveau nom de `middleware.ts`
  depuis Next.js 16) vérifie la session en base à chaque requête vers
  `/dashboard`, `/abonnements`, `/calendrier`, `/alertes`, `/parametres`,
  `/onboarding/email` et `/onboarding/confirmation`, et redirige vers
  `/connexion` ou `/inscription` si besoin. Il redirige aussi un utilisateur
  déjà connecté qui visiterait `/connexion` ou `/inscription` vers son
  dashboard. Chaque Server Action revérifie aussi la session de son côté
  (`getCurrentUser()`), sans compter uniquement sur le proxy.
- **Server Actions réelles** (`app/actions/auth.ts`) : `signupAction` (crée le
  compte, refuse un e-mail déjà pris), `loginAction` (vérifie le hash,
  message d'erreur générique pour ne pas révéler si l'e-mail existe),
  `logoutAction` (supprime la session), `connectEmailAction` (marque la
  boîte mail comme connectée). Les formulaires (`SignupForm`, `LoginForm`,
  `EmailProviderList`) utilisent `useActionState` et fonctionnent même sans
  JavaScript (formulaires HTML natifs).
- Les infos affichées dans la sidebar et `/parametres` (nom, e-mail, offre,
  jour d'essai, statut de connexion e-mail) viennent réellement de la base,
  pas de valeurs codées en dur.
- **Protection contre le bruteforce** : `LoginAttempt` enregistre chaque
  échec de connexion par e-mail soumis (pas par utilisateur, pour bloquer
  aussi le bourrage sur un e-mail inconnu). Au-delà de 5 échecs sur une
  fenêtre glissante de 15 minutes, `loginAction` refuse même le bon mot de
  passe — comportement standard pour ne pas laisser un attaquant deviner
  qu'il approche. Les tentatives sont effacées à la prochaine connexion
  réussie.
- **Abonnements réellement par utilisateur** : table `Subscription` (+
  `PriceChange` pour l'historique de prix), liée à `User`. `lib/detection.ts`
  simule pour l'instant une détection (voir section suivante) en semant un
  jeu de 12 abonnements réalistes au moment de la connexion e-mail — tous en
  statut `a-verifier`, comme le ferait une vraie détection. Le dashboard, la
  liste, la fiche détail et le calendrier lisent tous cette table via
  `lib/user-subscriptions.ts` (`getUserSubscriptions`, `getUserSubscriptionById`),
  plus aucun n'utilise le jeu de démonstration partagé. Chaque changement de
  statut (`app/actions/subscriptions.ts`) est scopé par `id` **et** `userId`
  dans la requête Prisma — un utilisateur ne peut jamais modifier
  l'abonnement d'un autre, vérifié explicitement (tentative avec un mauvais
  `userId` → 0 ligne affectée).

## Mécanisme de détection : e-mails, pas Open Banking

Décision produit : SubFlow détecte les abonnements en analysant les e-mails
de facturation (Gmail/Outlook), pas via une connexion bancaire — pas de
connexion Open Banking, pas de numéro de carte demandé. Les 4 derniers
chiffres de carte affichés dans l'app (ex. « Carte •••• 4471 ») viennent des
reçus e-mail eux-mêmes, jamais d'une saisie ou d'un stockage de PAN complet.

## Le parcours complet

```
/                          Landing page
/inscription?plan=...      Étape 1 : création de compte réelle (base de données)
/onboarding/email          Étape 2 : connexion de la boîte mail (Gmail/Outlook)
/onboarding/confirmation   Étape 3 : confirmation des abonnements détectés
/connexion                 Connexion (vérifie le mot de passe en base)
/dashboard, /abonnements,
/abonnements/[id],
/calendrier, /alertes,
/parametres                L'application, protégée par une vraie session
```

## Ce qui reste volontairement non branché

Tout ce qui suit a besoin d'un identifiant/service externe que je ne peux
pas fabriquer moi-même :

- **Connexion Gmail/Outlook réelle** (OAuth + lecture des e-mails de
  facturation) — `EmailProviderList`/`connectEmailAction` marquent la boîte
  mail comme connectée en base et déclenchent `seedDetectedSubscriptions`
  (voir ci-dessus), mais ne se connectent pas encore à un vrai fournisseur.
  Nécessite un projet OAuth (Google Cloud Console pour Gmail, Azure AD pour
  Outlook) avec un client ID/secret.
- **Moteur de parsing des e-mails** — `lib/detection.ts` est le point de
  couture exact : même signature (`seedDetectedSubscriptions(userId)`),
  remplacer le corps par un vrai appel à l'API Gmail/Outlook + extraction
  (règles ou LLM) au lieu du jeu de démonstration.
- **Envoi de vrais e-mails** (vérification d'adresse à l'inscription, mot de
  passe oublié, alertes avant prélèvement/hausse de prix) — nécessite un
  service d'envoi (Resend, SendGrid, ou un compte SMTP). Sans ça, ces
  fonctionnalités ne peuvent pas exister, même en local.
- Tâches planifiées pour la détection périodique et les alertes (BullMQ +
  Redis, comme prévu dans l'architecture).

Tous les totaux/statistiques du dashboard restent **calculés dynamiquement**
à partir des `Subscription` réelles de l'utilisateur, jamais codés en dur.

## Structure

```
prisma/
  schema.prisma                 User, Session, LoginAttempt, Subscription, PriceChange
  migrations/                   Historique de migrations (versionné)
lib/
  db.ts                         Client Prisma (singleton + driver adapter Postgres, DATABASE_URL)
  auth.ts                       Hash de mot de passe, sessions, cookies
  detection.ts                  Seed de détection (à remplacer par le vrai parsing d'e-mails)
  user-subscriptions.ts         Accès DB par utilisateur (lecture + changement de statut scopé)
  types.ts, subscriptions.ts    Types + jeu de démo (utilisé par la landing page uniquement)
  format.ts, calendar.ts, cn.ts
proxy.ts                        Protection des routes (ex-middleware.ts)
app/
  actions/auth.ts                Server Actions : signup, login (+ lockout), logout, connectEmail
  actions/subscriptions.ts       Server Actions : confirmer/ignorer/changer le statut
  page.tsx                       Landing page
  inscription/                   Étape 1 : création de compte
  onboarding/email/               Étape 2 : connexion e-mail (Gmail/Outlook)
  onboarding/confirmation/        Étape 3 : confirmation des détections
  connexion/                      Connexion (comptes existants)
  securite/, confidentialite/,
  cgu/, contact/                  Pages légales (liens du footer)
  (app)/layout.tsx                Coquille app (sidebar avec vraies infos utilisateur)
  (app)/dashboard/, abonnements/,
  abonnements/[id]/, calendrier/,
  alertes/, parametres/           L'application, routes protégées
components/
  ui/                            Button, Card, StatusBadge (design system)
  landing/                       Sections de la landing page
  app/                           Sidebar, Topbar, widgets du dashboard/liste/calendrier
  onboarding/                    Stepper, formulaires compte/e-mail, liste de confirmation
  legal/                         Layout partagé des pages légales
```
