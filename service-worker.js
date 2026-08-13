const CACHE_NAME = "essence-of-ins-rana-v1";

self.addEventListener("install", (event) => {
  console.log("Service Worker: Installed");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activated");
  event.waitUntil(clients.claim());
});

self.addEventListener("fetch", (event) => {
  // Network only for now.
});