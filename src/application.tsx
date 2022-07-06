import { Router } from "./library";

import { Authorization } from "./authorization";

import { Shell } from "./library";

const Login = Router.Dynamic( () => import("./pages/login") );
const Home = Router.Dynamic( () => import("./pages/home") );
const Testing = Router.Dynamic( () => import("./pages/testing") );
const Documentation = Router.Dynamic( () => import("./pages/documentation") );
const VCS = Router.Dynamic( () => import("./pages/vcs") );
const Development = Router.Dynamic( () => import("./pages/development") );

export const Application = () => {
    const { Provider } = Authorization;
    const { Consumer } = Authorization;

    return (
        <Provider>
            <Router.Routes>
                <Router.Route element={ ( <Shell/> ) }>
                    <Router.Route element={ ( <Consumer/> ) }>
                        <Router.Route element={ ( <Home/> ) } index/>
                        <Router.Route element={ ( <Testing/> ) } path={ "/testing" }/>
                        <Router.Route element={ ( <Documentation/> ) } path={ "/documentation" }/>
                        <Router.Route element={ ( <VCS/> ) } path={ "/version-control" }/>

                        {/*** @experimental /*/}
                        <Router.Route path={ "*" } element={ ( <Home/> ) }/>
                        {/* <Router.Route path={ "*" } element={ ( <Login/> ) }/> */}
                    </Router.Route>
                </Router.Route>
                <Router.Route element={ ( <Shell/> ) }>
                    <Router.Route element={ (<Login/>) } path={ "/login" }/>
                    <Router.Route element={ ( <Development/> ) } path={ "/development" }/>
                </Router.Route>
            </Router.Routes>
        </Provider>
    );
};

export default Application;
