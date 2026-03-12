"use client";

import { Clock, Star } from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import { SERVICES } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { Service } from "@/lib/types";

export function ServiceStep() {
  const { lang, setService } = useBooking();
  const he = lang === "he";

  return (
    <div className="space-y-5">
      <div className="pt-2">
        <h2 className="text-2xl font-extrabold text-text-base">
          {he ? "בחר שירות" : "Select a Service"}
        </h2>
        <p className="text-muted text-sm mt-1">
          {he ? "איזה שירות אתה מחפש היום?" : "What are you looking for today?"}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SERVICES.map((service, i) => (
          <ServiceCard
            key={service.id}
            service={service}
            lang={lang}
            index={i}
            onSelect={setService}
          />
        ))}
      </div>
    </div>
  );
}

function ServiceCard({
  service,
  lang,
  index,
  onSelect,
}: {
  service: Service;
  lang: "he" | "en";
  index: number;
  onSelect: (s: Service) => void;
}) {
  const he = lang === "he";

  return (
    <button
      onClick={() => onSelect(service)}
      style={{ animationDelay: `${index * 60}ms` }}
      className={cn(
        "relative text-start w-full p-5 rounded-2xl border transition-all duration-200 group stagger-item",
        "bg-card border-border",
        "hover:border-gold/70 hover:bg-[#1c1608] hover:shadow-xl hover:shadow-gold/10",
        "hover:-translate-y-0.5",
        "active:scale-[0.97] active:shadow-none"
      )}
    >
      {/* Popular badge */}
      {service.popular && (
        <div className="absolute top-4 end-4 flex items-center gap-1 bg-gold/15 border border-gold/40 rounded-full px-2.5 py-0.5">
          <Star size={9} className="text-gold fill-gold" />
          <span className="text-[10px] font-bold text-gold">{he ? "פופולרי" : "Popular"}</span>
        </div>
      )}

      {/* Icon */}
      <div className="text-3xl mb-3 leading-none">{service.icon}</div>

      {/* Name */}
      <div className="font-bold text-base text-text-base group-hover:text-gold transition-colors leading-tight">
        {he ? service.nameHe : service.nameEn}
      </div>
      <div className="text-xs text-muted mt-0.5 font-medium">
        {he ? service.nameEn : service.nameHe}
      </div>

      {/* Divider */}
      <div className="my-3 h-px bg-border group-hover:bg-gold/20 transition-colors" />

      {/* Duration + Price */}
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-xs text-muted">
          <Clock size={12} />
          {service.duration} {he ? "דק׳" : "min"}
        </span>
        <span className="text-xl font-extrabold text-gold">₪{service.price}</span>
      </div>
    </button>
  );
}
