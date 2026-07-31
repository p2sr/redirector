const PORT = 80;

function handler(req) {
    const url = new URL(req.url);
    return new Response(null, { status: 302, headers: { Location: `https://portal2.sr${url.pathname}${url.search}` } });
}

Deno.serve({ port: PORT }, handler);
