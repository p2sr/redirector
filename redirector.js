import { redirects } from "./list.js";

const PORT = 80;

function handler(req) {
    try {
        const url = new URL(req.url);
        let pathname = url.pathname.toLowerCase();
        if (pathname.startsWith("/")) {
            pathname = pathname.slice(1);
        }
        if (pathname == 'linklist') {
            let html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Redirects</title></head><body><h1>Redirects</h1><ul>`;
            redirects.forEach(({ path, destination }) => {
                html += `<li><a href="${destination}">${path || '*'}</a></li>`;
            });
            html += `<li><a href="linklist.json">linklist.json</a></li>`;
            html += `<li><a href="linklist">this page</a></li>`;
            html += `</ul></body></html>`;
            return new Response(html, {
                status: 200,
                headers: { "Content-Type": "text/html" },
            });
        } else if (pathname == 'linklist.json') {
            return new Response(JSON.stringify(redirects), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        }
        const r = redirects.find(({ path }) => path === pathname);
        if (r) {
            return new Response(null, { status: r.type, headers: { Location: r.destination } });
        }
        if (pathname.includes(".")) {
            return new Response("Not Found", { status: 404 });
        }
    } catch (_e) {
        console.error(Deno.inspect(_e));
    }
    // If an error is encountered or no match is found, fall through to default redirect
    return new Response(null, { status: 302, headers: { Location: "https://portal2.sr/" } });
}

Deno.serve({ port: PORT }, handler);
