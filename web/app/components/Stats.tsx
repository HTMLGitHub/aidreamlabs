const STATS = 
[
    {value: "0", label: "Images Generated"},
    {value: "0", label: "Videos Created"},
    {value: "0", label: "Faces Swapped"},
];

export default function Stats()
{
    return (
        <section className="border-y border-border px-6 py-12">
            <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 text-center md:grid-cols-3">
                {
                    STATS.map((stat) =>
                    (
                        <div key={stat.label}>
                            <div className="bg-linear-to-r from-accent1 to-accent2 bg-clip-text text-3xl font-extrabold text-transparent">
                                {stat.value}
                            </div>
                            <div className="mt-1 text-sm text-muted">
                                {stat.label}
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    );
}