import Link from "next/link";
import { LogoMarkIcon } from "@/components/icons";
import { ResetPasswordForm } from "@/components/onboarding/ResetPasswordForm";

export const metadata = { title: "Réinitialiser le mot de passe · SubFlow" };

export default async function ReinitialiserMotDePassePage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="border-b-[2.5px] border-ink px-8 py-5">
        <div className="max-w-[440px] mx-auto flex items-center">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="hard-sm w-[30px] h-[30px] bg-blue flex items-center justify-center">
              <LogoMarkIcon className="w-4 h-4 text-blue-ink" />
            </span>
            <span className="font-display font-bold text-[17px]">SubFlow</span>
          </Link>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-8 py-16">
        <div className="max-w-[440px] w-full">
          <h1 className="text-[30px] font-bold text-center">Nouveau mot de passe</h1>

          {token ? (
            <>
              <p className="text-[15px] text-text-muted mt-3 text-center leading-relaxed">
                Choisissez un nouveau mot de passe pour votre compte.
              </p>
              <ResetPasswordForm token={token} />
            </>
          ) : (
            <p className="text-[14.5px] text-text-muted mt-6 text-center leading-relaxed">
              Ce lien est invalide.{" "}
              <Link href="/mot-de-passe-oublie" className="font-semibold">
                Demandez-en un nouveau
              </Link>
              .
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
