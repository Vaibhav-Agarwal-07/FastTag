// Simple service worker registration for CRA-like setup
const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 are considered localhost.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4]\d|[01]?\d?\d)){3}$/
    )
);

export function register(config) {
  if ('serviceWorker' in navigator) {
    const swUrl = `${process.env.PUBLIC_URL || ''}/service-worker.js`;

    window.addEventListener('load', () => {
      navigator.serviceWorker.register(swUrl).then(registration => {
        console.log('SW registered: ', registration);
      }).catch(error => {
        console.error('SW registration failed: ', error);
      });
    });
  }
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}
