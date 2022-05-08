import "./index.scss";

import Styles from "./index.module.scss";

import { Text } from "../text";

const Component = () => {
    return (
        <footer className={ Styles.component }>
            <Text center={true} input={["©", new Date().getFullYear(), "Vusion"].join(" ")}/>
        </footer>
    )
};

export default Component;

export { Component as Footer };
