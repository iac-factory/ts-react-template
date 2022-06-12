(async () => onmessage = function (event) {
    importScripts("./highlight/highlight.min.js");
    const target = self.hljs.highlightAuto(event.data, [
        "javascript",
        "typescript",
        "yaml",
        "sql",
        "swift",
        "scss",
        "rust",
        "nginx",
        "markdown",
        "dockerfile",
        "c",
        "bash",
        "json",
        "json5"
    ]);
    postMessage(target.value);
})();

