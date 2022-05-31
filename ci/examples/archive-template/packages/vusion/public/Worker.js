"use static";

(async function () {
    console.debug("[DEBUG] Worker.js => H3l10 WoR1d");

    const LOCALHOST = Boolean(
        window.location.hostname === "localhost" ||
        window.location.hostname === "[::1]" ||
        window.location.hostname.match(
            /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
        )
    );

    console.debug("[DEBUG] Worker.js => Development", "-", LOCALHOST);
})();
