import React, { lazy as Split } from "react";
import { Text } from "../text";

/*** Code Splitting Page Content + Data Fetching */
interface Dynamic {
    Template: typeof import("./component").default;
    Import: React.LazyExoticComponent<Dynamic["Template"]>;
}

interface Properties {
    name?: string;
    children?: JSX.Element | null;
}
/*** Split JSX Component */
const Template: Dynamic["Import"] = Split(() => import("./component"));

const Content = ( properties: Properties ) => {
    return (
        <Template name={ properties.name }>
            {
                (properties?.children)
                    ? (properties.children)
                    : (<Text input={properties.name}/>)
            }
        </Template>
    )
};

export default Content;

export { Content };
