// Cloudflare Worker: serves the live waitlist count for the coming-soon page.
// Reads the real subscriber count from Brevo, floors it at BASELINE_COUNT so
// the number reads well before real signups catch up, and caches briefly to
// avoid hammering the Brevo API on every page load.

const CACHE_TTL_SECONDS = 300; // 5 minutes

export default
{
    async fetch(request, env)
    {
        const headers = corsHeaders(env);

        if(request.method === 'OPTIONS')
        {
            return new Response(null, {headers});
        }

        if(request.method !== "GET")
        {
            return new Response('Method not allowed', {status: 405, headers});
        }

        const cache = caches.default;
        const cacheKey = new Request(request.url, request);
        const cached = await cache.match(cacheKey);
        if(cached) return cached;

        let realCount = 0;
        try 
        {
            const res = await fetch
            (
                `https://api.brevo.com/v3/contacts/lists/${env.BREVO_LIST_ID}`,
                {headers: {'api-key': env.BREVO_API_KEY, accept: 'application/json'}}
            );
            if(res.ok)
            {
                const data = await res.json();
                realCount = data.uniqueSubscribers ?? data.totalSubscribers ?? 0;
            }
        } 
        catch
        {
            // Brevo unreachable - fall back to baseline below rather than erroring the page
        }

        const baseline = Number(env.BASELINE_COUNT ?? 0);
        const count = Math.max(realCount, baseline);

        const response = new Response(JSON.stringify({count}), 
        {
            headers:
            {
                'content-type' : 'application/json',
                'cache-control' : `public, max-age=${CACHE_TTL_SECONDS}`,
                ...headers,
            },
        });

        await cache.put(cacheKey, response.clone());
        return response;
    }
};

function corsHeaders(env)
{
    return {
        'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN || '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
    };
}