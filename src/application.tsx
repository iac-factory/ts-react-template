import { Router } from "./library";
import { Shell } from "./library";

import { Home } from "./pages";
import { Mobile } from "./pages";
import { Settings } from "./pages";

import { Login } from "./pages";

import { Authorization } from "./authorization";

export const Application = () => {
    return (
        <Authorization.Provider>
            <Router.Routes>
                <Router.Route element={ ( <Authorization.Router children={ ( <Shell/> ) }/> ) }>
                    <Router.Route element={ ( <Home/> ) } index/>
                    <Router.Route element={ ( <Settings/> ) } path={ "/settings" }/>
                    <Router.Route element={ ( <Mobile/> ) } path={ "/mobile-preview" }/>
                    <Router.Route path={ "*" } element={ ( <Router.Redirection.Home/> ) }/>
                </Router.Route>
                <Router.Route element={ <Login/> } path="/login"/>
            </Router.Routes>
        </Authorization.Provider>
    );
};

export default Application;
