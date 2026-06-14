// Shared presentational UI for every calculator — one source of truth for the
// form controls, result cards and verdict badges.
import type { ReactNode } from "react";

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-slate-400">{hint}</span>}
    </label>
  );
}

const inputCls =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200";

export function NumberInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input type="number" inputMode="decimal" className={inputCls} {...props} />;
}

export function Select({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={inputCls} {...props}>
      {children}
    </select>
  );
}

export function SegButton({ active, children, ...props }: { active: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
        active ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
      }`}
      {...props}
    >
      {children}
    </button>
  );
}

export function ResultCard({ children }: { children: ReactNode }) {
  return <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">{children}</div>;
}

export function Stat({ label, value, sub, big }: { label: string; value: ReactNode; sub?: string; big?: boolean }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wide text-slate-400">{label}</div>
      <div className={`font-bold text-slate-900 ${big ? "text-3xl" : "text-xl"}`}>{value}</div>
      {sub && <div className="text-xs text-slate-500">{sub}</div>}
    </div>
  );
}

export function Verdict({ ok, children }: { ok: boolean; children: ReactNode }) {
  return (
    <div
      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold ${
        ok ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
      }`}
    >
      <span aria-hidden>{ok ? "✓" : "✕"}</span>
      {children}
    </div>
  );
}

export function CodeBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
      {children}
    </span>
  );
}
