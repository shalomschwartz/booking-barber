"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { ChevronRight, MessageCircle, Sun, Sunset, Moon, ArrowLeft } from "lucide-react";
import { useBooking } from "@/context/BookingContext";
import { getAvailableSlots, isWorkingDay, isPastDate, cn } from "@/lib/utils";

interface SlotGroup {
  labelHe: string;
  labelEn: string;
  icon: React.ReactNode;
  slots: string[];
}

function groupSlots(slots: string[]): SlotGroup[] {
  const morning:   string[] = [];
  const afternoon: string[] = [];
  const evening:   string[] = [];

  for (const s of slots) {
    const h = parseInt(s.split(":")[0], 10);
    if (h < 12)       morning.push(s);
    else if (h < 16)  afternoon.push(s);
    else              evening.push(s);
  }

  return [
    { labelHe: "בוקר",   labelEn: "Morning",   icon: <Sun size={13} />,    slots: morning },
    { labelHe: "צהריים", labelEn: "Afternoon",  icon: <Sunset size={13} />, slots: afternoon },
    { labelHe: "ערב",    labelEn: "Evening",    icon: <Moon size={13} />,   slots: evening },
  ].filter((g) => g.slots.length > 0);
}

export function DateTimeStep() {
  const { lang, state, setDate, setTimeSlot, setWhatsappReminder, goToStep } = useBooking();
  const he = lang === "he";
  const [localDate, setLocalDate] = useState<Date | undefined>(state.date ?? undefined);

  const rawSlots = localDate && state.barber && state.service
    ? getAvailableSlots(localDate, state.service.duration, state.barber.id)
    : [];

  const groups = groupSlots(rawSlots);

  function handleDayClick(day: Date) {
    setLocalDate(day);
    setDate(day);
  }

  function handleSlotClick(slot: string) {
    setTimeSlot(slot);
  }

  const isDayDisabled = (day: Date) => isPastDate(day) || !isWorkingDay(day);

  return (
    <div className="space-y-5">
      <div className="pt-2">
        <button
          onClick={() => goToStep("barber")}
          className="text-muted text-sm flex items-center gap-1 mb-3 hover:text-gold transition-colors"
        >
          <ChevronRight size={14} className={he ? "" : "rotate-180"} />
          {he ? "חזור" : "Back"}
        </button>
        <h2 className="text-2xl font-extrabold text-text-base">
          {he ? "בחר תאריך ושעה" : "Pick Date & Time"}
        </h2>
        <p className="text-muted text-sm mt-1">
          {he ? "שישי — יום קצר  |  שבת — סגור" : "Friday — short day  |  Saturday — closed"}
        </p>
      </div>

      {/* Selection chips */}
      <div className="flex flex-wrap gap-2" dir="ltr">
        {state.service && (
          <span className="text-xs bg-card border border-border rounded-full px-3 py-1 text-muted">
            {state.service.icon} {he ? state.service.nameHe : state.service.nameEn}
          </span>
        )}
        {state.barber && (
          <span className="text-xs bg-card border border-border rounded-full px-3 py-1 text-muted">
            ✂️ {he ? state.barber.nameHe : state.barber.nameEn}
          </span>
        )}
      </div>

      {/* Calendar */}
      <div className="bg-card rounded-2xl border border-border p-4 flex justify-center" dir="ltr">
        <DayPicker
          mode="single"
          selected={localDate}
          onSelect={(day) => day && handleDayClick(day)}
          disabled={isDayDisabled}
          fromDate={new Date()}
          weekStartsOn={0}
          showOutsideDays={false}
        />
      </div>

      {/* Saturday closed notice */}
      <div className="flex items-center gap-2 bg-red-950/30 border border-red-900/40 rounded-xl px-4 py-2.5">
        <span className="text-base">🕍</span>
        <span className="text-xs text-red-400 font-medium">
          {he ? "שבת — הסלון סגור" : "Saturday — closed (Shabbat)"}
        </span>
      </div>

      {/* Time slots grouped */}
      {localDate && (
        <div className="space-y-4 fade-up">
          {rawSlots.length === 0 ? (
            <div className="text-center py-10 text-muted text-sm bg-card rounded-2xl border border-border">
              {he ? "אין זמינות ביום זה" : "No availability on this day"}
            </div>
          ) : (
            groups.map((group) => (
              <div key={group.labelHe}>
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="text-muted">{group.icon}</span>
                  <span className="text-xs font-bold text-muted uppercase tracking-wide">
                    {he ? group.labelHe : group.labelEn}
                  </span>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                  {group.slots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => handleSlotClick(slot)}
                      className={
                        "py-2.5 rounded-xl text-sm font-bold border transition-all " +
                        (state.timeSlot === slot
                          ? "bg-gold text-bg border-gold gold-pulse shadow-lg shadow-gold/30"
                          : "bg-card border-border text-text-base hover:border-gold/60 hover:text-gold hover:bg-[#1c1608]")
                      }
                      dir="ltr"
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}

          {/* WhatsApp reminder */}
          {rawSlots.length > 0 && (
            <label className="flex items-center gap-3 cursor-pointer select-none p-4 bg-card rounded-2xl border border-border hover:border-gold/40 transition-colors mt-2">
              <div
                className={
                  "w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-all " +
                  (state.whatsappReminder ? "bg-green-500 shadow-md shadow-green-500/30" : "bg-border")
                }
                onClick={() => setWhatsappReminder(!state.whatsappReminder)}
              >
                {state.whatsappReminder && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <div className="flex items-start gap-2.5">
                <MessageCircle size={18} className="text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-sm font-semibold text-text-base">
                    {he ? "שלח לי תזכורת בווטסאפ 📱" : "Send me a WhatsApp reminder 📱"}
                  </div>
                  <div className="text-xs text-muted mt-0.5">
                    {he ? "שעה לפני התור — חינם" : "1 hour before appointment — free"}
                  </div>
                </div>
              </div>
            </label>
          )}
        </div>
      )}

      {/* Continue button */}
      {state.timeSlot && (
        <div className="fade-up">
          <button
            onClick={() => goToStep("confirm")}
            className="w-full py-4 bg-gold hover:bg-gold-light text-bg font-extrabold text-lg rounded-2xl transition-all hover:shadow-xl hover:shadow-gold/30 active:scale-[0.98]"
          >
            {he ? "המשך ← " + state.timeSlot : "Continue → " + state.timeSlot}
          </button>
        </div>
      )}
    </div>
  );
}
