self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('hsm-v1').then(c => c.addAll([
      '/heart_sound_meister/',
      '/heart_sound_meister/index.html',
      '/heart_sound_meister/heart.png',
      '/heart_sound_meister/heart_maister.png',
      '/heart_sound_meister/stethoscope.png'
    ]))
  );
});
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
