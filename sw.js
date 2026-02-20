
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('fetch', (e) => {
  // Pass-through fetch for simple web-based PWA
  e.respondWith(fetch(e.request));
});
