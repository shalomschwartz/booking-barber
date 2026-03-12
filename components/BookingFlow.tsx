"use client";

import { useBooking } from "@/context/BookingContext";
import { ServiceStep } from "./steps/ServiceStep";
import { BarberStep } from "./steps/BarberStep";
import { DateTimeStep } from "./steps/DateTimeStep";
import { ConfirmStep } from "./steps/ConfirmStep";
import { SuccessStep } from "./steps/SuccessStep";
import { cn } from "@/lib/utils";

const STEP_ORDER = ["service", "barber", "datetime", "confirm", "success"] as const;

const STEPS_HE = ["שירות", "ספר", "זמן", "אישור"];
const STEPS_EN = ["Service", "Barber", "Time", "Confirm"];

export function BookingFlow() {
  const { lang, setLang, state } = useBooking();
  const dir = lang === "he" ? "rtl" : "ltr";
  const stepIndex = STEP_ORDER.indexOf(state.step);

  return (
    <div dir={dir} className="min-h-screen bg-bg text-text-base">
      {/* Nav */}
      <header className="sticky top-0 z-50 bg-surface border-b border-border" dir="ltr">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center text-bg text-sm font-bold">
              💈
            </div>
            <span className="font-bold text-text-base tracking-tight">
              {lang === "he" ? "ספרות שלום" : "Shalom Barbershop"}
            </span>
          </div>
          {/* Lang toggle */}
          <div className="flex bg-card rounded-lg p-0.5 gap-0.5">
            {(["he", "en"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={cn(
                  "px-3 py-1 rounded-md text-xs font-semibold transition-all",
                  lang === l
                    ? "bg-gold text-bg"
                    : "text-muted hover:text-text-base"
                )}
              >
                {l === "he" ? "עב" : "EN"}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      {state.step !== "success" && (
        <div className="relative overflow-hidden bg-gradient-to-b from-[#1a1208] to-bg">
          <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-5" />
          <div className="max-w-2xl mx-auto px-4 py-8 text-center relative">
            <h1 className="text-3xl font-bold text-gold mb-1 tracking-tight">
              {lang === "he" ? "קביעת תור" : "Book Appointment"}
            </h1>
            <p className="text-muted text-sm">
              {lang === "he" ? "מקצועי · מהיר · אמין" : "Professional · Fast · Reliable"}
            </p>
          </div>
        </div>
      )}

      {/* Step indicator */}
      {state.step !== "success" && (
        <div className="max-w-2xl mx-auto px-4 py-4" dir="ltr">
          <div className="flex items-center justify-center gap-1">
            {STEPS_HE.map((labelHe, i) => {
              const labelEn = STEPS_EN[i];
              const done = stepIndex > i;
              const active = stepIndex === i;
              return (
                <div key={i} className="flex items-center gap-1">
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className={cn(
                        "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                        done && "bg-gold text-bg",
                        active && "bg-gold text-bg ring-2 ring-gold ring-offset-2 ring-offset-bg",
                        !done && !active && "bg-card text-muted border border-border"
                      )}
                    >
                      {done ? "✓" : i + 1}
                    </div>
                    <span className={cn("text-[10px] whitespace-nowrap hidden sm:block", active ? "text-gold" : "text-muted")}>
                      {lang === "he" ? labelHe : labelEn}
                    </span>
                  </div>
                  {i < STEPS_HE.length - 1 && (
                    <div className={cn("w-8 sm:w-12 h-px mb-4", done ? "bg-gold" : "bg-border")} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="max-w-2xl mx-auto px-4 pb-16">
        <div className="fade-up" key={state.step}>
          {state.step === "service"  && <ServiceStep />}
          {state.step === "barber"   && <BarberStep />}
          {state.step === "datetime" && <DateTimeStep />}
          {state.step === "confirm"  && <ConfirmStep />}
          {state.step === "success"  && <SuccessStep />}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-muted text-xs py-6 border-t border-border">
        © {new Date().getFullYear()} Shalom Barbershop ·{" "}
        {lang === "he" ? "כל הזכויות שמורות" : "All rights reserved"}
      </footer>
    </div>
  );
}
