"use client";

import { useBooking } from "@/context/BookingContext";
import { formatDate, formatShortDate } from "@/lib/utils";

export function SuccessStep() {
  const { lang, state, reset } = useBooking();
  const he = lang === "he";

  return (
    <div className="text-center py-8 px-2 space-y-6 fade-up">
      {/* Success icon with gold glow */}
      <div className="relative inline-block">
        <div className="absolute inset-0 bg-gold/20 rounded-full blur-2xl scale-150" />
        <div className="relative w-20 h-20 rounded-full bg-gold flex items-center justify-center mx-auto shadow-xl shadow-gold/40">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <path d="M8 18l7 7L28 11" stroke="#0a0a0a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold text-gold mb-2">
          {he ? "!התור נקבע" : "You're booked!"}
        </h2>
        <p className="text-muted text-base">
          {he
            ? `${state.clientName}, מחכים לראותך!`
            : `See you soon, ${state.clientName}!`}
        </p>
      </div>

      {/* Summary card */}
      <div className="bg-card border border-gold/30 rounded-2xl overflow-hidden text-start mx-auto max-w-sm">
        <div className="bg-[#1f1a0a] px-4 py-2.5 border-b border-gold/20">
          <span className="text-xs font-bold text-gold uppercase tracking-wider">
            {he ? "פרטי התור" : "Appointment Details"}
          </span>
        </div>
        <div className="divide-y divide-border">
          {[
            { label: he ? "שירות" : "Service",  value: he ? state.service?.nameHe : state.service?.nameEn },
            { label: he ? "ספר" : "Barber",     value: he ? state.barber?.nameHe  : state.barber?.nameEn },
            { label: he ? "תאריך" : "Date",     value: state.date ? formatDate(state.date, lang) : "" },
            { label: he ? "שעה" : "Time",       value: state.timeSlot, ltr: true },
            { label: he ? "מחיר" : "Price",     value: `₪${state.service?.price}` },
          ].map((row) => (
            <div key={row.label} className="flex justify-between items-center px-4 py-3">
              <span className="text-muted text-sm">{row.label}</span>
              <span className="text-sm font-semibold text-text-base" dir={row.ltr ? "ltr" : undefined}>
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* WhatsApp confirmation stub */}
      {state.whatsappReminder && (
        <div className="bg-[#0d1f0d] border border-green-800/50 rounded-xl p-4 max-w-sm mx-auto">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📱</span>
            <div className="text-start">
              <div className="text-sm font-semibold text-green-400">
                {he ? "אישור נשלח בווטסאפ" : "WhatsApp confirmation sent"}
              </div>
              <div className="text-xs text-muted mt-0.5">
                {he
                  ? `הודעה נשלחה ל-${state.clientPhone}`
                  : `Message sent to ${state.clientPhone}`}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule / cancel note */}
      <p className="text-xs text-muted max-w-xs mx-auto">
        {he
          ? "לביטול או שינוי התור, צור קשר לפחות שעה מראש."
          : "To cancel or reschedule, please contact us at least 1 hour in advance."}
      </p>

      {/* Book again */}
      <button
        onClick={reset}
        className="w-full max-w-xs mx-auto block py-3 rounded-xl border border-border text-muted hover:border-gold hover:text-gold font-semibold text-sm transition-all"
      >
        {he ? "קבע תור נוסף" : "Book Another Appointment"}
      </button>
    </div>
  );
}
