import React, { Suspense, lazy } from "react";

import { Tiles } from "./../../components/tile";
import { Container } from "react-grid-system";

export const Home = () => {
    const Form = lazy( async () => import("./form") );
    const Tile = lazy( async () => import("./../../components/tile"));

    return (
        <Suspense fallback={ ( null ) }>
            <Form/>

            <br/>

            <Container>
                <Tiles>
                    <Tile content={ "Default Tile" } type={ "default" }/>
                    <Tile content={ "Clickable Tile" } type={ "clickable" }/>
                </Tiles>
            </Container>

            <br/>
        </Suspense>
    );
};

export default Home;