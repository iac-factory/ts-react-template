(async () => onmessage = function (event) {
    importScripts("./highlight/highlight.min.js");
    const target = self.hljs.highlightAuto(event.data, [
        "javascript",
        "typescript",
        "json",
        "json5"
    ]);
    postMessage(target.value);
})();

