"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import type { BookingState, BookingStep, Service, Barber, Lang } from "@/lib/types";

interface BookingContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  state: BookingState;
  setService: (s: Service) => void;
  setBarber: (b: Barber) => void;
  setDate: (d: Date) => void;
  setTimeSlot: (t: string) => void;
  setClientField: (field: "clientName" | "clientPhone" | "clientEmail", value: string) => void;
  setWhatsappReminder: (v: boolean) => void;
  goToStep: (step: BookingStep) => void;
  reset: () => void;
}

const defaultState: BookingState = {
  step: "service",
  service: null,
  barber: null,
  date: null,
  timeSlot: null,
  clientName: "",
  clientPhone: "",
  clientEmail: "",
  whatsappReminder: true,
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("he");
  const [state, setState] = useState<BookingState>(defaultState);

  const setService = useCallback((service: Service) => {
    setState(s => ({ ...s, service, step: "barber" }));
  }, []);

  const setBarber = useCallback((barber: Barber) => {
    setState(s => ({ ...s, barber, step: "datetime" }));
  }, []);

  const setDate = useCallback((date: Date) => {
    setState(s => ({ ...s, date, timeSlot: null }));
  }, []);

  const setTimeSlot = useCallback((timeSlot: string) => {
    setState(s => ({ ...s, timeSlot }));
  }, []);

  const setClientField = useCallback(
    (field: "clientName" | "clientPhone" | "clientEmail", value: string) => {
      setState(s => ({ ...s, [field]: value }));
    },
    []
  );

  const setWhatsappReminder = useCallback((whatsappReminder: boolean) => {
    setState(s => ({ ...s, whatsappReminder }));
  }, []);

  const goToStep = useCallback((step: BookingStep) => {
    setState(s => ({ ...s, step }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const reset = useCallback(() => {
    setState(defaultState);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <BookingContext.Provider
      value={{
        lang, setLang,
        state,
        setService, setBarber, setDate, setTimeSlot,
        setClientField, setWhatsappReminder,
        goToStep, reset,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking(): BookingContextValue {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside BookingProvider");
  return ctx;
}
