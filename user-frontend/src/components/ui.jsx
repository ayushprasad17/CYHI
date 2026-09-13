import React from "react";
import { Check } from "lucide-react";
import { C, grad } from "../theme";

/* ----------------------------------------------------------------------- */
/*  SMALL UI ATOMS                                                         */
/* ----------------------------------------------------------------------- */
export function Card({ children, className = "", style }) {
  return (
    <div
      className={`rounded-2xl ${className}`}
      style={{ background: C.panel2, border: `1px solid ${C.border}`, ...style }}
    >
      {children}
    </div>
  );
}

export function Badge({ children, tone = "default" }) {
  const tones = {
    default: { bg: "rgba(255,255,255,0.08)", fg: C.sub },
    high: { bg: "rgba(240,71,91,0.15)", fg: "#FF8092" },
    medium: { bg: "rgba(245,165,36,0.15)", fg: "#FFC069" },
    low: { bg: "rgba(34,197,94,0.15)", fg: "#5CE28C" },
    ongoing: { bg: "rgba(34,197,94,0.15)", fg: "#5CE28C" },
    upcoming: { bg: "rgba(91,107,245,0.18)", fg: "#A6B0FF" },
    break: { bg: "rgba(255,255,255,0.06)", fg: C.faint },
    submitted: { bg: "rgba(34,197,94,0.15)", fg: "#5CE28C" },
    notsubmitted: { bg: "rgba(240,71,91,0.15)", fg: "#FF8092" },
    overdue: { bg: "rgba(245,165,36,0.15)", fg: "#FFC069" },
  };
  const t = tones[tone] || tones.default;
  return (
    <span
      className="px-2 py-0.5 rounded-md text-[11px] font-medium whitespace-nowrap"
      style={{ background: t.bg, color: t.fg }}
    >
      {children}
    </span>
  );
}

export function IconBtn({ icon: Icon, onClick, active, size = 18, title }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="rounded-lg p-2 transition-colors"
      style={{
        background: active ? "rgba(255,255,255,0.08)" : "transparent",
        color: active ? C.text : C.sub,
      }}
    >
      <Icon size={size} />
    </button>
  );
}

export function PrimaryButton({ children, onClick, className = "", full, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-transform active:scale-[0.98] ${full ? "w-full" : ""} ${className}`}
      style={{
        background: disabled ? "rgba(255,255,255,0.08)" : grad,
        color: disabled ? C.faint : "white",
        boxShadow: disabled ? "none" : "0 8px 20px -8px rgba(91,107,245,0.6)",
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {children}
    </button>
  );
}

export function GhostButton({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-colors ${className}`}
      style={{ background: "rgba(255,255,255,0.05)", color: C.text, border: `1px solid ${C.border}` }}
    >
      {children}
    </button>
  );
}

export function SectionTitle({ title, subtitle, action }) {
  return (
    <div className="flex items-start justify-between gap-3 mb-4">
      <div>
        <h2 className="text-[17px] font-semibold" style={{ color: C.text }}>{title}</h2>
        {subtitle && <p className="text-[13px] mt-0.5" style={{ color: C.sub }}>{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function Toast({ message }) {
  if (!message) return null;
  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 animate-[fadein_0.2s_ease]"
      style={{ background: C.panel2, border: `1px solid ${C.borderStrong}`, color: C.text, boxShadow: "0 12px 30px rgba(0,0,0,0.5)" }}
    >
      <Check size={15} style={{ color: C.green }} />
      {message}
    </div>
  );
}

export function Avatar({ size = 36 }) {
  return (
    <div
      className="rounded-full flex items-center justify-center font-semibold shrink-0"
      style={{ width: size, height: size, background: grad, color: "white", fontSize: size * 0.4 }}
    >
      AK
    </div>
  );
}
