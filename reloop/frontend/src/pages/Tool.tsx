import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ApiError,
  PLATFORMS,
  generate,
  getStatus,
  setStoredEmail,
  type GenerateResult,
  type Platform,
} from "../lib/api";

const TONES = ["Professional", "Casual", "Bold", "Witty"];

export default function Tool() {
  const [content, setContent] = useState("");
  const [platforms, setPlatforms] = useState<Platform[]>(["linkedin", "x"]);
  const [tone, setTone] = useState(TONES[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<GenerateResult[]>([]);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [pro, setPro] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [accountEmail, setAccountEmail] = useState(
    () => localStorage.getItem("reloop_email") ?? ""
  );
  const [accountOpen, setAccountOpen] = useState(false);

  useEffect(() => {
    if (copiedId) {
      const t = setTimeout(() => setCopiedId(null), 1500);
      return () => clearTimeout(t);
    }
  }, [copiedId]);

  useEffect(() => {
    if (!accountEmail) return;
    getStatus(accountEmail)
      .then((res) => setPro(res.pro))
      .catch(() => {});
  }, [accountEmail]);

  function handleSetAccountEmail(e: React.FormEvent) {
    e.preventDefault();
    setStoredEmail(accountEmail);
    setAccountOpen(false);
  }

  function togglePlatform(id: Platform) {
    setPlatforms((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  }

  async function handleGenerate() {
    if (content.trim().length < 40) {
      setError("Paste at least a few sentences so there's something to work with.");
      return;
    }
    if (platforms.length === 0) {
      setError("Pick at least one platform.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await generate(content, platforms, tone);
      setResults(res.results);
      setRemaining(res.remaining);
      setPro(res.pro);
    } catch (err) {
      if (err instanceof ApiError && err.status === 429) {
        setError(
          "You've used today's free repurposes. Upgrade to Pro for unlimited generations."
        );
      } else {
        setError(err instanceof Error ? err.message : "Generation failed.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function copy(id: string, text: string) {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Repurpose your content</h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            {pro
              ? "You're on Pro — unlimited generations."
              : remaining !== null
              ? `${remaining} free repurposes left today.`
              : "3 free repurposes per day. No signup required."}
          </p>
        </div>
        <div className="text-right">
          {accountOpen ? (
            <form onSubmit={handleSetAccountEmail} className="flex gap-2">
              <input
                type="email"
                required
                placeholder="you@company.com"
                value={accountEmail}
                onChange={(e) => setAccountEmail(e.target.value)}
                className="w-48 rounded-md border border-slate-300 px-2 py-1 text-xs dark:border-slate-700 dark:bg-slate-900"
              />
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-1 text-xs font-semibold text-white hover:bg-indigo-500"
              >
                Save
              </button>
            </form>
          ) : (
            <button
              onClick={() => setAccountOpen(true)}
              className="text-xs font-medium text-slate-500 underline hover:text-slate-800 dark:hover:text-slate-200"
            >
              {accountEmail ? `Signed in as ${accountEmail}` : "Already Pro? Enter your email"}
            </button>
          )}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold">
            Your content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Paste a blog post, transcript, or update…"
            rows={12}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
          />

          <div className="mt-4">
            <p className="mb-2 text-sm font-semibold">Platforms</p>
            <div className="flex flex-wrap gap-2">
              {PLATFORMS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => togglePlatform(p.id)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
                    platforms.includes(p.id)
                      ? "border-indigo-600 bg-indigo-600 text-white"
                      : "border-slate-300 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-900"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <p className="mb-2 text-sm font-semibold">Tone</p>
            <div className="flex flex-wrap gap-2">
              {TONES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTone(t)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
                    tone === t
                      ? "border-indigo-600 bg-indigo-600 text-white"
                      : "border-slate-300 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-900"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="mt-6 w-full rounded-md bg-indigo-600 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-60"
          >
            {loading ? "Generating…" : "Generate repurposed posts"}
          </button>

          {error && (
            <div className="mt-3 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
              {error}{" "}
              {error.includes("Upgrade") && (
                <Link to="/#pricing" className="font-semibold underline">
                  See Pro plan
                </Link>
              )}
            </div>
          )}
        </div>

        <div>
          <p className="mb-2 text-sm font-semibold">Results</p>
          {results.length === 0 && !loading && (
            <div className="flex h-full min-h-[200px] items-center justify-center rounded-md border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500 dark:border-slate-700">
              Your repurposed drafts will show up here.
            </div>
          )}
          <div className="space-y-4">
            {results.map((r) => {
              const label = PLATFORMS.find((p) => p.id === r.platform)?.label ?? r.platform;
              return (
                <div
                  key={r.platform}
                  className="rounded-md border border-slate-200 p-4 dark:border-slate-800"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                      {label}
                    </span>
                    <button
                      onClick={() => copy(r.platform, r.text)}
                      className="text-xs font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                    >
                      {copiedId === r.platform ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  <p className="whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-200">
                    {r.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
