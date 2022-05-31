"use static";

export default (async function(){
    document.documentElement.classList.remove("no-js");
    document.documentElement.classList.add("js");
    document.documentElement.id = "NEXus-IO-Document-Element";

    if (location.protocol !== "https:") {
        if ("serviceWorker" in navigator) {
            window.addEventListener("load", () => {
                navigator.serviceWorker.register("/Worker.js");
            });
        }
    };

    console.debug("[DEBUG] HTML.Head Load Complete");
})();
