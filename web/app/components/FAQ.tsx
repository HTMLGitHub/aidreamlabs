"use client"

import { useState } from "react";

const FAQS = [
  {
    q: "What happens to the photo I upload?",
    a: "Your photo is used to generate your result and is never used to train models or shared with anyone else. You can delete it anytime from your account.",
  },
  {
    q: "Do I need to subscribe to try it?",
    a: "No — you can try a couple of generations for free with no card and no account. Subscribing unlocks the full credit pool, the 5-day trial, and every tool.",
  },
  {
    q: "Can I cancel before I'm charged?",
    a: "Yes. Every plan starts with a trial period, and you can cancel anytime before it ends with no charge.",
  },
  {
    q: "Can I use results commercially?",
    a: "The Creator plan is for personal use. Pro includes full commercial usage rights.",
  },
];

export default function FAQ()
{
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return(
    <section className="px-6 py-20">
    <div className="mx-auto max-w-2xl">
      <div className="mb-10 text-center">
        <div className="text-xs font-semibold uppercase tracking-wide text-accent2">
          Good to know
        </div>

        <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
          Questions people actually ask
        </h2>
      </div>

      {
        FAQS.map((item, i) =>
        {
          const isOpen = i === openIndex;
          return (
            <div key={item.q} className="border-b border-border py-5">
              <button onClick={() => setOpenIndex(isOpen ? null : i)} className="flex w-full items-center justify-between text-left font-semibold">
                {item.q}
                <span className="text-muted">{isOpen ? "-" : "+"}</span>
              </button>
              {
                  isOpen && 
                  (
                    <p className="mt-3 text-sm text-muted">{item.a}</p>
                  )
              }
            </div>
          );
        })
      }
    </div>
  </section>
  );
}