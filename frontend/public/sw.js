// this.addEventListener("install", (event) => {
//     event.waitUntil(
//         caches.open(cacheData).then((cache) => {
//             cache.addAll([

//                 '/',
//                 'static/js/bundle.js',
//                 '/static/js/main.chunk.js',
//                 '/static/js/0.chunk.js',
//                 '/static/css/main.chunk.css',
//                 '/bootstrap.min.css',
//                 '/index.html',
//                 '/users',
//                 '../src/static/data.js'
//             ])
//         })
//     )
// })

// // this.addEventListener("fetch", (event) => {

// //     // console.warn("url",event.request.url)

// //     if (!navigator.onLine) {
// //         if (event.request.url === "http://localhost:3000/static/js/main.chunk.js") {
// //             event.waitUntil(
// //                 this.registration.showNotification("Internet", {
// //                     body: "internet not working",
// //                 })
// //             )
// //         }
// //         event.respondWith(
// //             caches.match(event.request).then((resp) => {
// //                 if (resp) {
// //                     return resp
// //                 }
// //                 let requestUrl = event.request.clone();
// //                 fetch(requestUrl)
// //             })
// //         )
// //     }
// // })
  
//   // actitivate the service worker


// self.addEventListener("activate", (event) => {
//     const cacheWhitelist = [];
//     cacheWhitelist.push(cacheData);
//     event.waitUntil(
//         caches.keys().then((cacheNames) => Promise.all(
//             cacheNames.map((cacheName) => {
//                 if(!cacheWhitelist.includes(cacheName)){
//                     return caches.delete(cacheName);
//                 }
//             })
//         ))
//     )   
// });


//   // listen for request
// self.addEventListener("fetch", (event) => {
//     event.respondWith(
//       caches.match(event.request).then((res) => {
//         return fetch(event.request).catch(() => caches.match("offline.html"));
//       })
//     );
// });
  


const CACHE_NAME = 'my-ecommerce-app-cache';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/static/js/bundle.js',
    '/static/js/main.chunk.js',
    '/static/js/0.chunk.js',
    '/static/css/main.chunk.css',
    '/bootstrap.min.css',
    '/users'
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

  // if (event.request.url === "http://localhost:3000/static/js/bundle.js") {
  //   event.waitUntil(
  //     this.registration.showNotification("hello", {
  //         body: "hello from notif",
  //     })
  //   )
  // }

  // // console.warn("url", event.request.url)


  if (!navigator.onLine) {
    if (event.request.url === "http://localhost:3000/static/js/bundle.js") {
        event.waitUntil(
            this.registration.showNotification("Internet", {
                body: 'Internet Not Working',
                icon: 'img/favicon-32x32.png',
            })
        )
    }
}


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

