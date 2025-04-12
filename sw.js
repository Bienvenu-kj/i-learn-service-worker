const CACHE_NAME = 'mon-cache-v1';
const FILES_TO_CACHE = [
  '/',
  'index.html',
  'style.css',
  'script.js'
];

self.addEventListener('install', event => {
  console.log('[Service Worker] Installation...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[Service Worker] Mise en cache des fichiers...');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', event => {
  console.log('[Service Worker] Interception de :', event.request.url);
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
