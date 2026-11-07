/* Increment when the app shell changes. Personal data stays in localStorage. */
const CACHE = 'yoga-journey-v1';
const CORE = ['/', '/offline.html', '/manifest.webmanifest', '/icon-192.png', '/icon-512.png', '/images/journey.svg', '/images/study.svg'];
self.addEventListener('install', event => { event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('yoga-journey-') && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', event => {
 const request = event.request;
 const url = new URL(request.url);
 if(request.method !== 'GET' || url.origin !== self.location.origin) return;
 // Keep RSC payloads and documents separate, preserving all Next router request headers.
 const isDocument = request.mode === 'navigate';
 event.respondWith((async () => {
  const cache = await caches.open(CACHE);
  try {
   const response = await fetch(request);
   if(response.ok && response.type === 'basic') await cache.put(request,response.clone());
   return response;
  } catch {
   const cached = await cache.match(request);
   if(cached) return cached;
   if(isDocument) return (await cache.match(url.pathname)) || (await cache.match('/offline.html'));
   return new Response('', {status:503,statusText:'Unavailable offline'});
  }
 })());
});
