
const CACHE_NAME = 'my-ecommerce-app-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/static/js/main.af47cf73.js',
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
          (response) => {
            // Vérifier si nous avons reçu une réponse valide
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Cloner la réponse car elle est consommée par le cache
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});









// self.addEventListener('notificationclick', function(event) {
//   // Logique à exécuter lorsqu'un utilisateur clique sur la notification
//   // Par exemple, rediriger vers une page spécifique
//   event.notification.close();
//   event.waitUntil(
//     clients.openWindow('/')
//   );
// });

// self.addEventListener('message', function(event) {
//   // Logique pour gérer les messages du client, si nécessaire
//   // Vous pouvez envoyer un message du client pour déclencher la notification de bienvenue
//   if (event.data === 'showWelcomeNotification') {
//     showWelcomeNotification();
//   }
// });

// function showWelcomeNotification() {
//   self.registration.showNotification("Bienvenue sur le site", {
//     body: "Merci de visiter notre site pour la première fois!",
//   });
// }

