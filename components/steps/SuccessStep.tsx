"use client";

import { CheckCircle2, MessageCircle, Scissors, CalendarDays, Clock, User, RotateCcw } from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import { formatDate } from "@/lib/utils";

export function SuccessStep() {
  const { lang, state, reset } = useBooking();
  const he = lang === "he";

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center py-10 px-2 space-y-8 fade-up">

      {/* ── Gold glow icon ── */}
      <div className="relative">
        <div className="absolute inset-0 bg-gold/20 rounded-full blur-3xl scale-[2]" />
        <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-gold-dim to-gold flex items-center justify-center shadow-2xl shadow-gold/50 mx-auto">
          <CheckCircle2 size={44} className="text-bg" strokeWidth={2.5} />
        </div>
      </div>

      {/* ── Heading ── */}
      <div>
        <h2 className="text-4xl font-extrabold text-gold mb-2 tracking-tight">
          {he ? "!התור נקבע" : "You're booked!"}
        </h2>
        <p className="text-muted text-base">
          {he
            ? `${state.clientName ? state.clientName + "," : ""} מחכים לראותך בסלון!`
            : `See you soon${state.clientName ? ", " + state.clientName : ""}!`}
        </p>
      </div>

      {/* ── Summary card ── */}
      <div className="w-full max-w-sm bg-card border border-gold/30 rounded-2xl overflow-hidden text-start shadow-xl shadow-gold/10">
        {/* Card header */}
        <div className="bg-gradient-to-r from-[#1f1a0a] to-[#0f0d06] px-4 py-3 border-b border-gold/20 flex items-center gap-2">
          <Scissors size={14} className="text-gold" />
          <span className="text-xs font-bold text-gold uppercase tracking-widest">
            {he ? "פרטי התור" : "Appointment Details"}
          </span>
        </div>

        <div className="divide-y divide-border">
          {[
            {
              icon: <Scissors size={14} className="text-gold opacity-70" />,
              label: he ? "שירות" : "Service",
              value: he ? state.service?.nameHe : state.service?.nameEn,
            },
            {
              icon: <User size={14} className="text-gold opacity-70" />,
              label: he ? "ספר" : "Barber",
              value: he ? state.barber?.nameHe : state.barber?.nameEn,
            },
            {
              icon: <CalendarDays size={14} className="text-gold opacity-70" />,
              label: he ? "תאריך" : "Date",
              value: state.date ? formatDate(state.date, lang) : "",
            },
            {
              icon: <Clock size={14} className="text-gold opacity-70" />,
              label: he ? "שעה" : "Time",
              value: state.timeSlot,
              ltr: true,
            },
          ].map((row) => (
            <div key={row.label} className="flex justify-between items-center px-4 py-3.5">
              <div className="flex items-center gap-2">
                {row.icon}
                <span className="text-muted text-sm">{row.label}</span>
              </div>
              <span
                className="text-sm font-bold text-text-base"
                dir={row.ltr ? "ltr" : undefined}
              >
                {row.value}
              </span>
            </div>
          ))}

          {/* Price row */}
          <div className="flex justify-between items-center px-4 py-4 bg-[#1a1408]">
            <span className="font-bold text-text-base">{he ? "סה״כ לתשלום" : "Total"}</span>
            <span className="text-2xl font-extrabold text-gold">₪{state.service?.price}</span>
          </div>
        </div>
      </div>

      {/* ── WhatsApp confirmation ── */}
      {state.whatsappReminder && (
        <div className="w-full max-w-sm bg-[#071a07] border border-green-800/50 rounded-2xl p-4 shadow-lg shadow-green-900/20">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
              <MessageCircle size={20} className="text-green-400" />
            </div>
            <div className="text-start">
              <div className="text-sm font-bold text-green-400">
                {he ? "✓ אישור נשלח בווטסאפ" : "✓ WhatsApp confirmation sent"}
              </div>
              <div className="text-xs text-muted mt-0.5">
                {he
                  ? "תקבל תזכורת שעה לפני התור"
                  : "You'll get a reminder 1 hour before"}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Cancel/reschedule note ── */}
      <p className="text-xs text-muted max-w-xs">
        {he
          ? "לביטול או שינוי תור — צור קשר לפחות שעה מראש."
          : "To cancel or reschedule, please contact us at least 1 hour in advance."}
      </p>

      {/* ── Book again ── */}
      <button
        onClick={reset}
        className="flex items-center gap-2 px-6 py-3 rounded-2xl border border-border text-muted hover:border-gold hover:text-gold font-semibold text-sm transition-all hover:bg-[#1c1608]"
      >
        <RotateCcw size={15} />
        {he ? "קבע תור נוסף" : "Book Another Appointment"}
      </button>
    </div>
  );
}
