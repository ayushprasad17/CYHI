import React, { useState } from "react";
import { School, GraduationCap, AlertCircle, Eye, EyeOff } from "lucide-react";
import { C, grad } from "../theme";
import { PrimaryButton } from "./ui";

/* ----------------------------------------------------------------------- */
/*  LOGIN PAGE                                                             */
/* ----------------------------------------------------------------------- */
export function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = () => {
    if (!email.trim() || !password.trim()) {
      setError("Enter your college email and password to continue.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 550);
  };

  return (
    <div className="min-h-screen w-full flex" style={{ background: C.bg }}>
      {/* Left visual panel */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden flex-col justify-between p-12">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 20% 15%, rgba(91,107,245,0.35), transparent 45%), radial-gradient(circle at 80% 85%, rgba(139,92,246,0.3), transparent 50%), #0A0E1C",
          }}
        />
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: grad }}>
            <School size={20} color="white" />
          </div>
          <span className="font-semibold text-lg" style={{ color: C.text }}>IIIT DMJ</span>
        </div>
        <div className="relative z-10">
          <h1 className="text-[42px] leading-[1.1] font-semibold mb-4" style={{ color: C.text }}>
            Your Campus.<br />One Information Hub.
          </h1>
          <p className="text-[15px] max-w-md" style={{ color: C.sub }}>
            Timetables, attendance, notices, assignments, and campus resources — all
            in one place, built for how students actually move through their day.
          </p>
        </div>
        <p className="relative z-10 text-[13px]" style={{ color: C.faint }}>Learn. Build. Grow.</p>
      </div>

      {/* Right form panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-3 mb-10 justify-center">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: grad }}>
              <School size={18} color="white" />
            </div>
            <span className="font-semibold text-lg" style={{ color: C.text }}>IIIT DMJ</span>
          </div>

          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "rgba(91,107,245,0.15)" }}>
              <GraduationCap size={18} style={{ color: "#A6B0FF" }} />
            </div>
            <h2 className="text-lg font-semibold" style={{ color: C.text }}>Student Login</h2>
          </div>
          <p className="text-[13px] mb-7" style={{ color: C.sub }}>Sign in with your college email and password.</p>

          <label className="text-[12px] font-medium block mb-1.5" style={{ color: C.sub }}>Email / Student ID</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="you@college.edu"
            className="w-full rounded-xl px-3.5 py-2.5 text-sm mb-4 outline-none"
            style={{ background: "#0B1120", border: `1px solid ${C.border}`, color: C.text }}
          />

          <label className="text-[12px] font-medium block mb-1.5" style={{ color: C.sub }}>Password</label>
          <div className="relative mb-3">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              type={showPw ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full rounded-xl px-3.5 py-2.5 text-sm outline-none pr-10"
              style={{ background: "#0B1120", border: `1px solid ${C.border}`, color: C.text }}
            />
            <button onClick={() => setShowPw((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: C.faint }}>
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-[12.5px] mb-3" style={{ color: "#FF8092" }}>
              <AlertCircle size={14} /> {error}
            </div>
          )}

          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center gap-2 text-[13px] cursor-pointer" style={{ color: C.sub }}>
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="accent-[#5B6BF5]" />
              Remember me
            </label>
            <button className="text-[13px] font-medium" style={{ color: "#A6B0FF" }}>Forgot password?</button>
          </div>

          <PrimaryButton onClick={submit} full disabled={loading}>
            {loading ? "Signing in…" : "Login"}
          </PrimaryButton>

          <p className="text-center text-[13px] mt-5" style={{ color: C.sub }}>
            Don't have an account? <span className="font-medium" style={{ color: "#A6B0FF" }}>Contact Admin</span>
          </p>

          <div className="mt-8 rounded-xl px-3.5 py-3 text-[12px] leading-relaxed" style={{ background: "rgba(91,107,245,0.08)", border: `1px solid ${C.border}`, color: C.sub }}>
            Demo access: enter any email and password to explore the hub — this
            frontend runs entirely on mock data and is ready to be wired to a real backend.
          </div>
        </div>
      </div>
    </div>
  );
}
