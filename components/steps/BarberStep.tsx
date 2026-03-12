"use client";

import { useBooking } from "@/context/BookingContext";
import { BARBERS } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { Barber } from "@/lib/types";

export function BarberStep() {
  const { lang, setBarber, goToStep } = useBooking();
  const he = lang === "he";

  return (
    <div className="space-y-4">
      <div className="pt-2">
        <button
          onClick={() => goToStep("service")}
          className="text-muted text-sm flex items-center gap-1 mb-3 hover:text-gold transition-colors"
        >
          <span>{he ? "→" : "←"}</span>
          <span>{he ? "חזור" : "Back"}</span>
        </button>
        <h2 className="text-xl font-bold text-text-base">
          {he ? "בחר ספר" : "Choose Your Barber"}
        </h2>
        <p className="text-muted text-sm mt-0.5">
          {he ? "כל הספרים שלנו מקצועיים ומנוסים" : "All our barbers are experienced professionals"}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {BARBERS.map((barber) => (
          <BarberCard key={barber.id} barber={barber} lang={lang} onSelect={setBarber} />
        ))}

        {/* "Any barber" option */}
        <button
          onClick={() => setBarber(BARBERS[0])} // defaults to first available
          className="p-4 rounded-xl border border-dashed border-border hover:border-gold bg-card hover:bg-[#1f1a0a] transition-all text-start group"
        >
          <div className="w-12 h-12 rounded-full bg-border flex items-center justify-center text-xl mb-3">
            🎲
          </div>
          <div className="font-semibold text-text-base group-hover:text-gold transition-colors">
            {he ? "לא חשוב לי" : "Any Barber"}
          </div>
          <div className="text-xs text-muted mt-0.5">
            {he ? "השבץ אוטומטי לפי זמינות" : "Auto-assign by availability"}
          </div>
        </button>
      </div>
    </div>
  );
}

function BarberCard({
  barber,
  lang,
  onSelect,
}: {
  barber: Barber;
  lang: "he" | "en";
  onSelect: (b: Barber) => void;
}) {
  const he = lang === "he";
  const stars = "★".repeat(Math.floor(barber.rating)) + (barber.rating % 1 >= 0.5 ? "½" : "");

  return (
    <button
      onClick={() => onSelect(barber)}
      className={cn(
        "p-4 rounded-xl border border-border hover:border-gold bg-card hover:bg-[#1f1a0a]",
        "transition-all text-start group active:scale-[0.98]"
      )}
    >
      {/* Avatar placeholder */}
      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold-dim to-gold flex items-center justify-center text-2xl mb-3 shadow-lg shadow-gold/20">
        {he ? barber.nameHe[0] : barber.nameEn[0]}
      </div>

      <div className="font-bold text-lg text-text-base group-hover:text-gold transition-colors leading-tight">
        {he ? barber.nameHe : barber.nameEn}
      </div>
      <div className="text-xs text-muted mt-0.5">
        {he ? barber.titleHe : barber.titleEn}
      </div>

      <div className="flex items-center gap-2 mt-2">
        <span className="text-gold text-sm">{stars.slice(0, 5)}</span>
        <span className="text-xs text-muted">
          {barber.rating} ({barber.reviewCount} {he ? "ביקורות" : "reviews"})
        </span>
      </div>
    </button>
  );
}
