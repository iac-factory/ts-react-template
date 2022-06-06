import React, { lazy } from "react";
import { Suspense } from "react";
import { Tiles } from "../../components/tile";

export const Settings = () => {
    const Form = lazy( async () => import("./form") );
    const Tile = lazy( async () => import("./../../components/tile") );

    return (
        <Suspense fallback={ ( null ) }>
            <Form/>

            <br/>

            <Tiles>
                <Tile content={ "Default Tile" } type={ "default" }/>
                <Tile content={ "Clickable Tile" } type={ "clickable" }/>
            </Tiles>

        </Suspense>
    );
};

export default Settings;