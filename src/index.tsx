import "./index.scss";

import React, { lazy as Import, Suspense } from "react";

import { createRoot } from "react-dom/client";

import { BrowserRouter as Router, Outlet } from "react-router-dom";

import { Debug } from "./utilities/debug";

import Context from "./context";

import { Application } from "./application";

function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>

            {/* This element will render either <DashboardMessages> when the URL is
          "/messages", <DashboardTasks> at "/tasks", or null if it is "/"
      */ }
            <Outlet/>
        </div>
    );
}

const DOM = () => {
    const theme = Context();

    window.matchMedia( "(prefers-color-scheme: dark)" ).addEventListener( "change", ( event ) => {
        const Preference = event.matches ? "dark" : "light";

        theme.theme = (
            Preference === "dark"
        ) ? "g100" : "light";
    } );

    return (
        <React.StrictMode>
            <Router window={ window }>
                <Application/>
            </Router>
        </React.StrictMode>
    );
};

( Debug === true ) && import("./utilities/vitals").then( ( $ ) => {
    $.Vitals().finally(
        () => {
            // ...
        }
    );
} );

const $ = createRoot( document.getElementById( "Application" ) );

$.render( <DOM/> );