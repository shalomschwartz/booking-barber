import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { WORK_HOURS, EXISTING_BOOKINGS } from "./data";
import type { Lang } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date, lang: Lang): string {
  if (lang === "he") {
    return date.toLocaleDateString("he-IL", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function formatShortDate(date: Date): string {
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}

export function formatPhone(raw: string): string {
  // Normalize Israeli phone: strip spaces/dashes, add +972 prefix
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("972")) return `+${digits}`;
  if (digits.startsWith("0")) return `+972${digits.slice(1)}`;
  return `+972${digits}`;
}

export function isValidIsraeliPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  // Israeli mobile: 05X-XXXXXXX = 10 digits starting with 05
  return /^0(5[0-9])\d{7}$/.test(digits) || /^972(5[0-9])\d{7}$/.test(digits);
}

export function getAvailableSlots(
  date: Date,
  durationMins: number,
  barberId: string
): string[] {
  const dayOfWeek = date.getDay();
  const hours = WORK_HOURS[dayOfWeek];
  if (!hours) return [];

  const booked = EXISTING_BOOKINGS[barberId] ?? [];
  const slots: string[] = [];
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();

  for (let h = hours.open; h < hours.close; h++) {
    for (let m = 0; m < 60; m += 30) {
      // Don't offer a slot if the service won't finish before closing
      if (h * 60 + m + durationMins > hours.close * 60) break;

      const slotTime = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;

      // Skip past slots for today
      if (isToday) {
        const slotDate = new Date(date);
        slotDate.setHours(h, m + 10, 0, 0); // 10-min buffer
        if (slotDate <= now) continue;
      }

      if (!booked.includes(slotTime)) {
        slots.push(slotTime);
      }
    }
  }

  return slots;
}

export function isShabbat(date: Date): boolean {
  return date.getDay() === 6;
}

export function isWorkingDay(date: Date): boolean {
  return WORK_HOURS[date.getDay()] !== null;
}

export function isPastDate(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

export function whatsappMessage(
  lang: Lang,
  name: string,
  barberName: string,
  serviceName: string,
  dateStr: string,
  time: string
): string {
  if (lang === "he") {
    return `שלום ${name}! 💈\nהתור שלך אצל ${barberName} אושר.\n📅 ${dateStr} בשעה ${time}\n✂️ ${serviceName}\n\nנתראה!`;
  }
  return `Hey ${name}! 💈\nYour appointment with ${barberName} is confirmed.\n📅 ${dateStr} at ${time}\n✂️ ${serviceName}\n\nSee you soon!`;
}
