"use client";

import { Star, Award, ChevronRight, Shuffle } from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import { BARBERS } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { Barber } from "@/lib/types";

const AVATAR_GRADIENTS = [
  "from-amber-600 to-yellow-400",
  "from-sky-700 to-cyan-400",
  "from-violet-700 to-fuchsia-500",
];

export function BarberStep() {
  const { lang, setBarber, goToStep } = useBooking();
  const he = lang === "he";

  return (
    <div className="space-y-5">
      <div className="pt-2">
        <button
          onClick={() => goToStep("service")}
          className="text-muted text-sm flex items-center gap-1 mb-3 hover:text-gold transition-colors"
        >
          <ChevronRight size={14} className={he ? "" : "rotate-180"} />
          {he ? "חזור" : "Back"}
        </button>
        <h2 className="text-2xl font-extrabold text-text-base">
          {he ? "בחר ספר" : "Choose Your Barber"}
        </h2>
        <p className="text-muted text-sm mt-1">
          {he ? "כל הספרים שלנו מקצועיים ומנוסים" : "All our barbers are experienced professionals"}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {BARBERS.map((barber, i) => (
          <BarberCard
            key={barber.id}
            barber={barber}
            lang={lang}
            gradient={AVATAR_GRADIENTS[i] ?? AVATAR_GRADIENTS[0]}
            index={i}
            onSelect={setBarber}
          />
        ))}

        {/* Any barber */}
        <button
          onClick={() => setBarber(BARBERS[0])}
          style={{ animationDelay: `${BARBERS.length * 60}ms` }}
          className={cn(
            "p-5 rounded-2xl border border-dashed border-border hover:border-gold/60",
            "bg-card hover:bg-[#1c1608] transition-all text-start group active:scale-[0.97]",
            "stagger-item"
          )}
        >
          <div className="w-14 h-14 rounded-2xl bg-zinc-800 flex items-center justify-center mb-3">
            <Shuffle size={22} className="text-zinc-400" />
          </div>
          <div className="font-bold text-text-base group-hover:text-gold transition-colors">
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
  gradient,
  index,
  onSelect,
}: {
  barber: Barber;
  lang: "he" | "en";
  gradient: string;
  index: number;
  onSelect: (b: Barber) => void;
}) {
  const he = lang === "he";
  const fullStars = Math.floor(barber.rating);
  const hasHalf   = barber.rating % 1 >= 0.5;

  return (
    <button
      onClick={() => onSelect(barber)}
      style={{ animationDelay: `${index * 60}ms` }}
      className={cn(
        "p-5 rounded-2xl border border-border hover:border-gold/70",
        "bg-card hover:bg-[#1c1608] hover:shadow-xl hover:shadow-gold/10",
        "hover:-translate-y-0.5 transition-all duration-200",
        "text-start group active:scale-[0.97] stagger-item"
      )}
    >
      {/* Avatar with online dot */}
      <div className="relative mb-4">
        <div className={cn(
          "w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white text-2xl font-black shadow-lg",
          gradient
        )}>
          {he ? barber.nameHe[0] : barber.nameEn[0]}
        </div>
        <span className="absolute -bottom-0.5 -end-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-bg" />
      </div>

      <div className="font-extrabold text-lg text-text-base group-hover:text-gold transition-colors leading-tight">
        {he ? barber.nameHe : barber.nameEn}
      </div>
      <div className="text-xs text-muted font-medium mt-0.5">
        {he ? barber.titleHe : barber.titleEn}
      </div>

      {/* Experience badge */}
      <div className="flex items-center gap-1.5 mt-2">
        <Award size={12} className="text-gold" />
        <span className="text-xs text-gold font-semibold">
          {barber.experience} {he ? "שנות ניסיון" : "yrs experience"}
        </span>
      </div>

      {/* Specialty */}
      <div className="text-xs text-muted mt-1 italic">
        {he ? barber.specialtyHe : barber.specialtyEn}
      </div>

      <div className="my-3 h-px bg-border group-hover:bg-gold/20 transition-colors" />

      {/* Stars */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: fullStars }).map((_, i) => (
            <Star key={i} size={11} className="text-gold fill-gold" />
          ))}
          {hasHalf && <Star size={11} className="text-gold fill-gold opacity-50" />}
        </div>
        <span className="text-xs font-bold text-gold">{barber.rating}</span>
        <span className="text-xs text-muted">
          ({barber.reviewCount} {he ? "ביקורות" : "reviews"})
        </span>
      </div>
    </button>
  );
}
