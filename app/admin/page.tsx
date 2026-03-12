"use client";

import { useState } from "react";
import { MOCK_APPOINTMENTS } from "@/lib/data";
import type { DayAppointment } from "@/lib/types";
import { cn } from "@/lib/utils";

const ADMIN_PASSWORD = "barber123"; // Replace with real auth later

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState("");
  const [appointments, setAppointments] = useState<DayAppointment[]>(MOCK_APPOINTMENTS);
  const [filterDate, setFilterDate] = useState("2026-03-12");
  const [search, setSearch] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      setAuthed(true);
    } else {
      setPwError("סיסמה שגויה / Wrong password");
    }
  }

  function handleCancel(id: string) {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "cancelled" } : a))
    );
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-4" dir="rtl">
        <div className="w-full max-w-sm bg-card border border-border rounded-2xl p-8 space-y-6">
          <div className="text-center">
            <div className="w-12 h-12 rounded-xl bg-gold flex items-center justify-center text-2xl mx-auto mb-4">
              💈
            </div>
            <h1 className="text-xl font-bold text-text-base">לוח ניהול</h1>
            <p className="text-muted text-sm mt-1">Admin Dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-text-base block mb-1.5">סיסמה</label>
              <input
                type="password"
                value={pw}
                onChange={(e) => { setPw(e.target.value); setPwError(""); }}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-text-base outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all"
              />
              {pwError && <p className="text-xs text-red-400 mt-1">{pwError}</p>}
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gold hover:bg-gold-light text-bg font-bold rounded-xl transition-all"
            >
              כניסה
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Stats
  const todayApts = appointments.filter((a) => a.date === filterDate && a.status !== "cancelled");
  const monthRevenue = appointments
    .filter((a) => a.status !== "cancelled")
    .reduce((sum, a) => sum + a.price, 0);
  const todayRevenue = todayApts.reduce((sum, a) => sum + a.price, 0);

  const filtered = appointments.filter((a) => {
    const matchDate = filterDate ? a.date === filterDate : true;
    const matchSearch =
      search === "" ||
      a.clientName.includes(search) ||
      a.clientPhone.includes(search) ||
      a.service.includes(search);
    return matchDate && matchSearch;
  });

  const statusColors: Record<string, string> = {
    confirmed: "bg-emerald-900/50 text-emerald-400 border-emerald-800",
    completed: "bg-blue-900/50 text-blue-400 border-blue-800",
    cancelled:  "bg-red-900/50 text-red-400 border-red-800",
  };
  const statusLabels: Record<string, string> = {
    confirmed: "מאושר",
    completed: "הושלם",
    cancelled:  "בוטל",
  };

  return (
    <div className="min-h-screen bg-bg text-text-base" dir="rtl">
      {/* Top nav */}
      <header className="sticky top-0 z-50 bg-surface border-b border-border" dir="ltr">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">💈</span>
            <span className="font-bold text-text-base">ספרות שלום — ניהול</span>
          </div>
          <button
            onClick={() => setAuthed(false)}
            className="text-sm text-muted hover:text-red-400 transition-colors"
          >
            יציאה
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "תורים היום",       value: todayApts.length,      sub: filterDate },
            { label: "הכנסות היום",      value: `₪${todayRevenue}`,    sub: filterDate },
            { label: 'הכנסות החודש',    value: `₪${monthRevenue}`,    sub: "מרץ 2026" },
            { label: "סה״כ תורים",       value: appointments.filter(a => a.status !== "cancelled").length, sub: "הכל" },
          ].map((s) => (
            <div key={s.label} className="bg-card border border-border rounded-xl p-4">
              <div className="text-2xl font-bold text-gold">{s.value}</div>
              <div className="text-sm text-text-base font-medium mt-0.5">{s.label}</div>
              <div className="text-xs text-muted mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center">
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="px-3 py-2 bg-card border border-border rounded-xl text-text-base text-sm outline-none focus:border-gold transition-all"
            dir="ltr"
          />
          <input
            placeholder="חיפוש שם, טלפון, שירות..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-[180px] px-3.5 py-2 bg-card border border-border rounded-xl text-text-base text-sm outline-none focus:border-gold transition-all placeholder:text-muted/50"
          />
        </div>

        {/* Appointments table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-border flex items-center justify-between">
            <span className="font-bold text-text-base">
              תורים {filterDate && `— ${filterDate}`}
            </span>
            <span className="text-xs text-muted">{filtered.length} תוצאות</span>
          </div>

          {filtered.length === 0 ? (
            <div className="py-12 text-center text-muted text-sm">אין תורים להצגה</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full" dir="rtl">
                <thead>
                  <tr className="border-b border-border">
                    {["שם", "טלפון", "שירות", "ספר", "שעה", "מחיר", "סטטוס", "פעולה"].map((h) => (
                      <th key={h} className="px-4 py-3 text-right text-xs font-bold text-muted uppercase tracking-wide">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((apt) => (
                    <tr
                      key={apt.id}
                      className={cn(
                        "border-b border-border/50 transition-colors hover:bg-surface/50",
                        apt.status === "cancelled" && "opacity-50"
                      )}
                    >
                      <td className="px-4 py-3 font-semibold text-sm text-text-base">{apt.clientName}</td>
                      <td className="px-4 py-3 text-sm text-muted font-mono" dir="ltr">{apt.clientPhone}</td>
                      <td className="px-4 py-3 text-sm text-text-base">{apt.service}</td>
                      <td className="px-4 py-3 text-sm text-muted">{apt.barber}</td>
                      <td className="px-4 py-3 text-sm font-mono text-gold" dir="ltr">{apt.time}</td>
                      <td className="px-4 py-3 text-sm font-bold text-gold">₪{apt.price}</td>
                      <td className="px-4 py-3">
                        <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full border", statusColors[apt.status])}>
                          {statusLabels[apt.status]}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {apt.status === "confirmed" && (
                          <button
                            onClick={() => handleCancel(apt.id)}
                            className="text-xs text-red-400 hover:text-red-300 transition-colors"
                          >
                            ביטול
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
