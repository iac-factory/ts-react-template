import "./index.scss";

import Styles from "./index.module.scss";

import { Text } from "..";

export const Footer = () => {
    return (
        <footer className={ Styles.component }>
            <Text center={ true } input={ [ "©", new Date().getFullYear(), "Vusion" ].join( " " ) }/>
        </footer>
    );
};

export default Footer;
