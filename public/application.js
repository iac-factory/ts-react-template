const Application = (async () => {
    console.info("[Log] (HTML-Document)", "Establishing IO-Application Callable.");

    void await (async () => {
        const IO = new Proxy(HTMLElement, Object.create({}));

        IO.disabledFeatures = [ "shadow" ];

        window.customElements.define("io-application", IO);
    })();

    console.info("[Log] (HTML-Document)", "Callable was Initialized. Instantiating Tag Definition.");

    console.info("[Log] (HTML-Document)", "Successfully Established IO-Application HTML Element.");
})();

export default await Application;