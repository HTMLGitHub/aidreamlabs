import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots
{
    return{
        rules:
        [
            {userAgent: "*", allow: "/" },
            // Explicit allows for AI crawlers so a future disallow rule (e.g. for
            // spam bots) doesn't accidentally sweep these up too.
            {userAgent: "GPTBot", allow: "/" },
            {userAgent: "OAI-SearchBot", allow: "/" },
            {userAgent: "ChatGPT-User", allow: "/" },
            {userAgent: "ClaudeBot", allow: "/" },
            {userAgent: "Claude-User", allow: "/" },
            {userAgent: "Claude-SearchBot", allow: "/" },
            {userAgent: "PerplexityBot", allow: "/" },
            {userAgent: "Google-Extended", allow: "/" },
        ],
        sitemap: "https://aidreamlab.com/sitemap.xml"
    };
}