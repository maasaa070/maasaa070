const CACHE_NAME = "essence-of-ins-rana-v2";

const ABOUT_ASSETS = [
  "/about.html",
  "/style.css?v=20260617"
];

self.addEventListener("install", (event) => {
  console.log("Service Worker: Installing");

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ABOUT_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activating");

  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => caches.delete(cacheName))
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {

        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request);
      })
  );

});
