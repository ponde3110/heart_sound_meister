self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('hsm-v1').then(c => c.addAll([
      '/heart_sound_meister/',
      '/heart_sound_meister/index.html',
      '/heart_sound_meister/manifest.json',
      '/heart_sound_meister/icon-192.png',
      '/heart_sound_meister/icon-512.png'
    ]))
  );
});
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
