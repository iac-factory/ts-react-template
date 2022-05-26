import React from "react";

import styles from "./index.module.scss";
export module Component {
    export const Navigator = ( { as = "nav", children = null } ) => {
        return React.createElement(as, {
            className: styles.component,
            children: children
        });
    };
}

export default Navigator;
export const { Navigator } = Component;
