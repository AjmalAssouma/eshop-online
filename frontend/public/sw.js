
const CACHE_NAME = 'my-ecommerce-app-cache-v2';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/static/css/main.5e9bdccd.css'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Cloner la requête car elle est consommée par le cache
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          (networkResponse) => {
            // Vérifier si nous avons reçu une réponse valide
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }

            // Cloner la réponse car elle est consommée par le cache
            const responseToCache = networkResponse.clone();

            // Mettre à jour le cache avec la nouvelle version
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return networkResponse;
          }
        );
      })
  );
});

















// const CACHE_NAME = 'my-ecommerce-app-cache-v1';
// const urlsToCache = [
//     '/',
//     '/index.html',
//     '/manifest.json',
//     '/static/js/main.af47cf73.js',
//     '/static/css/main.5e9bdccd.css'
// ];

// self.addEventListener('install', (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME)
//       .then((cache) => {
//         return cache.addAll(urlsToCache);
//       })
//   );
// });


// self.addEventListener('activate', (event) => {
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((cacheName) => {
//           if (cacheName !== CACHE_NAME) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });




// self.addEventListener('fetch', (event) => {
//   event.respondWith(
//     caches.match(event.request)
//       .then((response) => {
//         // Cache hit - return response
//         if (response) {
//           return response;
//         }

//         // Cloner la requête car elle est consommée par le cache
//         const fetchRequest = event.request.clone();

//         return fetch(fetchRequest).then(
//           (response) => {
//             // Vérifier si nous avons reçu une réponse valide
//             if (!response || response.status !== 200 || response.type !== 'basic') {
//               return response;
//             }

//             // Cloner la réponse car elle est consommée par le cache
//             const responseToCache = response.clone();

//             caches.open(CACHE_NAME)
//               .then((cache) => {
//                 cache.put(event.request, responseToCache);
//               });

//             return response;
//           }
//         );
//       })
//   );
// });
