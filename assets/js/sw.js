importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.4/workbox-sw.js');

const TILES_DOMAIN_NAMES = [
    'global.ssl.fastly.net',
    'tile.openstreetmap.se',
    'maps.wikimedia.org',
    'tiles.lyrk.org',
    'tile.openstreetmap.fr',
    'a.ssl.fastly.net'
];

// Routes needed to run the app
const SYMFONY_ROUTES = [
    '/appli',
    '/api/manifest',
    '/api/gogocartojs-conf.json'
];

const UsePrecachePlugin = precache => ({
    cacheKeyWillBeUsed: async ({ request }) => {
        const url = new URL(request.url);
        return precache.getCacheKeyForURL(url.pathname);
    }
});

// We want the SW to delete outdated cache on each activation
workbox.precaching.cleanupOutdatedCaches();

// Create custom precache for Symfony routes
// The goal is to precache these routes so that they are available immediately on app install,
// but to update them when new versions are available (via the StaleWhileRevalidate strategy)
const symfonyRoutesCache = new workbox.precaching.PrecacheController('symfony-routes');
self.addEventListener('install', event => event.waitUntil(symfonyRoutesCache.install()));
self.addEventListener('activate', event => event.waitUntil(symfonyRoutesCache.activate()));
symfonyRoutesCache.addToCacheList(SYMFONY_ROUTES.map(route => ({ url: route, revision: Date.now().toString() })));

workbox.routing.registerRoute(
    ({ url }) => SYMFONY_ROUTES.some(route => url.pathname.startsWith(route)),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'symfony-routes',
        plugins: [ UsePrecachePlugin(symfonyRoutesCache) ]
    })
);

// Elements cache
workbox.routing.registerRoute(
    new RegExp('/api/elements'),
    new workbox.strategies.NetworkFirst({
        networkTimeoutSeconds: 5,
        cacheName: 'elements',
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 100,
                maxAgeSeconds: 7 * 24 * 60 * 60,
                purgeOnQuotaError: true
            }),
            new workbox.cacheableResponse.CacheableResponsePlugin({ statuses: [0, 200] })
        ]
    })
);

// Tiles cache
workbox.routing.registerRoute(
    ({ url }) => TILES_DOMAIN_NAMES.some(domainName => url.hostname.includes(domainName)),
    new workbox.strategies.CacheFirst({
        cacheName: 'tiles',
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 200,
                maxAgeSeconds: 31 * 24 * 60 * 60,
                purgeOnQuotaError: true
            }),
            new workbox.cacheableResponse.CacheableResponsePlugin({ statuses: [0, 200] })
        ]
    })
);
workbox.precaching.precacheAndRoute([]);
// Following code not working, so using simple preCacheAndRoute (see above)
// workbox.precaching.precacheAndRoute(
//     self.__WB_MANIFEST,
//     // Ignore the ?ver= query, as the resources cached by the SW are automatically updated
//     { ignoreURLParametersMatching: [/^(ver|utm_.+)$/] }
// );
