/*** @private */
import * as Routing from "react-router-dom";

import * as Historical from "history";

import Redirect from "./redirect";

export module Router {
    /*** @type {import("react-router-dom").Browser} */
    export const Browser = Routing.BrowserRouter;

    /*** @type {import("react-router-dom").Routes} */
    export const Routes = Routing.Routes;

    /*** @type {import("react-router-dom").Route} */
    export const Route = Routing.Route;

    /*** @type {import("react-router-dom").NavLink} */
    export const Active = Routing.NavLink;

    /*** @type {import("react-router-dom").Link} */
    export const Link = Routing.NavLink;

    /*** @type {import("react-router-dom").Link} */
    export const Navigate = Routing.Navigate;

    /*** @type {import("react-router-dom").Outlet} */
    export const Outlet = Routing.Outlet;

    export const Redirection = Redirect;

    export const History = Historical.Action;

    export module Handler {
        /*** @type {import("react-router-dom").useHref} */
        export const HREF = Routing.useHref;

        /*** @type {import("react-router-dom").useInRouterContext} */
        export const Context = Routing.useInRouterContext;

        /*** @type {import("react-router-dom").useLocation} */
        export const Location = Routing.useLocation;

        /*** @type {import("react-router-dom").useMatch} */
        export const Match = Routing.useMatch;

        /*** @type {import("react-router-dom").useNavigate} */
        export const Navigate = Routing.useNavigate;

        /*** @type {import("react-router-dom").useParams} */
        export const Parameters = Routing.useParams;

        /*** @type {import("react-router-dom").useResolvedPath} */
        export const Path = Routing.useResolvedPath;

        /*** @type {import("react-router-dom").useRoutes} */
        export const Routes = Routing.useRoutes;

        export const Click = Routing.useLinkClickHandler;

        export module Outlet {
            /*** @type {import("react-router-dom").useOutlet} */
            export const Resolve = Routing.useOutlet;
            /*** @type {import("react-router-dom").useOutletContext} */
            export const Context = Routing.useOutletContext;
        }
    }
}

export default Router;

export const { Outlet } = Router;
export const { Browser } = Router;
export const { Routes } = Router;
export const { Route } = Router;
export const { Handler } = Router;
