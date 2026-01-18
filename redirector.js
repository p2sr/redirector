import { Application, Router } from "@oak/oak";
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
        "path": "/appeal",
        "destination": "https://forms.gle/Mg7sfsK38YvQQSt58",
        "type": 302,
    }
]

const router = new Router();

redirects.forEach(({ path, destination, type }) => {
    router.get(path, (context) => {
        context.response.status = type;
        context.response.redirect(destination);
    });
});

// catch-all route
router.get("(.*)", (context) => {
    context.response.status = 302;
    context.response.redirect("https://portal2.sr/");
});

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: PORT });
console.log(`Redirector is running on port ${PORT}`);
