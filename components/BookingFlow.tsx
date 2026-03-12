"use client";

import { Scissors } from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import { ServiceStep } from "./steps/ServiceStep";
import { BarberStep } from "./steps/BarberStep";
import { DateTimeStep } from "./steps/DateTimeStep";
import { ConfirmStep } from "./steps/ConfirmStep";
import { SuccessStep } from "./steps/SuccessStep";
import { cn } from "@/lib/utils";

const STEP_ORDER = ["service", "barber", "datetime", "confirm", "success"] as const;
const STEPS_HE = ["שירות", "ספר", "זמן", "אישור"];
const STEPS_EN  = ["Service", "Barber", "Time", "Confirm"];

export function BookingFlow() {
  const { lang, setLang, state } = useBooking();
  const dir = lang === "he" ? "rtl" : "ltr";
  const stepIndex = STEP_ORDER.indexOf(state.step);
  const isSuccess = state.step === "success";

  return (
    <div dir={dir} className="min-h-screen bg-bg text-text-base">

      {/* ─── Nav ─── */}
      <header className="sticky top-0 z-50 bg-surface/90 backdrop-blur border-b border-border" dir="ltr">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center">
              <Scissors size={16} className="text-bg" strokeWidth={2.5} />
            </div>
            <div className="leading-none">
              <span className="font-extrabold text-text-base tracking-tight text-sm">
                {lang === "he" ? "תספורת שלום" : "Shalom Barbershop"}
              </span>
              <span className="block text-[10px] text-gold font-medium tracking-widest uppercase opacity-80">
                Premium Barber
              </span>
            </div>
          </div>

          {/* Lang toggle */}
          <div className="flex bg-card rounded-lg p-0.5 gap-0.5 border border-border">
            {(["he", "en"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={cn(
                  "px-3 py-1 rounded-md text-xs font-bold transition-all",
                  lang === l ? "bg-gold text-bg shadow-sm" : "text-muted hover:text-text-base"
                )}
              >
                {l === "he" ? "עב" : "EN"}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ─── Hero ─── */}
      {!isSuccess && (
        <div className="relative overflow-hidden">
          {/* Gold gradient glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1c1508] via-[#0f0d06] to-bg" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-gold/10 rounded-full blur-3xl" />

          <div className="relative max-w-2xl mx-auto px-4 py-10 text-center">
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-1.5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="text-gold text-xs font-semibold tracking-wide">
                {lang === "he" ? "פתוח עכשיו" : "Open Now"}
              </span>
            </div>
            <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">
              {lang === "he" ? "קביעת תור" : "Book Appointment"}
            </h1>
            <p className="text-muted text-sm tracking-widest uppercase">
              {lang === "he" ? "מקצועי · מהיר · אמין" : "Professional · Fast · Reliable"}
            </p>
          </div>
        </div>
      )}

      {/* ─── Step indicator ─── */}
      {!isSuccess && (
        <div className="max-w-2xl mx-auto px-4 py-4" dir="ltr">
          <div className="flex items-center justify-center">
            {STEPS_HE.map((labelHe, i) => {
              const done   = stepIndex > i;
              const active = stepIndex === i;
              return (
                <div key={i} className="flex items-center">
                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300",
                        done   && "bg-gold text-bg shadow-lg shadow-gold/30",
                        active && "bg-gold text-bg ring-2 ring-gold/50 ring-offset-2 ring-offset-bg scale-110",
                        !done && !active && "bg-card text-muted border border-border"
                      )}
                    >
                      {done ? "✓" : i + 1}
                    </div>
                    <span className={cn(
                      "text-[10px] whitespace-nowrap hidden sm:block font-medium transition-colors",
                      active ? "text-gold" : done ? "text-gold/60" : "text-muted"
                    )}>
                      {lang === "he" ? labelHe : STEPS_EN[i]}
                    </span>
                  </div>
                  {i < STEPS_HE.length - 1 && (
                    <div className={cn(
                      "w-10 sm:w-16 h-px mb-5 mx-1 transition-all duration-500",
                      done ? "bg-gold" : "bg-border"
                    )} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ─── Main content ─── */}
      <main className="max-w-2xl mx-auto px-4 pb-20">
        <div className="step-enter" key={state.step}>
          {state.step === "service"  && <ServiceStep />}
          {state.step === "barber"   && <BarberStep />}
          {state.step === "datetime" && <DateTimeStep />}
          {state.step === "confirm"  && <ConfirmStep />}
          {state.step === "success"  && <SuccessStep />}
        </div>
      </main>

      {/* ─── Footer ─── */}
      {!isSuccess && (
        <footer className="text-center text-muted text-xs py-6 border-t border-border">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <Scissors size={10} className="text-gold opacity-60" />
            <span className="text-gold/60 font-semibold">תספורת שלום</span>
          </div>
          © {new Date().getFullYear()} ·{" "}
          {lang === "he" ? "כל הזכויות שמורות" : "All rights reserved"}
        </footer>
      )}
    </div>
  );
}
