import * as DOM from "react-dom/client";

export module Client {
    export const initialize = DOM.createRoot;
    export const Hydrate = DOM.hydrateRoot;
}

export default Client;
