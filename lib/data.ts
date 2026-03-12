import type { Service, Barber, DayAppointment } from "./types";

export const SERVICES: Service[] = [
  {
    id: "haircut",
    nameHe: "תספורת קצרה",
    nameEn: "Short Haircut",
    duration: 30,
    price: 80,
    icon: "✂️",
  },
  {
    id: "haircut-beard",
    nameHe: "תספורת + זקן",
    nameEn: "Haircut + Beard",
    duration: 45,
    price: 120,
    icon: "💈",
    popular: true,
  },
  {
    id: "beard",
    nameHe: "גילוח זקן",
    nameEn: "Beard Shave",
    duration: 20,
    price: 50,
    icon: "🪒",
  },
  {
    id: "kids",
    nameHe: "תספורת ילדים",
    nameEn: "Kids Haircut",
    duration: 20,
    price: 60,
    icon: "👦",
  },
  {
    id: "fade",
    nameHe: "פייד + עיצוב",
    nameEn: "Fade + Design",
    duration: 45,
    price: 100,
    icon: "✨",
    popular: true,
  },
  {
    id: "full",
    nameHe: "חבילה מלאה",
    nameEn: "Full Package",
    duration: 60,
    price: 150,
    icon: "👑",
  },
];

export const BARBERS: Barber[] = [
  {
    id: "shalom",
    nameHe: "שלום",
    nameEn: "Shalom",
    titleHe: "ספר ראשי",
    titleEn: "Head Barber",
    rating: 4.9,
    reviewCount: 312,
  },
  {
    id: "david",
    nameHe: "דוד",
    nameEn: "David",
    titleHe: "ספר מומחה פייד",
    titleEn: "Fade Specialist",
    rating: 4.8,
    reviewCount: 187,
  },
];

// Working hours per day (0=Sun, 6=Sat)
export const WORK_HOURS: Record<number, { open: number; close: number } | null> = {
  0: { open: 9, close: 19 },  // Sun
  1: { open: 9, close: 19 },  // Mon
  2: { open: 9, close: 19 },  // Tue
  3: { open: 9, close: 19 },  // Wed
  4: { open: 9, close: 19 },  // Thu
  5: { open: 9, close: 14 },  // Fri (short day before Shabbat)
  6: null,                     // Sat — Shabbat, closed
};

// Fake existing bookings (barber-id → ["HH:MM", ...])
export const EXISTING_BOOKINGS: Record<string, string[]> = {
  shalom: ["09:00", "09:30", "11:00", "14:00", "16:30"],
  david:  ["10:00", "10:30", "13:00", "15:00"],
};

// Fake admin appointments for dashboard
export const MOCK_APPOINTMENTS: DayAppointment[] = [
  { id: "1", clientName: "יוסי כהן",    clientPhone: "050-111-2222", service: "תספורת + זקן", barber: "שלום", time: "09:00", date: "2026-03-12", price: 120, status: "confirmed" },
  { id: "2", clientName: "אבי לוי",     clientPhone: "052-333-4444", service: "פייד + עיצוב",  barber: "דוד",  time: "10:00", date: "2026-03-12", price: 100, status: "confirmed" },
  { id: "3", clientName: "מושה דוד",    clientPhone: "054-555-6666", service: "תספורת קצרה",   barber: "שלום", time: "11:00", date: "2026-03-12", price: 80,  status: "confirmed" },
  { id: "4", clientName: "ראובן שמעון", clientPhone: "053-777-8888", service: "גילוח זקן",      barber: "דוד",  time: "13:00", date: "2026-03-12", price: 50,  status: "completed" },
  { id: "5", clientName: "שמעון לוי",   clientPhone: "058-999-0000", service: "חבילה מלאה",    barber: "שלום", time: "14:00", date: "2026-03-12", price: 150, status: "confirmed" },
  { id: "6", clientName: "דן כהן",      clientPhone: "050-222-3333", service: "תספורת ילדים",  barber: "דוד",  time: "15:00", date: "2026-03-13", price: 60,  status: "confirmed" },
  { id: "7", clientName: "גד אשר",      clientPhone: "052-444-5555", service: "תספורת + זקן",  barber: "שלום", time: "09:30", date: "2026-03-13", price: 120, status: "cancelled" },
  { id: "8", clientName: "נפתלי זבולון", clientPhone: "054-666-7777", service: "פייד + עיצוב", barber: "דוד",  time: "10:30", date: "2026-03-13", price: 100, status: "confirmed" },
];
