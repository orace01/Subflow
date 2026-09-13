import "server-only";

import { Resend } from "resend";

const FROM_ADDRESS = process.env.RESEND_FROM_EMAIL ?? "SubFlow <onboarding@resend.dev>";

function getClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY manquant : impossible d'envoyer un e-mail.");
  }
  return new Resend(apiKey);
}

export async function sendPasswordResetEmail(
  to: string,
  firstName: string,
  resetUrl: string
): Promise<void> {
  const resend = getClient();

  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to,
    subject: "Réinitialisez votre mot de passe SubFlow",
    html: `
      <p>Bonjour ${firstName},</p>
      <p>Vous avez demandé à réinitialiser votre mot de passe SubFlow. Ce lien est valable 1 heure :</p>
      <p><a href="${resetUrl}">${resetUrl}</a></p>
      <p>Si vous n'êtes pas à l'origine de cette demande, ignorez cet e-mail.</p>
    `,
  });

  if (error) {
    throw new Error(`Échec d'envoi de l'e-mail (Resend) : ${error.message}`);
  }
}
