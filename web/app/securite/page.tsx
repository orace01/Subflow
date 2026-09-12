import { LegalPage } from "@/components/legal/LegalPage";

export const metadata = { title: "Sécurité · SubFlow" };

export default function SecuritePage() {
  return (
    <LegalPage title="Sécurité">
      <p>
        SubFlow n&apos;accède qu&apos;en lecture seule aux e-mails de
        facturation nécessaires à la détection de vos abonnements — jamais à
        votre courrier personnel, et jamais en écriture.
      </p>
      <h2>Ce que nous ne demandons jamais</h2>
      <p>
        SubFlow ne vous demande jamais votre numéro de carte bancaire complet.
        Il n&apos;est ni nécessaire à la détection, ni compatible avec notre
        politique de sécurité.
      </p>
      <h2>Chiffrement et tokenisation</h2>
      <p>
        Les jetons d&apos;accès à votre messagerie sont chiffrés au repos et
        en transit. Aucune donnée d&apos;identification n&apos;est stockée en
        clair.
      </p>
      <h2>Suppression des données</h2>
      <p>
        Vous pouvez révoquer l&apos;accès et supprimer vos données à tout
        moment depuis les paramètres de votre compte.
      </p>
    </LegalPage>
  );
}
