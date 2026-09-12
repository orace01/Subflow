import { LegalPage } from "@/components/legal/LegalPage";

export const metadata = { title: "Confidentialité · SubFlow" };

export default function ConfidentialitePage() {
  return (
    <LegalPage title="Politique de confidentialité">
      <p>
        Cette page décrit, de façon simple, les données que SubFlow traite et
        pourquoi.
      </p>
      <h2>Données collectées</h2>
      <p>
        Nom, e-mail, et — après votre consentement explicite — un accès
        lecture seule à votre messagerie limité aux e-mails de facturation.
      </p>
      <h2>Finalité</h2>
      <p>
        Ces données servent uniquement à détecter vos abonnements récurrents
        et à vous alerter avant un prélèvement ou une hausse de prix.
      </p>
      <h2>Partage avec des tiers</h2>
      <p>Vos données ne sont jamais vendues ni partagées à des fins publicitaires.</p>
      <h2>Vos droits</h2>
      <p>
        Vous pouvez à tout moment consulter, corriger ou supprimer vos
        données depuis votre compte, ou en nous contactant.
      </p>
    </LegalPage>
  );
}
