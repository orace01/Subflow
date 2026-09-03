# SubFlow — Web

Frontend Next.js (App Router) + TypeScript + Tailwind CSS pour SubFlow,
conforme au design neo-brutaliste validé (voir `../design/`).

## Démarrer

```bash
npm install
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000).

## Périmètre de cette implémentation

Ce projet couvre **l'UI/UX complet** : landing page, onboarding (connexion
bancaire, confirmation des détections), tableau de bord, gestion des
abonnements, calendrier et alertes — avec un vrai routing Next.js et des
interactions fonctionnelles (filtres, statuts, calendrier navigable, toggles
d'alertes).

Les données affichées viennent d'un jeu de données de démonstration
(`lib/subscriptions.ts`) et tous les totaux/statistiques du dashboard sont
**calculés dynamiquement** à partir de ces données (pas de chiffres codés en
dur), pour que l'app reste cohérente si le jeu de données change.

**Volontairement non branché** (nécessite des identifiants/infrastructure
réels appartenant au porteur du projet) :

- Connexion bancaire réelle (Bridge/Powens ou Plaid) — la page
  `app/onboarding/connexion` est prête à recevoir l'appel API réel.
- Base de données (PostgreSQL/Supabase) — `lib/subscriptions.ts` est le seul
  point de couture à remplacer par une vraie source de données.
- Moteur de détection des abonnements / tâches planifiées (BullMQ + Redis).
- Authentification, facturation Pro.

## Structure

```
app/
  page.tsx                     Landing page
  onboarding/connexion/        Étape 1 : connexion bancaire
  onboarding/confirmation/     Étape 3 : confirmation des détections
  (app)/layout.tsx             Coquille app (sidebar) pour les pages ci-dessous
  (app)/dashboard/
  (app)/abonnements/
  (app)/abonnements/[id]/
  (app)/calendrier/
  (app)/alertes/
components/
  ui/                          Button, Card, StatusBadge (design system)
  landing/                     Sections de la landing page
  app/                         Sidebar, Topbar, widgets du dashboard/liste/calendrier
  onboarding/                  Stepper, liste de confirmation
lib/
  types.ts, subscriptions.ts   Modèle de données + calculs (totaux, catégories, etc.)
  format.ts, calendar.ts, cn.ts
```
