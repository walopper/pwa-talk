const CACHE_STATIC = 'static'
const CACHE_DYNAMIC = 'dynamic'

self.addEventListener('install', function (event) {
    console.log('[Service Worker] Instalando ...')

    event.waitUntil(
        caches.open(CACHE_STATIC)
            .then(function (cache) {
                console.log('[Service Worker] Cache estatica')

                cache.addAll([
                    '/',
                    '/index.html',
                    '/main.js',
                    // '/styles.js'
                ]);
            })
    )
});

self.addEventListener('activate', function (event) {
    console.log('[Service Worker] Activado ....')

    return self.clients.claim()
});

self.addEventListener('fetch', function (event) {
    event.respondWith(fetch(event.request))
});

// self.addEventListener('fetch', function (event) {
//     event.respondWith(
//         caches.match(event.request)
//             .then(function (response) {

//                 if (response) {
//                     return response
//                 } else {
//                     return fetch(event.request)
//                         .then(function (res) {

//                             return caches.open(CACHE_DYNAMIC)
//                                 .then(function (cache) {

//                                     console.log('Cacheando:', event.request.url)
//                                     cache.put(event.request.url, res.clone())
//                                     return res

//                                 })

//                         });
//                 }
//             })
//     );
// });
