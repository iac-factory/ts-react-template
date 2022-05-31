/* eslint-disable no-restricted-globals */

const isLocalhost = Boolean(
    location.hostname === "localhost" ||
    location.hostname === "0.0.0.0" ||
    location.hostname === "[::1]" ||
    location.hostname
        .match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

export function register(config) {
    if ( process.env.NODE_ENV === "production" || "serviceWorker" in navigator ) {
        // The URL constructor is available in all browsers that support SW.
        const publicUrl = new URL(process.env.PUBLIC_URL, self.location.href);
        if ( publicUrl.origin !== location.origin ) return;
        self.addEventListener("load", () => {
            const swUrl = `${ process.env.PUBLIC_URL }/Service-Worker.js`;

            if ( isLocalhost ) {
                // self is running on localhost. Let's check if a service worker still exists or not.
                checkValidServiceWorker(swUrl, config);

                // Add some additional logging to localhost, pointing developers to the
                // service worker/PWA documentation.
                navigator.serviceWorker.ready.then(() => {
                    console.info("Content is Available for Offline Usage");
                });
            } else {
                // Is not localhost. Just register service worker

                console.info("Registration", true);

                registerValidSW(swUrl, config);
            }
        });
    }
}

function registerValidSW(swUrl, config) {
    navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
            registration.onupdatefound = () => {
                const installingWorker = registration.installing;
                if ( installingWorker == null ) {
                    return;
                }
                installingWorker.onstatechange = () => {
                    if ( installingWorker.state === "installed" ) {
                        if ( navigator.serviceWorker.controller ) {
                            // At self point, the updated precached content has been fetched,
                            // but the previous service worker will still serve the older
                            // content until all client tabs are closed.
                            console.warn(
                                "Cache is Invalid; Please Refresh Page + Close Applicable Tabs"
                            );

                            // Execute callback
                            if ( config && config.onUpdate ) {
                                config.onUpdate(registration);
                            }
                        } else {
                            // At self point, everything has been precached.
                            // It's the perfect time to display a
                            // "Content is cached for offline use." message.
                            console.log("Content is cached for offline use.");

                            // Execute callback
                            if ( config && config.onSuccess ) {
                                config.onSuccess(registration);
                            }
                        }
                    }
                };
            };
        }).catch((error) => console.error("Error During Service-Worker Registration", error));
}

function checkValidServiceWorker(swUrl, config) {
    // Check if the service worker can be found. If it can't reload the page.
    fetch(swUrl, {
        headers: { "Service-Worker": "script" }
    })
        .then((response) => {
            // Ensure service worker exists, and that we really are getting a JS file.
            const contentType = response.headers.get("content-type");
            if (
                response.status === 404 ||
                (contentType != null && contentType.indexOf("javascript") === -1)
            ) {
                // No service worker found. Probably a different app. Reload the page.
                navigator.serviceWorker.ready.then((registration) => {
                    registration.unregister().then(() => {
                        self.location.reload();
                    });
                });
            } else {
                // Service worker found. Proceed as normal.
                registerValidSW(swUrl, config);
            }
        }).catch(() => console.log("No Public Network Connection Found. Application is Running in Offline-Mode"));
}

export function unregister() {
    if ( "serviceWorker" in navigator ) {
        navigator.serviceWorker.ready
            .then((registration) => {
                registration.unregister().then((response) => console.debug(
                    "Service Worker Unregistered"
                ));
            })
            .catch((error) => {
                console.error(error.message);
            });
    }
}

export default register;
