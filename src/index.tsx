import "./index.scss";

import React from "react";

import { Router } from "./library";
import { Client } from "./library";
import { Debug } from "./library";

import { Application } from "./application";

const DOM = () => {
    // const theme = Context();

    window.matchMedia( "(prefers-color-scheme: dark)" ).addEventListener( "change", ( event ) => {
        const Preference = event.matches ? "dark" : "light";

        // theme.theme = (
        //     Preference === "dark"
        // ) ? "g100" : "light";
    } );

    return (
        <React.StrictMode children={(
            <Router.Browser>
                <Application/>
            </Router.Browser>
        )}/>
    );
};

( Debug === true ) && import("./library").then( ( Module ) => {
    Module.Debugger.Vitals().finally(
        () => {
            // ...
        }
    );
} );

const Package = Client.initialize( document.getElementById( "Application" ) );

Package.render( <DOM/> );

export * from "./library";