import "./index.scss";

import React from "react";

import { createRoot } from "react-dom/client";

import { BrowserRouter as Router } from "react-router-dom";

import { Application } from "./application";

import { Debug } from "./utilities/debug";

const Container = document.getElementById( "Application" );
const $ = createRoot(Container);
$.render(
    <React.StrictMode>
        <Router>
            <Application/>
        </Router>
    </React.StrictMode>
);

( Debug === true ) && import("./utilities/vitals").then( ( $ ) => {
    $.Vitals().finally(
        () => {
            // ...
        }
    );
} );
