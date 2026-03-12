export type Lang = "he" | "en";

export interface Service {
  id: string;
  nameHe: string;
  nameEn: string;
  duration: number; // minutes
  price: number; // ILS
  icon: string;
  popular?: boolean;
}

export interface Barber {
  id: string;
  nameHe: string;
  nameEn: string;
  titleHe: string;
  titleEn: string;
  photo?: string; // URL or undefined for placeholder
  rating: number;
  reviewCount: number;
}

export interface TimeSlot {
  time: string; // "HH:MM"
  available: boolean;
}

export type BookingStep = "service" | "barber" | "datetime" | "confirm" | "success";

export interface BookingState {
  step: BookingStep;
  service: Service | null;
  barber: Barber | null;
  date: Date | null;
  timeSlot: string | null;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  whatsappReminder: boolean;
}

export interface DayAppointment {
  id: string;
  clientName: string;
  clientPhone: string;
  service: string;
  barber: string;
  time: string;
  date: string;
  price: number;
  status: "confirmed" | "cancelled" | "completed";
}
