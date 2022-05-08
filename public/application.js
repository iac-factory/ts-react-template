"use static";

const Application = (async () => {
    console.info("[Log] (HTML-Document)", "Establishing IO-Application Callable.");

    async function $() {
        class IO extends HTMLElement {
            static id = "Application";
            static name = "io-application";
            static template = "source";

            constructor() {
                super();
            }

            static get disabledFeatures() { return [ "shadow" ]; }
        }

        window.customElements.define(IO.name, IO, { extends: "div" });
    }

    console.info("[Log] (HTML-Document)", "Callable was Initialized. Instantiating Tag Definition.");

    await $();

    console.info("[Log] (HTML-Document)", "Successfully Established IO-Application HTML Element.");
})();

export default await Application;