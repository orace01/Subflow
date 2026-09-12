import { LegalPage } from "@/components/legal/LegalPage";

export const metadata = { title: "Conditions générales d'utilisation · SubFlow" };

export default function CguPage() {
  return (
    <LegalPage title="Conditions générales d'utilisation">
      <h2>Objet</h2>
      <p>
        SubFlow est un service d&apos;aide à la gestion d&apos;abonnements
        récurrents, fondé sur l&apos;analyse de vos reçus et factures reçus
        par e-mail.
      </p>
      <h2>Essai gratuit</h2>
      <p>
        L&apos;essai gratuit de 3 mois donne accès à l&apos;ensemble des
        fonctionnalités Pro, sans engagement ni carte bancaire requise.
      </p>
      <h2>Responsabilité</h2>
      <p>
        SubFlow détecte les abonnements de façon automatisée et affiche un
        niveau de confiance pour chaque détection ; il revient à
        l&apos;utilisateur de confirmer ou corriger les informations avant de
        s&apos;en servir pour résilier un service.
      </p>
      <h2>Résiliation</h2>
      <p>
        Vous pouvez résilier votre abonnement SubFlow à tout moment depuis
        votre compte.
      </p>
    </LegalPage>
  );
}
