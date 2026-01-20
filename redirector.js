const PORT = 80;

const redirects = [
    {
        "path": "/",
        "destination": "https://portal2.sr/",
        "type": 301,
    },
    {
        "path": "/sar",
        "destination": "https://github.com/p2sr/SourceAutoRecord/releases/latest",
        "type": 302,
    },
    {
        "path": "/srconfigs",
        "destination": "https://github.com/p2sr/srconfigs/releases/latest",
        "type": 301,
    },
    {
        "path": "/asl",
        "destination": "https://raw.githubusercontent.com/p2sr/SourceAutoRecord/master/livesplit/sar.asl",
        "type": 302,
    },
    {
        "path": "/discord",
        "destination": "https://discord.com/invite/hRwE4Zr",
        "type": 301,
    },
    {
        "path": "/yt",
        "destination": "https://youtube.com/channel/UCJisCoBmkhsSNRICJCLAY3w",
        "type": 301,
    },
    {
        "path": "/youtube",
        "destination": "https://youtube.com/channel/UCJisCoBmkhsSNRICJCLAY3w",
        "type": 301,
    },
    {
        "path": "/appeal",
        "destination": "https://forms.gle/Mg7sfsK38YvQQSt58",
        "type": 302,
    }
]

function handler(req) {
    try {
        const url = new URL(req.url);
        const pathname = url.pathname;
        const r = redirects.find(({ path }) => path === pathname);
        if (r) {
            return new Response(null, { status: r.type, headers: { Location: r.destination } });
        }
    } catch (_e) {
        // If URL parsing fails, fall through to default redirect
    }
    return new Response(null, { status: 302, headers: { Location: "https://portal2.sr/" } });
}

Deno.serve({ port: PORT }, handler);
