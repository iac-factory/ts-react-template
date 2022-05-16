import "./index.scss";

import React from "react";

import Styles from "./index.module.scss";

import { Strings } from "../imports";

interface Properties {
    name: string;
    children?: JSX.Element | JSX.Element[];
}

export const Component = ( properties: Properties ) => {
    return (
        <div id={ Strings.normalize( properties.name, "Page", "Wrapper" ) } className={ Styles.component }>
            {
                properties?.children ?? null
            }
        </div>
    );
};

export default Component;
