import { Shell } from "./shell";

import { Route, Routes } from "react-router-dom";

import { Home }     from "./pages/home";
import { Settings } from "./pages/settings";
import { Mobile }   from "./pages/mobile-preview";

const Application = () => {
    return (
        <Routes>
            <Route element={ <Shell/> }>
                <Route element={ ( <Home name={ "Home" }/> ) } index/>
                <Route element={ ( <Settings name={ "Settings" }/> ) } path={ "settings" }/>
                <Route element={ ( <Mobile name={ "Mobile-Page" }/> ) } path={ "mobile-preview" }/>
                <Route element={ ( <Home name={ "Home" }/> ) } path={ "*" }/>
            </Route>
        </Routes>
    );
};

export { Application };

export default { Application };
