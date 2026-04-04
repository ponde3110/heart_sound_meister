const CACHE_NAME = "hsm-v3";
const BASE_PATH = "/heart_sound_meister/";

const urlsToCache = [
  BASE_PATH,
  BASE_PATH + "index.html",
  BASE_PATH + "manifest.json",

  // icons
  BASE_PATH + "icon-192.png",
  BASE_PATH + "icon-512.png",

  // images
  BASE_PATH + "heart.png",
  BASE_PATH + "heart_maister.png",
  BASE_PATH + "stethoscope.png",

  // sounds（必要なもの全部）
  BASE_PATH + "S3.mp3",
  BASE_PATH + "S4.mp3",
  BASE_PATH + "apex.mp3",
  BASE_PATH + "base.mp3",
  BASE_PATH + "gallop.mp3",
  BASE_PATH + "click.mp3",
  BASE_PATH + "ej.mp3",
  BASE_PATH + "2P.mp3",
  BASE_PATH + "SEM.mp3",
  BASE_PATH + "HSM.mp3",
  BASE_PATH + "TAF.mp3",
  BASE_PATH + "CM.mp3",
  BASE_PATH + "LSM.mp3",
  BASE_PATH + "rub.mp3",
  BASE_PATH + "HDM.mp3",
  BASE_PATH + "ESM.mp3",
  BASE_PATH + "rumble.mp3"
];


// ========================
// install
// ========================
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});


// ========================
// activate
// ========================
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});


// ========================
// fetch
// ========================
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) return response;

      return fetch(event.request)
        .then(res => {
          // 206（部分レスポンス）はキャッシュしない
          if (!res || res.status === 206 || res.status === 0) {
            return res;
          }
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, res.clone());
            return res;
          });
        })
        .catch(() => {
          return caches.match(BASE_PATH + "index.html");
        });
    })
  );
});
