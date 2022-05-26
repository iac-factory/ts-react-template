import { Router } from "./library";
import { Shell } from "./library";

import { Home } from "./pages";
import { Mobile } from "./pages";
import { Settings } from "./pages";

export const Application = () => {
    return (
        <Router.Routes>
            <Router.Route element={ ( <Shell/> ) }>
                <Router.Route element={ ( <Home/> ) } index/>
                <Router.Route element={ ( <Settings/> ) } path={ "settings" }/>
                <Router.Route element={ ( <Mobile/> ) } path={ "mobile-preview" }/>
                <Router.Route path={ "*" } element={ (
                    <Router.Redirection.Home/>
                ) }/>
            </Router.Route>
        </Router.Routes>
    );
};

export default Application;
