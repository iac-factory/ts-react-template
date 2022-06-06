import "./index.scss";

import React from "react";

import Styles from "./index.module.scss";

interface Properties {
    name: string;
    children?: JSX.Element | JSX.Element[];
}

export const Component = ( properties: Properties ) => {
    return (
        <div id={ ( [ properties.name, "Page", "Wrapper" ].join( "-" ) ) } className={ Styles.component }>
            {
                properties?.children ?? null
            }
        </div>
    );
};

export default Component;
