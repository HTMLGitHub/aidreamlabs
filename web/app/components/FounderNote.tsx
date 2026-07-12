export default function FounderNote()
{
    return (
        <section className="px-6 py-20">
            <div className="mx-auto max-w-2xl rounded-3xl border border-border bg-surface p-9 text-center">
                <span className="text-sm font-semibold text-accent2">
                    Why we built this
                </span>
                <p className="mt-4 text-lg leading-relaxed text-foreground">
                        I created AI Dream Lab because I wanted advanced AI tools to feel less intimidating and more useful in everyday creative work.
                        My goal is to give people a place where they can experiment freely, explore new ideas, and create things they may not have thought were possible.
                </p>
                
                <p className="mt-5 text-sm text-muted">- Matthew Lee, founder of AI Dream Lab</p>
                <div className="mt-6 flex flex-col items-center gap-3">
                    <span className="text-xs text-muted">A Quantum Arc company</span>
                    <a href="#" className="mt-6 inline-block rounded-full bg-linear-to-r from-accent1 to-accent2 px-6 py-3 text-sm font-semibold text-white">
                        Be one of the first to try it
                    </a>
                </div>                
            </div>
        </section>
    );
}