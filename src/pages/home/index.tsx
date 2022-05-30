import React, { Suspense, lazy } from "react";

import { Tiles } from "./../../components/tile";

export const Home = () => {
    const Form = lazy( async () => import("./form") );
    const Tile = lazy( async () => import("./../../components/tile"));

    return (
        <Suspense fallback={ <span> Loading ... </span> }>
            <Form/>

            <br/>

            <Tiles>
                <Tile content={ "Default Tile" } type={ "default" }/>
                <Tile content={ "Clickable Tile" } type={ "clickable" }/>
            </Tiles>

            <br/>
        </Suspense>
    );
};

export default Home;