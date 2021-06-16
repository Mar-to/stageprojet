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
workbox.precaching.precacheAndRoute([
  {
    "url": "css/admin.css",
    "revision": "62c8455f03ccce8c0173a933dbcdc0f2"
  },
  {
    "url": "css/api.css",
    "revision": "39994deaeb8fac27c001d213e5f658d2"
  },
  {
    "url": "css/duplicates.css",
    "revision": "268f87b2da8f89c221286cccf3720e96"
  },
  {
    "url": "css/element-form.css",
    "revision": "6f2948c9c6f56b868b15cfc8ada6a56c"
  },
  {
    "url": "css/fontawesome-iconpicker.css",
    "revision": "a51a22608b0602a8bed5d0f018370dbb"
  },
  {
    "url": "css/fonts/gogocarto.woff",
    "revision": "e646ed8744e504a9e89c2e7f66cf7d26"
  },
  {
    "url": "css/fonts/icons-reference.html",
    "revision": "0a6e9d2de496605ba6c47ceb3a4d454b"
  },
  {
    "url": "css/gogocarto.css",
    "revision": "5bb08a05f4beba28e00947078ab50cbd"
  },
  {
    "url": "css/home.css",
    "revision": "3e6020e195aa8b6d92961a42fa32261e"
  },
  {
    "url": "css/images/leaflet.routing.icons.png",
    "revision": "142d1f83d4973b26318739e94fcf486e"
  },
  {
    "url": "css/images/logo-transiscope-small.png",
    "revision": "1cf8dabbca81fe53c2f1c9a0924fe76b"
  },
  {
    "url": "css/images/logo-transiscope6.png",
    "revision": "6934f5a5a5c382164611158277823343"
  },
  {
    "url": "css/images/marker-icon-2x.png",
    "revision": "d95d69fa8a7dfe391399e22c0c45e203"
  },
  {
    "url": "css/images/marker-icon.png",
    "revision": "2273e3d8ad9264b7daa5bdbf8e6b47f8"
  },
  {
    "url": "css/images/marker-shadow.png",
    "revision": "44a526eed258222515aa21eaffd14a96"
  },
  {
    "url": "css/pages.css",
    "revision": "6112f1d7d61f50dad378376f7bb4683d"
  },
  {
    "url": "css/saas.css",
    "revision": "a7c36c8e25d458cb96c50273ca1c0b12"
  },
  {
    "url": "css/spectrum.css",
    "revision": "9900c755eb662509488ebe25f109acac"
  },
  {
    "url": "fonts/fontawesome-5/css/all.css",
    "revision": "ab5a917e50f7e83bca7e07ee7d6360f8"
  },
  {
    "url": "fonts/fontawesome-5/css/all.min.css",
    "revision": "7b1d7f457d056ace7b230b587b9f3753"
  },
  {
    "url": "fonts/fontawesome-5/css/brands.css",
    "revision": "c35c27f049039c4efec20d5f62ca2af9"
  },
  {
    "url": "fonts/fontawesome-5/css/brands.min.css",
    "revision": "39401661f292a1b333ed11444a0d42c5"
  },
  {
    "url": "fonts/fontawesome-5/css/fontawesome.css",
    "revision": "afc3e1757115f9aa29298debc9c8fe85"
  },
  {
    "url": "fonts/fontawesome-5/css/fontawesome.min.css",
    "revision": "761f47f35799f23c7596e6c82c8ce6e9"
  },
  {
    "url": "fonts/fontawesome-5/css/regular.css",
    "revision": "a91dc06d88dcab164ec09b5818b07927"
  },
  {
    "url": "fonts/fontawesome-5/css/regular.min.css",
    "revision": "d5c2e76b5cfdc2534ad92edc14dbd4a4"
  },
  {
    "url": "fonts/fontawesome-5/css/solid.css",
    "revision": "e1ac8301202a66d60e3bb2697b99536f"
  },
  {
    "url": "fonts/fontawesome-5/css/solid.min.css",
    "revision": "372b31365ea9367753d9137e8a9e934e"
  },
  {
    "url": "fonts/fontawesome-5/css/svg-with-js.css",
    "revision": "c3260a9bc5c998975115f2f124b9b8dc"
  },
  {
    "url": "fonts/fontawesome-5/css/svg-with-js.min.css",
    "revision": "fbda33ed84aa346d96d403221aa06b77"
  },
  {
    "url": "fonts/fontawesome-5/css/v4-shims.css",
    "revision": "4743493a0d5ff9fb4258cec6dbfebf80"
  },
  {
    "url": "fonts/fontawesome-5/css/v4-shims.min.css",
    "revision": "c217bda6dbb0d3e301283e4118777ac0"
  },
  {
    "url": "fonts/fontawesome-5/js/all.js",
    "revision": "05c95148532e720c379fec4847208576"
  },
  {
    "url": "fonts/fontawesome-5/js/all.min.js",
    "revision": "ebb8d1549ec556961cdd7f87f7512edb"
  },
  {
    "url": "fonts/fontawesome-5/js/brands.js",
    "revision": "cac879ab3075992d2a11c5e174802050"
  },
  {
    "url": "fonts/fontawesome-5/js/brands.min.js",
    "revision": "66defce05383490f57378b1a364986d2"
  },
  {
    "url": "fonts/fontawesome-5/js/fontawesome.js",
    "revision": "a78e0d6dfece20ab0c00599b2fa78d22"
  },
  {
    "url": "fonts/fontawesome-5/js/fontawesome.min.js",
    "revision": "9d08aefc88410ec994e225d2e22c0527"
  },
  {
    "url": "fonts/fontawesome-5/js/regular.js",
    "revision": "d02f87f75a6bd04ed498d94b945d876c"
  },
  {
    "url": "fonts/fontawesome-5/js/regular.min.js",
    "revision": "65ed6ca7b91b06457f79fe29e32258c6"
  },
  {
    "url": "fonts/fontawesome-5/js/solid.js",
    "revision": "206e089895211496d78dd457e69b87b0"
  },
  {
    "url": "fonts/fontawesome-5/js/solid.min.js",
    "revision": "04a5608d5ca7f5953a7a9e6113c241b7"
  },
  {
    "url": "fonts/fontawesome-5/js/v4-shims.js",
    "revision": "bd0bbadd4409e5f19baf56eb75addb0c"
  },
  {
    "url": "fonts/fontawesome-5/js/v4-shims.min.js",
    "revision": "6fefaf25ceea1caad6bb18bfeba4330a"
  },
  {
    "url": "fonts/fontawesome-5/webfonts/fa-brands-400.woff",
    "revision": "c7d7a2a1781e8da1dc85deb1e4f39b84"
  },
  {
    "url": "fonts/fontawesome-5/webfonts/fa-brands-400.woff2",
    "revision": "662c24d02ff1711bd01ec3868df8680b"
  },
  {
    "url": "fonts/fontawesome-5/webfonts/fa-regular-400.woff",
    "revision": "72f15fa766bc05a4b3ecaa8579763f85"
  },
  {
    "url": "fonts/fontawesome-5/webfonts/fa-regular-400.woff2",
    "revision": "6a9d786e67d54419d8629081fbb555d6"
  },
  {
    "url": "fonts/fontawesome-5/webfonts/fa-solid-900.woff",
    "revision": "9c73abbdbd6492778680163269b68345"
  },
  {
    "url": "fonts/fontawesome-5/webfonts/fa-solid-900.woff2",
    "revision": "3638e62ea50e6f5859b6a15276c25c87"
  },
  {
    "url": "fonts/lobster-v22-latin-regular.woff",
    "revision": "02bba601716f9a0ff1e241a64cfe9b29"
  },
  {
    "url": "fonts/lobster-v22-latin-regular.woff2",
    "revision": "fe012fb7b22e5776c4a2e91889068974"
  },
  {
    "url": "fonts/open-sans-v17-latin-800.woff",
    "revision": "05ebdbe10796850f045fcd484f35788d"
  },
  {
    "url": "fonts/open-sans-v17-latin-800.woff2",
    "revision": "ab3e500e7375695d702cff19513e4470"
  },
  {
    "url": "fonts/open-sans-v17-latin-regular.woff",
    "revision": "de0869e324680c99efa1250515b4b41c"
  },
  {
    "url": "fonts/open-sans-v17-latin-regular.woff2",
    "revision": "33543c5cc5d88f5695dd08c87d280dfd"
  },
  {
    "url": "fonts/oxygen-v9-latin-700.woff",
    "revision": "1b232cd31c7ab16b4abdd2c58c2ba166"
  },
  {
    "url": "fonts/oxygen-v9-latin-700.woff2",
    "revision": "2847cae58398c877ee4eb5aafba5dd4e"
  },
  {
    "url": "fonts/oxygen-v9-latin-regular.woff",
    "revision": "16ad63211ca58d19c52e813c47dc9804"
  },
  {
    "url": "fonts/oxygen-v9-latin-regular.woff2",
    "revision": "4a07caa655d449d52b52cd43005a800d"
  },
  {
    "url": "fonts/Roboto-Black.woff",
    "revision": "9da854de5f3724e839191dbb45d4f940"
  },
  {
    "url": "fonts/Roboto-Black.woff2",
    "revision": "1be05e5f249e7e50d0872510c63943b0"
  },
  {
    "url": "fonts/Roboto-Light.woff",
    "revision": "b355aea0c75c3543593a870a3829e417"
  },
  {
    "url": "fonts/Roboto-Light.woff2",
    "revision": "e04aee294608887aa75f438ab3b4ea4f"
  },
  {
    "url": "fonts/roboto-v20-latin-900.woff",
    "revision": "bb1e4dc6333675d11ada2e857e7f95d7"
  },
  {
    "url": "fonts/roboto-v20-latin-900.woff2",
    "revision": "9b3766ef4a402ad3fdeef7501a456512"
  },
  {
    "url": "fonts/roboto-v20-latin-regular.woff",
    "revision": "60fa3c0614b8fb2f394fa29944c21540"
  },
  {
    "url": "fonts/roboto-v20-latin-regular.woff2",
    "revision": "479970ffb74f2117317f9d24d9e317fe"
  },
  {
    "url": "fonts/ubuntu-v14-latin-700.woff",
    "revision": "669545b14b8032954bfe46909785c19f"
  },
  {
    "url": "fonts/ubuntu-v14-latin-700.woff2",
    "revision": "b91fae466c698c775adb2ae92cecc8b2"
  },
  {
    "url": "fonts/ubuntu-v14-latin-regular.woff",
    "revision": "1e926e228a9e2e1e77034f624211e2b4"
  },
  {
    "url": "fonts/ubuntu-v14-latin-regular.woff2",
    "revision": "5b23eeb3a32b30e91682d601535d2a89"
  },
  {
    "url": "img/arrow.png",
    "revision": "d6defc127e912e0a9a813d246214f6f6"
  },
  {
    "url": "img/com-lm-kf.png",
    "revision": "0d9a64a4fa7e814f0fda3c9817197ddd"
  },
  {
    "url": "img/default-icon.png",
    "revision": "17f1b69e8f9ef731df6754b606f88156"
  },
  {
    "url": "img/gogocarto_video_thumbnail.png",
    "revision": "e66238daaa6c6676026036e66bd52104"
  },
  {
    "url": "img/top_arr.png",
    "revision": "3d8bab4c3b93ee1d807b7de048e429eb"
  },
  {
    "url": "js/ace/ace.js",
    "revision": "8599fc949c3793c673f35c556f2f195e"
  },
  {
    "url": "js/ace/mode-css.js",
    "revision": "46e86ff8ecdf6f81d24ea01619d7494a"
  },
  {
    "url": "js/ace/mode-javascript.js",
    "revision": "1997c82a11999e021909406a6e634fbb"
  },
  {
    "url": "js/ace/mode-markdown.js",
    "revision": "14a6cefb43b764fcfb9858b12466a63c"
  },
  {
    "url": "js/ace/mode-php.js",
    "revision": "4ce2c6883b579235d6e9c7f9b81c7cdb"
  },
  {
    "url": "js/ace/mode-twig.js",
    "revision": "0f85ce7779247dc6d3be27405f6ceea7"
  },
  {
    "url": "js/ace/theme-monokai.js",
    "revision": "41b1975e9f7aa8bb8526273ff15487b0"
  },
  {
    "url": "js/ace/worker-php.js",
    "revision": "c2d7d301f38c0f55dec1044e4abeccb5"
  },
  {
    "url": "js/element-form.js",
    "revision": "9ff49d44938ee53a8d1b8b37d224ba2c"
  },
  {
    "url": "js/external-pages.js",
    "revision": "f68f9b4da0ddbead144cfa4501a70d05"
  },
  {
    "url": "js/fontawesome-iconpicker.js",
    "revision": "f77cd36249a7bd2c02e68d441cb13de2"
  },
  {
    "url": "js/form-builder.min.js",
    "revision": "dd157f275a36fa56ffdd52db3be164ee"
  },
  {
    "url": "js/form-render.min.js",
    "revision": "444183fe31db11800922b43e1611e59a"
  },
  {
    "url": "js/gogocarto.js",
    "revision": "11fd2764c1b8be64d2e0680758f54e9a"
  },
  {
    "url": "js/home.js",
    "revision": "f4217eb45224707ecc92fd73332b79c5"
  },
  {
    "url": "js/list.js",
    "revision": "69b60bc29a0554523767949686b4d089"
  },
  {
    "url": "js/spectrum.min.js",
    "revision": "51f868a62aa12850a6b8ca2376100647"
  }
]);
// Following code not working, so using simple preCacheAndRoute (see above)
// workbox.precaching.precacheAndRoute(
//     self.__WB_MANIFEST,
//     // Ignore the ?ver= query, as the resources cached by the SW are automatically updated
//     { ignoreURLParametersMatching: [/^(ver|utm_.+)$/] }
// );
