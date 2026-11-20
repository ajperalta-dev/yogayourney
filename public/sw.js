/* Increment when the app shell changes. Personal data stays in localStorage. */
const CACHE = 'yoga-journey-v3-path';
const CORE = ['/', '/offline.html', '/manifest.webmanifest', '/logo.png', '/icon-192.png', '/icon-512.png', '/images/journey.svg', '/images/study.svg'];
async function cachePathShell() {
 const cache=await caches.open(CACHE);
 await cache.addAll(CORE);
 const response=await fetch('/study/path/');
 if(!response.ok) throw new Error('Path shell unavailable');
 const html=await response.clone().text();
 await cache.put('/study/path/',response);
 const assets=[...html.matchAll(/(?:src|href)="([^\"]+\.(?:js|css|woff2)(?:\?[^\"]*)?)"/g)].map(match=>match[1]).filter(url=>url.startsWith('/_next/')||url.startsWith('/fonts/'));
 await cache.addAll([...new Set(assets)]);
}
self.addEventListener('install', event => { event.waitUntil(cachePathShell().then(() => self.skipWaiting())); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('yoga-journey-') && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', event => {
 const request = event.request;
 const url = new URL(request.url);
 if(request.method !== 'GET' || url.origin !== self.location.origin) return;
 // Keep RSC payloads and documents separate, preserving all Next router request headers.
 const isDocument = request.mode === 'navigate';
 event.respondWith((async () => {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(request);
  if(cached && (!self.navigator.onLine || url.pathname.startsWith('/_next/static/'))) return cached;
  const controller=new AbortController();
  const timeout=setTimeout(()=>controller.abort(),3000);
  try {
   const response = await fetch(request,{signal:controller.signal});
   if(response.ok && response.type === 'basic') await cache.put(request,response.clone());
   return response;
  } catch {
   if(cached) return cached;
   if(isDocument) return (await cache.match(url.pathname)) || (await cache.match('/offline.html'));
   return new Response('', {status:503,statusText:'Unavailable offline'});
  } finally { clearTimeout(timeout); }
 })());
});
