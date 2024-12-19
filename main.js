// main.js
if ('serviceWorker' in navigator) {
  // 페이지가 로드된 뒤 서비스 워커를 등록
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => {
        console.log('Service Worker registered!', reg);
      })
      .catch(err => {
        console.error('Service Worker registration failed:', err);
      });
  });
}
