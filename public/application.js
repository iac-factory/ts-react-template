const Application = (async () => {
    console.debug("[Debug] (HTML-Document)", "Establishing IO-Application Callable");

    void await (async () => {
        /*** Will have compatability issue(s) with Internet Explorer, and *very old* browsers */
        const IO = new Proxy(HTMLElement, Object.create({}));

        IO.disabledFeatures = [ "shadow" ];

        window.customElements.define("io-application", IO);
    })();

    console.debug("[Debug] (HTML-Document)", "Callable was Initialized. Instantiating Tag Definition");

    console.debug("[Debug] (HTML-Document)", "Successfully Established IO-Application HTML Element");
})();

export default await Application;