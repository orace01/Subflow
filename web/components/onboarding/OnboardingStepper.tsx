import { cn } from "@/lib/cn";
import { CheckIcon } from "@/components/icons";

const steps = ["Connexion", "Détection", "Confirmation", "Terminé"];

export function OnboardingStepper({
  activeStep,
  maxWidth = 640,
}: {
  activeStep: number; // 1-indexed
  maxWidth?: number;
}) {
  return (
    <div className="mx-auto flex items-center" style={{ maxWidth }}>
      {steps.map((label, i) => {
        const step = i + 1;
        const done = step < activeStep;
        const active = step === activeStep;
        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div
              className={cn("flex items-center gap-2 shrink-0", !done && !active && "opacity-40")}
            >
              <div
                className={cn(
                  "hard-xs w-[26px] h-[26px] flex items-center justify-center text-[12px] font-bold",
                  active ? "bg-blue text-blue-ink" : "bg-surface"
                )}
              >
                {done ? <CheckIcon className="w-3.5 h-3.5" /> : step}
              </div>
              <span className="text-[12.5px] font-bold whitespace-nowrap">{label}</span>
            </div>
            {step < steps.length && (
              <div
                className={cn("flex-1 h-0.5 bg-ink mx-2.5", !done && "opacity-40")}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
