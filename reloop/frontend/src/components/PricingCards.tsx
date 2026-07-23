import { useState } from "react";
import { createCheckoutSession, setStoredEmail } from "../lib/api";

const FREE_FEATURES = [
  "3 repurposes per day",
  "All 5 platform formats",
  "No credit card required",
];

const PRO_FEATURES = [
  "Unlimited repurposes — no daily cap",
  "All 5 platform formats",
  "Cancel anytime",
];

export default function PricingCards() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleUpgrade(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Enter a valid email so we can attach your subscription to it.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      setStoredEmail(email);
      const { url } = await createCheckoutSession(email);
      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not start checkout.");
      setLoading(false);
    }
  }

  return (
    <div id="pricing" className="grid gap-6 sm:grid-cols-2">
      <div className="rounded-2xl border border-slate-200 p-8 dark:border-slate-800">
        <h3 className="text-lg font-semibold">Free</h3>
        <p className="mt-1 text-3xl font-bold">
          $0<span className="text-base font-normal text-slate-500">/mo</span>
        </p>
        <ul className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-300">
          {FREE_FEATURES.map((f) => (
            <li key={f} className="flex gap-2">
              <span className="text-indigo-500">✓</span>
              {f}
            </li>
          ))}
        </ul>
        <a
          href="/app"
          className="mt-8 block rounded-md border border-slate-300 py-2 text-center text-sm font-semibold hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-900"
        >
          Start for free
        </a>
      </div>

      <div className="rounded-2xl border-2 border-indigo-600 p-8 shadow-lg shadow-indigo-600/10">
        <h3 className="text-lg font-semibold">Pro</h3>
        <p className="mt-1 text-3xl font-bold">
          $19<span className="text-base font-normal text-slate-500">/mo</span>
        </p>
        <ul className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-300">
          {PRO_FEATURES.map((f) => (
            <li key={f} className="flex gap-2">
              <span className="text-indigo-500">✓</span>
              {f}
            </li>
          ))}
        </ul>
        <form onSubmit={handleUpgrade} className="mt-8 space-y-2">
          <input
            type="email"
            required
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-indigo-600 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-60"
          >
            {loading ? "Redirecting to checkout…" : "Upgrade to Pro"}
          </button>
          {error && <p className="text-xs text-red-600">{error}</p>}
        </form>
      </div>
    </div>
  );
}
