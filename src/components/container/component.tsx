import "./index.scss";

import Styles from "./index.module.scss";

import Properties from "prop-types";

const Component = ( { children } ) => {
    return (
        <main className={ Styles.component }>
            {
                children
            }
        </main>
    )
};

export default Component;

export { Component };
