import type { Env, Platform } from "./types";

const PLATFORM_BRIEFS: Record<Platform, string> = {
  linkedin:
    "A LinkedIn post: 3-6 short paragraphs, hook in the first line, no hashtags spam (max 3), written for a professional feed.",
  x: "An X/Twitter thread: 4-7 numbered tweets, each under 280 characters, punchy and skimmable.",
  instagram:
    "An Instagram caption: engaging hook, short paragraphs with line breaks, ends with a call-to-action, up to 5 relevant hashtags on the last line.",
  shortvideo:
    "A short-form video (Reels/TikTok/Shorts) hook + script outline: a 1-line hook, then 4-6 beats describing what to say/show, under 60 seconds total.",
  email:
    "A short email newsletter blurb: subject line, then 2-3 short paragraphs summarizing the piece and driving a click-through.",
};

export interface GenerateResult {
  platform: Platform;
  text: string;
}

export async function generateRepurposedContent(
  env: Env,
  content: string,
  platforms: Platform[],
  tone: string
): Promise<GenerateResult[]> {
  const briefs = platforms
    .map((p) => `- "${p}": ${PLATFORM_BRIEFS[p]}`)
    .join("\n");

  const system = `You are Reloop, a content repurposing assistant. Given source content, you rewrite it into platform-native drafts. Always respond with ONLY a single valid JSON object mapping each requested platform id to its drafted text as a string. No markdown fences, no commentary, no extra keys.`;

  const user = `Tone: ${tone}

Requested platforms and briefs:
${briefs}

Source content:
"""
${content}
"""

Return a JSON object with exactly these keys: ${platforms.map((p) => `"${p}"`).join(", ")}.`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: env.MODEL || "claude-sonnet-5",
      max_tokens: 2048,
      system,
      messages: [{ role: "user", content: user }],
    }),
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`Anthropic API error (${res.status}): ${errBody}`);
  }

  const data = (await res.json()) as {
    content: { type: string; text?: string }[];
  };

  const textBlock = data.content.find((b) => b.type === "text")?.text ?? "{}";
  const cleaned = textBlock.trim().replace(/^```(json)?/i, "").replace(/```$/, "").trim();

  let parsed: Record<string, string>;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error("Model returned invalid JSON");
  }

  return platforms
    .filter((p) => typeof parsed[p] === "string")
    .map((p) => ({ platform: p, text: parsed[p] }));
}
