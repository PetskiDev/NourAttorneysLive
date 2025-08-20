"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import s from "../admin.module.css";

type Session = { loggedIn: boolean; remainingSec?: number };

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState<Session>({ loggedIn: false });

  async function loadSession() {
    try {
      const res = await fetch("/api/admin/login", { cache: "no-store" });
      const json = (await res.json()) as Session;
      setSession(json);
    } catch {
      setSession({ loggedIn: false });
    }
  }

  useEffect(() => {
    void loadSession();
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const msg = ((await res.json().catch(() => null)) as { error?: string } | null)?.error;
        throw new Error(msg ?? "Login failed");
      }
      setPassword("");
      await loadSession();
      router.replace("/admin");
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Login failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 24, maxWidth: 420, margin: "0 auto" }}>
      <h1 style={{ marginTop: 0 }}>Admin · Login</h1>
      {session.loggedIn ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ color: "#1b5e20" }}>You are logged in.</div>
          {typeof session.remainingSec === "number" ? (
            <div style={{ color: "#555" }}>Session remaining (sec): {session.remainingSec}</div>
          ) : null}
          <div style={{ display: "flex", gap: 8 }}>
            <button type="button" className={s.btn} onClick={() => router.push("/admin")}>
              Go to dashboard
            </button>
            <button
              type="button"
              className={`${s.btn} ${s.btnDanger}`}
              onClick={async () => {
                await fetch("/api/admin/logout", { method: "POST" });
                await loadSession();
              }}
            >
              Log out
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <label htmlFor="password" style={{ fontWeight: 600 }}>Password</label>
          <input
            id="password"
            type="password"
            className={s.input}
            value={password}
            placeholder="Enter admin password"
            onChange={(e) => setPassword(e.target.value)}
            required
            autoFocus
          />
          {error ? <div style={{ color: "#b00020" }}>{error}</div> : null}
          <button type="submit" className={`${s.btn} ${s.btnPrimary}`} disabled={loading}>
            {loading ? "Logging in…" : "Log in"}
          </button>
        </form>
      )}
    </div>
  );
}


