"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useBooking } from "@/context/BookingContext";
import { getAvailableSlots, isWorkingDay, isPastDate, cn } from "@/lib/utils";

export function DateTimeStep() {
  const { lang, state, setDate, setTimeSlot, goToStep } = useBooking();
  const he = lang === "he";
  const [localDate, setLocalDate] = useState<Date | undefined>(state.date ?? undefined);

  const slots =
    localDate && state.barber && state.service
      ? getAvailableSlots(localDate, state.service.duration, state.barber.id)
      : [];

  function handleDayClick(day: Date) {
    setLocalDate(day);
    setDate(day);
  }

  function handleSlotClick(slot: string) {
    setTimeSlot(slot);
    // small delay then advance
    setTimeout(() => goToStep("confirm"), 300);
  }

  const isDayDisabled = (day: Date) =>
    isPastDate(day) || !isWorkingDay(day);

  return (
    <div className="space-y-5">
      <div className="pt-2">
        <button
          onClick={() => goToStep("barber")}
          className="text-muted text-sm flex items-center gap-1 mb-3 hover:text-gold transition-colors"
        >
          <span>{he ? "→" : "←"}</span>
          <span>{he ? "חזור" : "Back"}</span>
        </button>
        <h2 className="text-xl font-bold text-text-base">
          {he ? "בחר תאריך ושעה" : "Pick Date & Time"}
        </h2>
        <p className="text-muted text-sm mt-0.5">
          {he ? "שישי — יום קצר | שבת — סגור" : "Friday — short day | Saturday — closed"}
        </p>
      </div>

      {/* Selected service + barber summary chips */}
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
      <div className="bg-card rounded-xl border border-border p-4 flex justify-center" dir="ltr">
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

      {/* Time slots */}
      {localDate && (
        <div className="fade-up">
          <h3 className="text-sm font-semibold text-text-base mb-3">
            {he ? "שעות פנויות" : "Available Times"}
          </h3>

          {slots.length === 0 ? (
            <div className="text-center py-8 text-muted text-sm bg-card rounded-xl border border-border">
              {he ? "אין זמינות ביום זה" : "No availability on this day"}
            </div>
          ) : (
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
              {slots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => handleSlotClick(slot)}
                  className={cn(
                    "py-2.5 rounded-lg text-sm font-semibold border transition-all",
                    state.timeSlot === slot
                      ? "bg-gold text-bg border-gold gold-pulse"
                      : "bg-card border-border text-text-base hover:border-gold hover:text-gold"
                  )}
                  dir="ltr"
                >
                  {slot}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Continue if slot selected */}
      {state.timeSlot && (
        <div className="fade-up">
          <button
            onClick={() => goToStep("confirm")}
            className="w-full py-3.5 bg-gold hover:bg-gold-light text-bg font-bold rounded-xl transition-all hover:shadow-lg hover:shadow-gold/30 active:scale-[0.98]"
          >
            {he ? `המשך ← ${state.timeSlot}` : `Continue → ${state.timeSlot}`}
          </button>
        </div>
      )}
    </div>
  );
}
