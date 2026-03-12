"use client";

import { useBooking } from "@/context/BookingContext";
import { SERVICES } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { Service } from "@/lib/types";

export function ServiceStep() {
  const { lang, setService } = useBooking();
  const he = lang === "he";

  return (
    <div className="space-y-4">
      <div className="pt-2">
        <h2 className="text-xl font-bold text-text-base">
          {he ? "בחר שירות" : "Select a Service"}
        </h2>
        <p className="text-muted text-sm mt-0.5">
          {he ? "איזה שירות אתה מחפש היום?" : "What are you looking for today?"}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SERVICES.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            lang={lang}
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
  onSelect,
}: {
  service: Service;
  lang: "he" | "en";
  onSelect: (s: Service) => void;
}) {
  const he = lang === "he";

  return (
    <button
      onClick={() => onSelect(service)}
      className={cn(
        "relative text-start w-full p-4 rounded-xl border transition-all group",
        "bg-card border-border hover:border-gold hover:bg-[#1f1a0a]",
        "active:scale-[0.98]"
      )}
    >
      {service.popular && (
        <span className="absolute top-3 end-3 text-[10px] font-bold bg-gold text-bg px-2 py-0.5 rounded-full">
          {he ? "פופולרי" : "Popular"}
        </span>
      )}
      <div className="flex items-start gap-3">
        <div className="text-2xl leading-none mt-0.5">{service.icon}</div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-text-base group-hover:text-gold transition-colors leading-tight">
            {he ? service.nameHe : service.nameEn}
          </div>
          <div className="text-xs text-muted mt-0.5">
            {he ? service.nameEn : service.nameHe}
          </div>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-xs text-muted flex items-center gap-1">
              <ClockIcon />
              {service.duration} {he ? "דק׳" : "min"}
            </span>
            <span className="text-base font-bold text-gold">₪{service.price}</span>
          </div>
        </div>
      </div>
    </button>
  );
}

function ClockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M6 3v3l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
