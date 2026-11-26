// Preahchan Tasks service worker: lets the browser install the app and opens the last copy of the
// app screen when there is no connection. Data (/api) always comes from the server, never from here.
const CACHE = "pc-shell-v1"
const SHELL = ["./", "./index.html", "./pocketbase.umd.js", "./manifest.json", "./icons/icon-192.png"]
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).catch(() => {}).then(() => self.skipWaiting()))
})
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()))
})
self.addEventListener("fetch", (e) => {
  const req = e.request, url = new URL(req.url)
  if (req.method !== "GET" || url.origin !== self.location.origin || url.pathname.startsWith("/api/") || url.pathname.startsWith("/_/")) return
  // network first, so an update on the server shows straight away; the saved copy is only for offline
  e.respondWith(fetch(req).then((res) => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)) }
    return res
  }).catch(() => caches.match(req).then((m) => m || (req.mode === "navigate" ? caches.match("./index.html") : Response.error()))))
})
