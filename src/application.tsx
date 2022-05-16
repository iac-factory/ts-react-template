import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";

import { Home } from "./pages";
import { Mobile } from "./pages";
import { Settings } from "./pages";

import { Shell } from "./shell";

export const Application = () => {
    return (
        <Routes>
            <Route element={ <Shell/> }>
                <Route element={ ( <Home/> ) } index/>
                <Route element={ ( <Settings/> ) } path={ "settings" }/>
                <Route element={ ( <Mobile/> ) } path={ "mobile-preview" }/>
                <Route element={ ( <Home/> ) } path={ "*" }/>
            </Route>
        </Routes>
    );
};

export default Application;
