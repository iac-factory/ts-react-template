import "./index.scss";

import React from "react";

import { Router } from "./library";
import { Client } from "./library";
import { Debug } from "./library";

import { Application } from "./application";

import { createRoot } from "react-dom/client";

const DOM = () => {
    // const theme = Context();

    window.matchMedia( "(prefers-color-scheme: dark)" ).addEventListener( "change", ( event ) => {
        const Preference = event.matches ? "dark" : "light";

        // theme.theme = (
        //     Preference === "dark"
        // ) ? "g100" : "light";
    } );

    return (
        <React.StrictMode children={ (
            <Router.Browser>
                <Application/>
            </Router.Browser>
        ) }/>
    );
};

( Debug === true ) && import("./library").then( ( Module ) => {
    Module.Debugger.Vitals().finally(
        () => {
            // ...
        }
    );
} );

const container = document.getElementById("Application");

const root = createRoot(container!);

root.render(<DOM/>);

export * from "./library";