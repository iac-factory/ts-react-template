import React, { Suspense, lazy } from "react";

import { Tiles } from "./../../components/tile";

import { default as View } from "./../../library/json-view/js";

export const Home = () => {
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

            <br/>

            <View
                name={ null }
                iconStyle={ "square" }
                indentWidth={ 4 }
                collapsed={ true }
                collapseStringsAfterLength={ 3 }
                enableClipboard={ true }
                displayObjectSize={ true }
                displayDataTypes={ true }
                onEdit={ ( event ) => {
                    console.log( event );
                } }
                src={
                    {
                        test: {
                            hello: "world",
                            hello2: "world",
                            hello3: "world"
                        }
                    }
                }/>
        </Suspense>
    );
};

export default Home;