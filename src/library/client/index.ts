import * as DOM from "react-dom/client";

export module Client {
    const initialize = DOM.createRoot;
    const Hydrate = DOM.hydrateRoot;

    export const Interface = initialize( document.getElementById( "Application" ) );
}

export default Client;
