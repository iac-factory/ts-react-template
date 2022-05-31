import "./settings/index.js";

import ReactDOM from "react-dom";
import React, { lazy as Import, Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import {Outlet} from "react-router";
import { createRoot } from "react-dom/client";

import "./index.scss";

import { Theme, Content } from "@carbon/react";

/***
 *
 * @param theme: {String("g100" | "g90" | "g10" | "white")}
 *
 */

export const useTheme = (theme = "g100") => {
    const Theme = React.createContext(theme);

    Theme.theme = theme;

    return Theme;
};

const Application = Import(() => new Promise((resolve) => resolve(import("./Application.js"))));
const DOM = (Child) => {
    const theme = useTheme();

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
        const Preference = event.matches ? "dark" : "light";

        theme.theme = (
            Preference === "dark"
        ) ? "g100" : "light";
    });

    return (
        <React.StrictMode>
            <Theme theme={ theme.theme }>
                <Content>
                    <Router>
                        <Suspense fallback={ null } children={<Application/>}/>
                    </Router>
                </Content>
            </Theme>
        </React.StrictMode>
    );
};

const $ =createRoot(document.getElementById("Application"));

$.render(<DOM/>);

//ReactDOM.render((
//    <DOM/>
//), document.getElementById("Application"));

//(process.env.NODE_ENV === "production")
//    ? import("./Worker.js").then((Module) => Module.register())
//    : import("./Worker.js").then((Module) => Module.unregister());
//
//(process.env.NODE_ENV !== "production") && console.debug("[Debug]", process.env);