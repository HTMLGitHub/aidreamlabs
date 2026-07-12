"use client"
import {useRef, useState} from "react";

const TABS = ["Face Swap", "Image → Video", "AI Avatar", "Restyle"];

export default function TryItDemo()
{
    const [activeTab, setActiveTab] = useState(0);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    function handleFile(file: File | undefined)
    {
        if (!file || !file.type.startsWith("image")) return;
        setPreviewUrl(URL.createObjectURL(file));
    }

    return(
        <section className="px-6 pb-24">
            <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-surface p-7">
                <div className="mb-5 flex flex-wrap justify-center gap-2">
                    {
                        TABS.map((tab, i) =>
                        (
                            <button key={tab} onClick={() => setActiveTab(i)} className={i === activeTab ? 
                                "rounded-full border border-accent1/40 bg-accent1/15 px-4 py-2 text-sm text-white" 
                                : "rounded-full border border-transparent bg-white/5 px-4 py-2 text-sm text-muted"}
                            >
                                {tab}
                            </button>
                        ))
                    }
                </div>

                <div className="flex flex-col items-center gap-5 md:flex-row">
                    <div 
                        onClick = {() => fileInputRef.current?.click()} 
                        onDragOver = {(e) => e.preventDefault()}
                        onDrop = {(e) => 
                        {
                            e.preventDefault();
                            handleFile(e.dataTransfer.files?.[0]);
                        }}
                        className="flex flex-1 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border p-9 text-center text-sm text-muted hover:border-accent1/40"
                    >
                        {
                            previewUrl ? 
                            (
                                <img src={previewUrl} alt="Selected upload" className="h-28 w-28 rounded-xl object-cover"/>
                            ) :
                            (
                                <>
                                    <span className="mb-2 text-2xl">↑</span>
                                    Drop a selfie here, of click to choose one.
                                </>
                            )
                        }

                        <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={(e)=>handleFile(e.target.files?.[0])} />
                    </div>

                    <span className="text-2xl text-muted">→</span>

                    <div className="flex aspect-square flex-1 items-center justify-center rounded-2xl bg-linear-to-br from-accent1 via-accent2 to-accent3 text-sm text-white/85">
                        {previewUrl ? "Generating preview..." : "Your result appears here"}
                    </div>
                </div>

                <p className="mt-5 text-center text-sm text-muted">
                    Real output appears here in ~8 seconds. No credit card or account.
                </p>
            </div>
        </section>
    );
}