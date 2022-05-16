import { Text } from "../text";

import React, { lazy as Split } from "react";

/*** Code Splitting Page Content + Data Fetching */
interface Dynamic {
    Template: typeof import("./component").default;
    Import: React.LazyExoticComponent<Dynamic["Template"]>;
}

export const Template = ( { children, properties } ) => {
    /*** Split JSX Component */
    const Content: Dynamic["Import"] = Split( () => import("./component") );

    return (
        <Content name={ properties.name }>
            {
                ( children )
                    ? ( children )
                    : ( <Text input={ properties.name }/> )
            }
        </Content>
    );
};

export default Template;

