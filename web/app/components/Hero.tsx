export default function Hero()
{
    return (
        <>
            <nav className="sticky top-0 z-10 border-b border-border bg-background/85 backdrop-blur">
                <div className="mx-auto flex h-18 max-w-5xl items-center justify-between px-6">
                    <span className="text-xl font-extrabold tracking-tight">
                        AI<span className="bg-linear-to-r from-accent1 to-accent2 bg-clip-text text-transparent">Dream</span>Lab
                    </span>
                    <div className="hidden gap-8 text-sm text-muted md:flex">
                        <span>Photo</span><span>Video</span><span>Avatars</span><span>Voice</span><span>Pricing</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <a href="#" className="text-sm text-muted">Log in</a>
                        <a href="#" className="rounded-full bg-linear-to-r from-accent1 to-accent2 px-5 py-2 text-sm font-semibold text-white">
                            Try it free
                        </a>
                    </div>
                </div>
            </nav>

            <section className="relative overflow-hidden px-6 pb-16 pt-22 text-center">
                <div className="pointer-events-none absolute left-1/2 -t-50 h-125 w-255 -translate-x-1/2 rounded-full bg-accent1/20 blur-3xl"/>
                <span className="relative mb-6 inline-block rounded-full border border-accent3/30 bg-accent3/10 px-4 py-1.5 text-sm font-semibold text-accent3">
                    No signup required to try
                </span>
                <h1 className="relative mx-auto max-w-3xl text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
                    Turn one photo into {" "}
                    <span className="bg-linear-to-r from-accent1 to-accent2 bg-clip-text text-transparent">
                        a thousand realities. 
                    </span>
                </h1>
                <p className="relative mx-auto mt-5 max-w-xl text-lg text-muted">
                    Face swaps, AI avatars, talking portraits, and full videos - all generated from a single photo. Upload one, see the magic in seconds.
                </p>
                <div className="relative mt-9 flex justify-center gap-3">
                    <a href="#" className="rounded-full bg-linear-to-r from-accent1 to-accent2 px-7 py-3.5 font-semibold text-white">
                        Upload a photo - it's free
                    </a>
                    <a href="#" className="rounded-full border border-border px-7 py-3.5 font-semibold">
                        See examples
                    </a>
                </div>  
            </section>
        </>
    )
}