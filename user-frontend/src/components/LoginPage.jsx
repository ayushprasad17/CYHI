import React, { useState } from "react";
import {
  School,
  GraduationCap,
  ShieldCheck,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { C, grad } from "../theme";
import { PrimaryButton } from "./ui";
import { apiRequest } from "../api";

export function LoginPage({ onLogin }) {
  const [selected, setSelected] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const selectRole = (role) => {
    setSelected(role);
    setEmail("");
    setPassword("");
    setError("");
  };

  const submit = async () => {
    if (!email.trim() || !password.trim()) {
      setError("Enter your email and password.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const data = await apiRequest("/login", {
        method: "POST",
        body: JSON.stringify({
          username: email.trim(),
          password,
        }),
      });

      if (selected === "admin" && data.user.role !== "admin") {
        throw new Error("This account is not an admin account.");
      }

      if (selected === "student" && data.user.role !== "student") {
        throw new Error("This account is not a student account.");
      }

      const storage = remember ? localStorage : sessionStorage;

      storage.setItem("cyhi_token", data.token);
      storage.setItem("cyhi_user", JSON.stringify(data.user));

      if (data.user.role === "admin") {
        window.location.href = "http://localhost:5175";
      } else {
        onLogin(data.user);
      }
    } catch (err) {
      let message = "Invalid email or password.";

      try {
        const parsed = JSON.parse(err.message);
        if (parsed.message) message = parsed.message;
      } catch {
        if (err.message) message = err.message;
      }

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (!selected) {
    return (
      <div
        className="min-h-screen w-full flex items-center justify-center p-6"
        style={{ background: C.bg }}
      >
        <div className="w-full max-w-3xl">
          <div className="text-center mb-10">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
              style={{ background: grad }}
            >
              <School size={24} color="white" />
            </div>

            <h1
              className="text-2xl font-semibold mb-2"
              style={{ color: C.text }}
            >
              IIIT DMJ Information Hub
            </h1>

            <p className="text-sm" style={{ color: C.sub }}>
              Choose your login portal to continue
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <button
              onClick={() => selectRole("student")}
              className="text-left rounded-2xl p-7 transition-all hover:scale-[1.02]"
              style={{
                background: "#0B1120",
                border: `1px solid ${C.border}`,
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: "rgba(91,107,245,0.15)" }}
              >
                <GraduationCap size={25} style={{ color: "#A6B0FF" }} />
              </div>

              <h2
                className="text-xl font-semibold mb-2"
                style={{ color: C.text }}
              >
                Student Login
              </h2>

              <p className="text-sm" style={{ color: C.sub }}>
                Access your timetable, attendance, assignments, notices,
                events, faculty and campus resources.
              </p>

              <div
                className="mt-6 text-sm font-medium"
                style={{ color: "#A6B0FF" }}
              >
                Continue as Student →
              </div>
            </button>

            <button
              onClick={() => selectRole("admin")}
              className="text-left rounded-2xl p-7 transition-all hover:scale-[1.02]"
              style={{
                background: "#0B1120",
                border: `1px solid ${C.border}`,
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: "rgba(139,92,246,0.15)" }}
              >
                <ShieldCheck size={25} style={{ color: "#BFA8FF" }} />
              </div>

              <h2
                className="text-xl font-semibold mb-2"
                style={{ color: C.text }}
              >
                Admin Login
              </h2>

              <p className="text-sm" style={{ color: C.sub }}>
                Manage students, notices, events, clubs, resources and
                campus information.
              </p>

              <div
                className="mt-6 text-sm font-medium"
                style={{ color: "#BFA8FF" }}
              >
                Continue as Admin →
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isAdmin = selected === "admin";

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-6"
      style={{ background: C.bg }}
    >
      <div className="w-full max-w-sm">
        <button
          onClick={() => selectRole(null)}
          className="text-sm mb-7"
          style={{ color: C.sub }}
        >
          ← Choose another portal
        </button>

        <div className="flex items-center gap-3 mb-1">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: grad }}
          >
            {isAdmin ? (
              <ShieldCheck size={20} color="white" />
            ) : (
              <GraduationCap size={20} color="white" />
            )}
          </div>

          <h2
            className="text-xl font-semibold"
            style={{ color: C.text }}
          >
            {isAdmin ? "Admin Login" : "Student Login"}
          </h2>
        </div>

        <p className="text-[13px] mb-7" style={{ color: C.sub }}>
          {isAdmin
            ? "Sign in to manage the Student Information Hub."
            : "Sign in with your college email and password."}
        </p>

        <label
          className="text-[12px] font-medium block mb-1.5"
          style={{ color: C.sub }}
        >
          {isAdmin ? "Admin Email" : "College Email"}
        </label>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder={
            isAdmin
              ? "admin@iiitdmj.ac.in"
              : "25bcs044@iiitdmj.ac.in"
          }
          className="w-full rounded-xl px-3.5 py-2.5 text-sm mb-4 outline-none"
          style={{
            background: "#0B1120",
            border: `1px solid ${C.border}`,
            color: C.text,
          }}
        />

        <label
          className="text-[12px] font-medium block mb-1.5"
          style={{ color: C.sub }}
        >
          Password
        </label>

        <div className="relative mb-3">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            type={showPw ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full rounded-xl px-3.5 py-2.5 text-sm outline-none pr-10"
            style={{
              background: "#0B1120",
              border: `1px solid ${C.border}`,
              color: C.text,
            }}
          />

          <button
            type="button"
            onClick={() => setShowPw((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
            style={{ color: C.faint }}
          >
            {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        {error && (
          <div
            className="flex items-center gap-2 text-[12.5px] mb-3"
            style={{ color: "#FF8092" }}
          >
            <AlertCircle size={14} />
            {error}
          </div>
        )}

        <div className="flex items-center mb-6">
          <label
            className="flex items-center gap-2 text-[13px] cursor-pointer"
            style={{ color: C.sub }}
          >
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="accent-[#5B6BF5]"
            />
            Remember me
          </label>
        </div>

        <PrimaryButton onClick={submit} full disabled={loading}>
          {loading ? "Signing in…" : "Login"}
        </PrimaryButton>

        <p
          className="text-center text-[12px] mt-5"
          style={{ color: C.faint }}
        >
          {isAdmin
            ? "Admin access is restricted."
            : "Don't have an account? Contact Admin"}
        </p>
      </div>
    </div>
  );
}
