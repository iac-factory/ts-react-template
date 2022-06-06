import { Router } from "./library";

import { Authorization } from "./authorization";

import { Shell } from "./library";

const { Provider } = Authorization;
const { Consumer } = Authorization;

export const Application = () => {
    const Home = Router.Dynamic( async () => import("./pages/home") );
    const Testing = Router.Dynamic( async () => import("./pages/testing") );
    const Documentation = Router.Dynamic( async () => import("./pages/documentation") );

    const Login = Router.Dynamic( async () => import("./pages/login") );

    return (
        <Provider>
            <Router.Routes>
                <Router.Route element={ ( <Shell/> ) }>
                    <Router.Route element={ ( <Consumer/> ) }>
                        <Router.Route element={ ( <Home/> ) } index/>
                        <Router.Route element={ ( <Testing/> ) } path={ "/testing" }/>
                        <Router.Route element={ ( <Documentation/> ) } path={ "/documentation" }/>

                        <Router.Route path={ "*" } element={ ( <Router.Redirection.Home/> ) }/>
                    </Router.Route>
                </Router.Route>
                <Router.Route element={ ( <Shell/> ) }>
                    <Router.Route element={ <Login/> } path="/login"/>
                </Router.Route>
            </Router.Routes>
        </Provider>
    );
};

export default Application;
