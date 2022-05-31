import "./index.scss";

import Styles from "./index.module.scss";

interface Properties {
    children?: JSX.Element;
}

const Component = (properties: Properties = { children: null }) => {
    return (
        <main className={ Styles.component }>
            {
                properties?.children ?? null
            }
        </main>
    )
};

export default Component;

export { Component as Container };
