import { Link } from "react-router-dom";
import PricingCards from "../components/PricingCards";

const STEPS = [
  {
    title: "Paste your content",
    body: "Drop in a blog post, podcast transcript, meeting notes, or a rough update.",
  },
  {
    title: "Pick your platforms",
    body: "LinkedIn, X, Instagram, short-form video, or an email blurb — choose any combination.",
  },
  {
    title: "Copy and post",
    body: "Get platform-native drafts in seconds, each shaped for how that audience actually reads.",
  },
];

export default function Landing() {
  return (
    <div>
      <section className="mx-auto max-w-4xl px-6 pb-20 pt-20 text-center">
        <p className="mb-4 inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
          One input. A week of content.
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Turn one piece of content into a{" "}
          <span className="text-indigo-600">week of posts</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
          Reloop takes the article, transcript, or update you already wrote and
          repurposes it into ready-to-publish drafts for every platform you post
          on — so writing once actually means posting everywhere.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link
            to="/app"
            className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            Try it free — no signup
          </Link>
          <a
            href="#pricing"
            className="rounded-md border border-slate-300 px-6 py-3 text-sm font-semibold hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-900"
          >
            See pricing
          </a>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-16 dark:border-slate-800 dark:bg-slate-900/40">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center text-2xl font-bold">How it works</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {STEPS.map((step, i) => (
              <div key={step.title}>
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
                  {i + 1}
                </div>
                <h3 className="font-semibold">{step.title}</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold">Simple pricing</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Start free. Upgrade when you outgrow the daily limit.
          </p>
        </div>
        <PricingCards />
      </section>
    </div>
  );
}
