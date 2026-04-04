const CACHE_NAME = "hsm-v2";

// 必ずあなたの公開パスに合わせる
const BASE_PATH = "/"; 
// 例：GitHub Pagesなら "/heart_sound_meister/"

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

  // sounds（必要に応じて全部追加）
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
// INSTALL（キャッシュ保存）
// ========================
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );

  // 即時有効化
  self.skipWaiting();
});


// ========================
// ACTIVATE（古いキャッシュ削除）
// ========================
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );

  self.clients.claim();
});


// ========================
// FETCH（通信制御）
// ========================
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {

      // キャッシュあればそれ返す
      if (response) return response;

      // なければネット
      return fetch(event.request)
        .then(res => {
          // 動的キャッシュ（画像など）
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, res.clone());
            return res;
          });
        })
        .catch(() => {
          // オフライン時 fallback
          return caches.match(BASE_PATH + "index.html");
        });
    })
  );
});
