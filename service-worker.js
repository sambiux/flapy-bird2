const CACHE_NAME = 'flappy-bird-cache-v1';
const urlsToCache = [
  '/',
  'index.html',
  'style.css',
  'script.js',
  'images/bird.png',
  'manifest.json',
  'https://e7.pngegg.com/pngimages/21/679/png-clipart-flappy-bird-pixel-art-minecraft-mallard-pipe-flappy-bird-text-photography.png'
];

// Instalar
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

// Activar
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) => {
      return Promise.all(
        names.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});

// Interceptar solicitudes
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request);
    })
  );
});
