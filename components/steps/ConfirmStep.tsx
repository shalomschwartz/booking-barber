"use client";

import { useState } from "react";
import { ChevronRight, Lock, Loader2 } from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import { formatDate, cn } from "@/lib/utils";

export function ConfirmStep() {
  const { lang, state, setClientField, goToStep } = useBooking();
  const he = lang === "he";
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const errs: Record<string, string> = {};
    if (!state.clientName.trim())
      errs.name = he ? "נא הכנס שם מלא" : "Please enter your name";
    if (!state.clientPhone.trim())
      errs.phone = he ? "נא הכנס מספר טלפון" : "Please enter your phone";
    return errs;
  }

  async function handleConfirm() {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1400));
    setSubmitting(false);
    goToStep("success");
  }

  return (
    <div className="space-y-5">
      <div className="pt-2">
        <button
          onClick={() => goToStep("datetime")}
          className="text-muted text-sm flex items-center gap-1 mb-3 hover:text-gold transition-colors"
        >
          <ChevronRight size={14} className={he ? "" : "rotate-180"} />
          {he ? "חזור" : "Back"}
        </button>
        <h2 className="text-2xl font-extrabold text-text-base">
          {he ? "פרטים ואישור" : "Your Details"}
        </h2>
        <p className="text-muted text-sm mt-1">{he ? "כמעט סיימנו!" : "Almost done!"}</p>
      </div>

      {/* Booking summary */}
      <div className="bg-card border border-gold/30 rounded-2xl overflow-hidden">
        <div className="bg-[#1f1a0a] px-4 py-2.5 border-b border-gold/20">
          <span className="text-xs font-bold text-gold uppercase tracking-widest">
            {he ? "סיכום הזמנה" : "Booking Summary"}
          </span>
        </div>
        <div className="divide-y divide-border">
          {[
            {
              label: he ? "שירות" : "Service",
              value: he ? state.service?.nameHe : state.service?.nameEn,
              sub: `${state.service?.duration} ${he ? "דק׳" : "min"}`,
            },
            {
              label: he ? "ספר" : "Barber",
              value: he ? state.barber?.nameHe : state.barber?.nameEn,
            },
            {
              label: he ? "תאריך" : "Date",
              value: state.date ? formatDate(state.date, lang) : "",
            },
            {
              label: he ? "שעה" : "Time",
              value: state.timeSlot,
              ltr: true,
            },
          ].map((row) => (
            <div key={row.label} className="flex justify-between items-center px-4 py-3">
              <span className="text-muted text-sm">{row.label}</span>
              <span
                className={cn("text-sm font-semibold text-text-base text-end", row.ltr && "font-mono")}
                dir={row.ltr ? "ltr" : undefined}
              >
                {row.value}
                {row.sub && <span className="text-muted font-normal ms-1">{row.sub}</span>}
              </span>
            </div>
          ))}
          <div className="flex justify-between items-center px-4 py-3 bg-[#1f1a0a]">
            <span className="font-bold text-text-base">{he ? "סה״כ לתשלום" : "Total"}</span>
            <span className="text-2xl font-extrabold text-gold">₪{state.service?.price}</span>
          </div>
        </div>
      </div>

      {/* Deposit notice */}
      <div className="flex items-start gap-3 bg-card border border-border rounded-2xl p-4">
        <span className="text-xl">💳</span>
        <div className="flex-1">
          <div className="text-sm font-bold text-text-base">
            {he ? "מקדמה נדרשת: ₪30" : "Deposit required: ₪30"}
          </div>
          <div className="text-xs text-muted mt-0.5">
            {he ? "יחויב באישור. היתרה תשולם בסלון." : "Charged on confirmation. Balance paid in-store."}
          </div>
          <button className="mt-2.5 text-xs bg-gold text-bg font-bold px-4 py-1.5 rounded-lg hover:bg-gold-light transition-all">
            {he ? "תשלום מאובטח ← Pelecard" : "Secure Payment ← Pelecard"}
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-3">
        <Field
          label={he ? "שם מלא" : "Full Name"}
          placeholder={he ? "ישראל ישראלי" : "John Smith"}
          value={state.clientName}
          onChange={(v) => { setClientField("clientName", v); setErrors(e => ({ ...e, name: "" })); }}
          error={errors.name}
        />
        <Field
          label={he ? "מספר טלפון" : "Phone Number"}
          placeholder="05X-XXXXXXX"
          value={state.clientPhone}
          onChange={(v) => { setClientField("clientPhone", v); setErrors(e => ({ ...e, phone: "" })); }}
          error={errors.phone}
          type="tel"
          dir="ltr"
          prefix="+972"
        />
        <Field
          label={he ? "אימייל (אופציונלי)" : "Email (optional)"}
          placeholder={he ? "israel@example.com" : "john@example.com"}
          value={state.clientEmail}
          onChange={(v) => setClientField("clientEmail", v)}
          type="email"
          dir="ltr"
        />
      </div>

      {/* CTA */}
      <button
        onClick={handleConfirm}
        disabled={submitting}
        className={cn(
          "w-full py-4 rounded-2xl font-extrabold text-bg text-lg transition-all",
          submitting
            ? "bg-gold/50 cursor-not-allowed"
            : "bg-gold hover:bg-gold-light hover:shadow-2xl hover:shadow-gold/30 active:scale-[0.98]"
        )}
      >
        {submitting ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 size={18} className="animate-spin" />
            {he ? "שולח..." : "Confirming..."}
          </span>
        ) : (
          he ? "קבע תור ✓" : "Confirm Booking ✓"
        )}
      </button>

      <p className="text-center text-xs text-muted flex items-center justify-center gap-1.5">
        <Lock size={11} />
        {he ? "המידע שלך מאובטח ולא משותף" : "Your info is secure and never shared"}
      </p>
    </div>
  );
}

function Field({
  label, placeholder, value, onChange, error, type = "text", dir, prefix,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  dir?: string;
  prefix?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-semibold text-text-base block">{label}</label>
      <div className="flex items-center">
        {prefix && (
          <span className="px-3 py-3 bg-border text-muted text-sm rounded-s-xl border border-border font-mono">
            {prefix}
          </span>
        )}
        <input
          type={type}
          dir={dir}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full px-3.5 py-3 bg-card border text-text-base text-sm rounded-xl outline-none transition-all",
            "placeholder:text-muted/40",
            "focus:border-gold focus:ring-1 focus:ring-gold/30",
            error ? "border-red-500 bg-red-950/20" : "border-border",
            prefix && "rounded-s-none border-s-0"
          )}
        />
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
