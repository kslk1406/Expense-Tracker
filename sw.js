var CACHE = 'expense-tracker-v3';
var ASSETS = ['/', '/index.html', '/manifest.json', '/icon.svg'];

function isHtmlRequest(request) {
  if (request.mode === 'navigate') return true;
  if (request.destination === 'document') return true;
  var url = request.url.split('?')[0];
  return url.endsWith('.html') || url.endsWith('/');
}

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(cache) { return cache.addAll(ASSETS); })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(key) { return key !== CACHE; })
          .map(function(key) { return caches.delete(key); })
      );
    }).then(function() { return self.clients.claim(); })
  );
});

self.addEventListener('message', function(e) {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', function(e) {
  if (e.request.method !== 'GET') return;

  if (isHtmlRequest(e.request)) {
    e.respondWith(
      fetch(e.request).then(function(res) {
        var copy = res.clone();
        caches.open(CACHE).then(function(cache) { cache.put(e.request, copy); });
        return res;
      }).catch(function() {
        return caches.match(e.request);
      })
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then(function(cached) {
      return cached || fetch(e.request);
    })
  );
});
