import "./index.scss";
import React from "react";

import Styles from "./index.module.scss";

const Component = ({ children = null }): JSX.Element => {
    return (
        <template className={Styles.component} data-operation={"no-op"}>
            {
                children
            }
        </template>
    );
}

export { Component as Null };

export default Component;
