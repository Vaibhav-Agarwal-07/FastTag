/* Simple service worker: cache shell assets for offline.
   This is a minimal example; in production use Workbox or CRA's service worker.
*/
const CACHE_NAME = 'fastag-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/logo192.png',
  '/logo512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => {
      return resp || fetch(event.request);
    })
  );
});
