const COLOR_CLASSES: Record<string, string> = 
{
    accent1: "bg-accent1/15 text-accent1",
    accent2: "bg-accent2/15 text-accent2",
    accent3: "bg-accent3/15 text-accent3",
};

const PILLARS = 
[
    {
        icon: "◐",
        color: "accent1",
        title: "Photo Magic",
        desc: "Face swap, restyle, profile pictures, upscaling, background removal.",
    },
    {
        icon: "▶",
        color: "accent2",
        title: "Motion",
        desc: "Turn any photo into a short video or a talking, speaking portrait.",
    },
    {
        icon: "◆",
        color: "accent3",
        title: "AI Avatars",
        desc: "Chat with a 3D avatar built from your face, or generate a whole persona.",
    },
    {
        icon: "♪",
        color: "accent2",
        title: "Voice",
        desc: "Natural text-to-speech to narrate videos, stories, and messages.",
    },
];

export default function Pillars()
{
    return(
        <section className="px-6 py-20">
            <div className="mx-auto max-w-5xl">
                <div className="mx-auto mb-12 max-w-xl text-center">
                    <div className="text-xs font-semibold uppercase tracking-wide text-accent2">
                        What can you create
                    </div>
                    <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
                        One photo. Endless directions.
                    </h2>
                    <p className="mt-3 text-muted">
                        Four simple pillars instead of fourty confusing menu items.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
                    {
                        PILLARS.map((p) =>
                        (
                            <div key={p.title} className="rounded-2xl border border-border bg-surface p-6">
                                <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${COLOR_CLASSES[p.color]} text-xl`}>
                                    {p.icon}
                                </div>
                                <h3 className="mb-2 text-lg font-bold">{p.title}</h3>
                                <p className="text-sm text-muted">{p.desc}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    );
}