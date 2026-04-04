self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('hsm-v1').then(c => c.addAll([
      '/', '/index.html', '/heart.png', '/heart_maister.png',
      '/stethoscope.png'
    ]))
  );
});
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
