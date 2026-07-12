const EXAMPLES =
[
    {label: "Face swap", from: "#7C3AED", to: "#4C1D95"},
    {label: "Talking portrait", from: "#DB2777", to: "#831843"},
    {label: "Image → video", from: "#0891B2", to: "#164E63"},
    {label: "AI avatar", from: "#D97706", to: "#78350F"},
];

export default function ExampleGallery()
{
    return(
        <section className="px-6 py 20">
            <div className="mx-auto max-w-5xl">
                <div className="mx-auto mb-12 max-w xl text-center">
                    <div className="text-xs font-semibold uppercase tracking-wide text-accent2">
                        What's possible
                    </div>
                    <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
                        A few examples of what one photo can become
                    </h2>
                </div>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {
                        EXAMPLES.map((ex) =>
                        (
                            <div key={ex.label} style={{background: `linear-gradient(160deg, ${ex.from}, ${ex.to})`}} className="flex aspect-3/4 items-end rounded-2xl p-3.5">
                                <span className="rounded-full bg-black/40 px-2.5 py-1 text-xs font-semibold text-white">
                                    {ex.label}
                                </span>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    );
}