importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

console.log("Service-worker installing...");

workbox.core.skipWaiting();
workbox.core.clientsClaim();

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.open(workbox.core.cacheNames.precache).then(precache => (
            // Check if file is available in the cache
            precache.match(event.request, { ignoreSearch: true }).then(response => {
                // Cache hit - return response
                if (response) {
                    return response;
                } else {
                    // A request is a flux and can only be consumed once
                    // It is necessary to clone it to reuse it
                    const fetchRequest = event.request.clone();

                    return fetch(fetchRequest).catch(error => (
                        // If fetch fail, return
                        precache.match(new Request('/offline.html'), { ignoreSearch: true })
                    ));
                }
            })
        ))
    );
});

workbox.precaching.precacheAndRoute([]);
