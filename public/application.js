const Application = (async () => {
    console.info("[Log] (HTML-Document)", "Establishing IO-Application Callable.");

    async function $() {
        const IO = new HTMLElement();

        IO.disabledFeatures = [ "shadow" ];

        window.customElements.define(IO.name, IO.constructor(), { extends: "div" });
    }

    console.info("[Log] (HTML-Document)", "Callable was Initialized. Instantiating Tag Definition.");

    await $();

    console.info("[Log] (HTML-Document)", "Successfully Established IO-Application HTML Element.");
})();

export default await Application;