const PLANS = 
[
    {
        name: "Start free",
        price: "$0",
        period: "to start",
        features:
        [
            "3,000 bonus credits on signup",
            "5-day trial, cancel anytime",
            "Face swap, photo tools, and more"
        ],
        cta: "Start free",
        featured: false,
    },
    {
        name: "Creator",
        price: "$12",
        period: "/mo",
        features:
        [
            "1,200 credits monthly",
            "All photo + video tools",
            "No watermark, priority rendering"
        ],
        cta: "Start creating",
        featured: true,
    },
    {
        name: "Pro",
        price: "$29",
        period: "/mo",
        features:
        [
            "4,000 credits monthly",
            "Avatar chat + voice, once available",
            "Commercial usage rights"
        ],
        cta: "Go pro",
        featured: false,
    },
];

export default function Pricing()
{
    return (
        <section className="px-6 py-20">
            <div className="mx-auto max-w-5xl">
                <div className="mx-auto mb-12 max-w-xl text-center">
                    <div className="text-xs font-semibold uppercase tracking-wide text-accent2">
                        Simple pricing
                    </div>
                    <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
                        Start free. Upgrade when you're hooked.
                    </h2>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                    {
                        PLANS.map((plan) =>
                        (
                            <div key={plan.name} className={
                                plan.featured ? 
                                "flex flex-col rounded-2xl border-2 border-accent1 bg-surface p-7" : "flex flex-col rounded-2xl border border-border bg-surface p-7"}>
                                    {
                                        plan.featured && 
                                        (
                                            <span className="mb-3 inline-block w-fit rounded-full bg-linear-to-r from-accent1 to-accent2 px-3 py-1 text-xs font-bold text-white">
                                                Most popular
                                            </span>
                                        )
                                    }
                                    <div className="text-sm text-muted">{plan.name}</div>
                                    <div className="mt-1 mb-5">
                                        <span className="text-4xl font-extrabold">{plan.price}</span>{" "}
                                        <span className="text-sm text-muted">{plan.period}</span>
                                    </div>
                                    <ul className="mb-6 flex-1 text-sm text-muted">
                                        {
                                            plan.features.map((f, i) => 
                                            (
                                                <li key={f} className={i===0 ? "py-2" : "border-t border-border py-2"}>{f}</li>
                                            ))
                                        }
                                    </ul>
                                    <a href="#" className={plan.featured ? 
                                        "rounded-full bg-linear-to-r from-accent1 to-accent2 px-5 py-3 text-center text-sm font-semibold text-white" 
                                        : "rounded-full border border-border px-5 py-3 text-center text-sm font-semibold"}>
                                            {plan.cta}
                                        </a>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    ); 
}