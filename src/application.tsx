import { Router } from "./library";

import { Shell } from "./library";

const Interface = () => {
    return (
        <Authorization.Router>
            <Shell/>
        </Authorization.Router>
    );
};

import { Login } from "./pages";
import { Authorization } from "./authorization";

export const Application = () => {
    const Home = Router.Dynamic(async () => import("./pages/home"));
    const Mobile = Router.Dynamic(async () => import("./pages/mobile-preview"));
    const Settings = Router.Dynamic(async () => import("./pages/settings"));
    const Form = {
        Default: Router.Dynamic(async () => import("./pages/form")),
        Example: Router.Dynamic(async () => import("./pages/form/example"))
    };

    return (
        <Authorization.Provider>
            <Router.Routes>
                <Router.Route element={ ( <Interface/> ) }>
                    <Router.Route element={ ( <Home/> ) } index/>
                    <Router.Route element={ ( <Settings/> ) } path={ "/settings" }/>
                    <Router.Route element={ ( <Mobile/> ) } path={ "/mobile-preview" }/>
                    <Router.Route element={ ( <Form.Example/> ) } path={ "/forms" }>
                        <Router.Route element={ ( <Form.Example/> ) } path={ "/forms/example" }/>
                    </Router.Route>
                    <Router.Route path={ "*" } element={ ( <Router.Redirection.Home/> ) }/>
                </Router.Route>
                <Router.Route element={ <Login/> } path="/login"/>
            </Router.Routes>
        </Authorization.Provider>
    );
};

export default Application;
