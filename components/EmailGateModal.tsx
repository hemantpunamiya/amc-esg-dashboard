"use client";

import { useState, useEffect } from "react";

const FORMINIT_URL = "https://forminit.com/f/j6uvttw24dn";
const STORAGE_KEY = "amc_email_submitted";

export default function EmailGateModal() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const submitted = localStorage.getItem(STORAGE_KEY);
    if (!submitted) setVisible(true);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const form = new FormData();
      form.append("fi-sender-email", trimmed);
      await fetch(FORMINIT_URL, { method: "POST", body: form });
      localStorage.setItem(STORAGE_KEY, "1");
      setVisible(false);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm">
      <div className="flex min-h-full items-start justify-center px-4 py-16 sm:items-center sm:py-8">
        <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
          {/* No close button — modal only dismisses on submit */}

          <div className="mb-6 text-center">
            <div className="mb-3 text-4xl">📊</div>
            <h2 className="text-xl font-bold text-gray-900">
              Indian Financial Sector ESG Dashboard
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              44 institutions · AMCs · Insurers · NBFCs · Wealth Managers
            </p>
          </div>

          <p className="mb-6 text-center text-sm text-gray-600">
            Enter your email to access the full analysis — Scope 3 gaps,
            GHG benchmarks, and peer rankings across India's financial sector.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            {error && <p className="text-xs text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60 transition-colors"
            >
              {loading ? "Submitting…" : "Access Dashboard →"}
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-gray-400">
            By AccelentPartners · amc-esg-dashboard.vercel.app
          </p>
        </div>
      </div>
    </div>
  );
}
