const PORT = 80;

const redirects = [
    {
        "path": "",
        "destination": "https://portal2.sr/",
        "type": 301,
    },
    {
        "path": "sar",
        "destination": "https://github.com/p2sr/SourceAutoRecord/releases/latest",
        "type": 302,
    },
    {
        "path": "srconfigs",
        "destination": "https://github.com/p2sr/srconfigs/releases/latest",
        "type": 301,
    },
    {
        "path": "asl",
        "destination": "https://raw.githubusercontent.com/p2sr/SourceAutoRecord/master/livesplit/sar.asl",
        "type": 302,
    },
    {
        "path": "discord",
        "destination": "https://discord.com/invite/hRwE4Zr",
        "type": 301,
    },
    {
        "path": "yt",
        "destination": "https://youtube.com/channel/UCJisCoBmkhsSNRICJCLAY3w",
        "type": 301,
    },
    {
        "path": "youtube",
        "destination": "https://youtube.com/channel/UCJisCoBmkhsSNRICJCLAY3w",
        "type": 301,
    },
    {
        "path": "ttv",
        "destination": "https://twitch.tv/portal2speedruns",
        "type": 301,
    },
    {
        "path": "twitch",
        "destination": "https://twitch.tv/portal2speedruns",
        "type": 301,
    },
    {
        "path": "gh",
        "destination": "https://github.com/p2sr",
        "type": 301,
    },
    {
        "path": "github",
        "destination": "https://github.com/p2sr",
        "type": 301,
    },
    {
        "path": "donate",
        "destination": "https://github.com/sponsors/p2sr",
        "type": 302,
    },
    {
        "path": "golds",
        "destination": "https://docs.google.com/spreadsheets/d/1vPjer8CKrV5Lh5_GKIZjKahODkrA8b2sMGSyR-LFMUY",
        "type": 302,
    },
    {
        "path": "src",
        "destination": "https://www.speedrun.com/portal_2",
        "type": 301,
    },
    {
        "path": "appeal",
        "destination": "https://forms.gle/Mg7sfsK38YvQQSt58",
        "type": 302,
    }
]

function handler(req) {
    try {
        const url = new URL(req.url);
        let pathname = url.pathname;
        if (pathname.startsWith("/")) {
            pathname = pathname.slice(1);
        }
        const r = redirects.find(({ path }) => path === pathname.toLowerCase());
        if (r) {
            return new Response(null, { status: r.type, headers: { Location: r.destination } });
        }
    } catch (_e) {
        // If URL parsing fails or no match, fall through to default redirect
    }
    return new Response(null, { status: 302, headers: { Location: "https://portal2.sr/" } });
}

Deno.serve({ port: PORT }, handler);
