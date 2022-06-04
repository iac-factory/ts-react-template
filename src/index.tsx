import "./index.scss";

import React from "react";

import { Router } from "./library";
import { Client } from "./library";
// import { Debug } from "./library";

import { UI } from "./application";

// const DOM = () => {
//     // const theme = Context();
//
//     window.matchMedia( "(prefers-color-scheme: dark)" ).addEventListener( "change", ( event ) => {
//         const Preference = event.matches ? "dark" : "light";
//
//         // theme.theme = (
//         //     Preference === "dark"
//         // ) ? "g100" : "light";
//     } );
//
//     return (
//         <React.StrictMode children={ (
//             <Router.Browser>
//                 <Application/>
//             </Router.Browser>
//         ) }/>
//     );
// };

// ( Debug === true ) && import("./library").then( ( Module ) => {
//     Module.Debugger.Vitals().finally(
//         () => {
//             // ...
//         }
//     );
// } );

Client.Interface.render(
    <React.StrictMode>
        <Router.Browser>
            <UI.Application/>
        </Router.Browser>
    </React.StrictMode>
);

export * from "./library";