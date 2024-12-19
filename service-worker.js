// service-worker.js

const CACHE_NAME = 'my-site-cache-v1';
const OFFLINE_URL = '/offline.html';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/offline.html',
  '/styles.css',
  '/script.js',
  '/logo.png'  // 로고 이미지가 있다고 가정
];

// install 이벤트: 서비스 워커 최초 설치 시 필요한 리소스를 캐싱
self.addEventListener('install', event => {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[ServiceWorker] Caching offline page and assets');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// activate 이벤트: 이전 버전의 캐시 정리 등 유지 관리 로직
self.addEventListener('activate', event => {
  console.log('[ServiceWorker] Activate');
  event.waitUntil(
    // 오래된 캐시 삭제 (캐시 버전 관리)
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (CACHE_NAME !== cacheName) {
            console.log('[ServiceWorker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// fetch 이벤트: 네트워크 요청 가로채기
self.addEventListener('fetch', event => {
  console.log('[ServiceWorker] Fetch', event.request.url);

  event.respondWith(
    // 네트워크 요청 시도
    fetch(event.request).catch(() => {
      // 네트워크 요청 실패(오프라인) 시 캐시에서 offline.html 반환
      return caches.match(OFFLINE_URL);
    })
  );
});
