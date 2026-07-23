import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStatus } from "../lib/api";

export default function Success() {
  const [pro, setPro] = useState<boolean | null>(null);

  useEffect(() => {
    const email = localStorage.getItem("reloop_email");
    if (!email) return;

    let cancelled = false;
    let attempts = 0;

    const poll = async () => {
      attempts += 1;
      try {
        const res = await getStatus(email);
        if (cancelled) return;
        if (res.pro || attempts >= 6) {
          setPro(res.pro);
          return;
        }
        setTimeout(poll, 1500);
      } catch {
        if (!cancelled) setPro(null);
      }
    };

    poll();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="mx-auto max-w-lg px-6 py-24 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-2xl dark:bg-green-950">
        ✓
      </div>
      <h1 className="text-2xl font-bold">Thanks for subscribing</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-300">
        {pro === null &&
          "Confirming your subscription — this can take a few seconds while Stripe notifies us."}
        {pro === true &&
          "You're on Pro. Unlimited repurposes are unlocked for the email you checked out with."}
        {pro === false &&
          "Payment succeeded, but Pro access hasn't activated yet. If this doesn't clear in a minute, reload this page."}
      </p>
      <Link
        to="/app"
        className="mt-6 inline-block rounded-md bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500"
      >
        Open the tool
      </Link>
    </div>
  );
}
