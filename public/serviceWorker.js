const CACHE_NAME = "version-1.0.1";
const urlsToCache = [
  "/",
  "index.html",
  "offline.html",
  "manifest.json",
  "../src/assets/beep-sound.mp3",
  "../src/assets/click-sound.mp3",
  "../src/assets/final-beep-sound.mp3",
  "../Components/ChessTimer.js",
  "../Components/ColorPicker.js",
  "../Components/SelectTime.js",
  "../App.js",
  "../App.css",
];

// Function to filter URLs based on file extension
function shouldCache(url) {
  const extensionsToCache = [".css", ".js", ".html", ".json"];
  const urlLowercase = url.toLowerCase();
  return extensionsToCache.some((ext) => urlLowercase.endsWith(ext));
}

// Install SW
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Fetch and cache assets dynamically
      return Promise.all(
        urlsToCache.map((url) => {
          return fetch(url)
            .then((response) => {
              if (shouldCache(url) && response.ok) {
                return cache.put(url, response);
              }
            })
            .catch((error) => console.error("Failed to fetch", error));
        })
      );
    })
  );
});

// Listen to Requests
// Listen to Requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // If the request is in the cache, return the cached version
      if (response) {
        return response;
      }

      // Otherwise, fetch from the network and cache the response
      return fetch(event.request)
        .then((networkResponse) => {
          // Check if the response is valid and cache it for future use
          if (shouldCache(event.request.url) && networkResponse.ok) {
            const clonedResponse = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, clonedResponse);
            });
          }

          return networkResponse;
        })
        .catch(() => caches.match("index.html")); // Return cached index.html if network request fails
    })
  );
});

// Activate SW
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
