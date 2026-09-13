"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { TagIcon, SearchIcon, CheckIcon, WrenchIcon } from "@/components/icons";
import { chooseMethodAction, type DetectionMethod } from "@/app/actions/auth";
import { cn } from "@/lib/cn";

export function MethodChoice() {
  const router = useRouter();
  const [selected, setSelected] = useState<DetectionMethod>("manuel");
  const [showMaintenance, setShowMaintenance] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleContinue() {
    setError(null);
    startTransition(async () => {
      const result = await chooseMethodAction(selected);
      if ("error" in result) {
        setError(result.error);
        return;
      }
      if (result.method === "manuel") {
        router.push("/onboarding/abonnements");
      } else {
        setShowMaintenance(true);
      }
    });
  }

  if (showMaintenance) {
    return (
      <div className="max-w-[540px] mx-auto text-center">
        <span className="hard-sm w-14 h-14 bg-yellow flex items-center justify-center mx-auto mb-5">
          <WrenchIcon className="w-6 h-6 text-yellow-ink" />
        </span>
        <h1 className="text-[26px] font-bold">Détection automatique bientôt disponible</h1>
        <p className="text-[15px] text-text-muted mt-3 leading-relaxed">
          La connexion sécurisée à votre boîte mail (Gmail, Outlook) est en
          cours de mise en place. En attendant, ajoutez vos abonnements
          manuellement — vous pourrez activer la détection automatique dès
          qu&apos;elle sera prête, sans rien perdre.
        </p>
        <button
          onClick={() => router.push("/onboarding/abonnements")}
          className="inline-flex items-center justify-center gap-2 h-12 px-6 mt-6 text-[14.5px] font-bold font-display bg-blue text-blue-ink border-[2.5px] border-ink shadow-[4px_4px_0_0_var(--ink)] hover:shadow-[6px_6px_0_0_var(--ink)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_0_var(--ink)] transition-[transform,box-shadow] duration-100 cursor-pointer"
        >
          Ajouter mes abonnements manuellement
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[560px] mx-auto">
      <h1 className="text-[28px] font-bold text-center">
        Comment voulez-vous suivre vos abonnements ?
      </h1>
      <p className="text-[15px] text-text-muted mt-3 text-center leading-relaxed">
        Vous pourrez changer d&apos;avis à tout moment depuis vos paramètres.
      </p>

      <div className="flex flex-col gap-3 mt-7">
        <button
          type="button"
          onClick={() => setSelected("manuel")}
          className={cn(
            "hard-sm px-5 py-4.5 flex items-start gap-4 text-left cursor-pointer",
            selected === "manuel" ? "bg-blue" : "bg-surface"
          )}
        >
          <span
            className={cn(
              "w-11 h-11 rounded-lg flex items-center justify-center shrink-0",
              selected === "manuel" ? "bg-surface" : "bg-paper-alt"
            )}
          >
            <TagIcon className={cn("w-5 h-5", selected === "manuel" ? "text-blue" : "text-ink")} />
          </span>
          <div className="flex-grow min-w-0">
            <div className={cn("text-[15px] font-bold", selected === "manuel" && "text-blue-ink")}>
              Ajout manuel
            </div>
            <p
              className={cn(
                "text-[13px] mt-1 leading-relaxed",
                selected === "manuel" ? "text-blue-ink/80" : "text-text-muted"
              )}
            >
              Vous ajoutez vous-même vos abonnements et les gérez depuis le
              tableau de bord. Fonctionne dès aujourd&apos;hui.
            </p>
          </div>
          {selected === "manuel" && <CheckIcon className="w-5 h-5 text-blue-ink shrink-0" />}
        </button>

        <button
          type="button"
          onClick={() => setSelected("automatique")}
          className={cn(
            "hard-sm px-5 py-4.5 flex items-start gap-4 text-left cursor-pointer",
            selected === "automatique" ? "bg-blue" : "bg-surface"
          )}
        >
          <span
            className={cn(
              "w-11 h-11 rounded-lg flex items-center justify-center shrink-0",
              selected === "automatique" ? "bg-surface" : "bg-paper-alt"
            )}
          >
            <SearchIcon
              className={cn("w-5 h-5", selected === "automatique" ? "text-blue" : "text-ink")}
            />
          </span>
          <div className="flex-grow min-w-0">
            <div
              className={cn("text-[15px] font-bold", selected === "automatique" && "text-blue-ink")}
            >
              Détection automatique
            </div>
            <p
              className={cn(
                "text-[13px] mt-1 leading-relaxed",
                selected === "automatique" ? "text-blue-ink/80" : "text-text-muted"
              )}
            >
              Autorisez SubFlow à analyser vos reçus e-mail pour détecter vos
              abonnements. Bientôt disponible.
            </p>
          </div>
          {selected === "automatique" && <CheckIcon className="w-5 h-5 text-blue-ink shrink-0" />}
        </button>
      </div>

      {error && <p className="text-[13px] text-pink font-semibold mt-3">{error}</p>}

      <button
        onClick={handleContinue}
        disabled={isPending}
        className="inline-flex items-center justify-center gap-2 w-full h-12 px-6 mt-6 text-[14.5px] font-bold font-display bg-blue text-blue-ink border-[2.5px] border-ink shadow-[4px_4px_0_0_var(--ink)] hover:shadow-[6px_6px_0_0_var(--ink)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_0_var(--ink)] transition-[transform,box-shadow] duration-100 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      >
        {isPending ? "…" : "Continuer"}
      </button>
    </div>
  );
}
