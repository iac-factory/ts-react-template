import styles from "./index.module.scss";
export module Component {
    export const Footer = () => {
        return (
            <footer className={ styles.component }>
                <Text center={ true } input={ [ "©", new Date().getFullYear(), "Vusion" ].join( " " ) }/>
            </footer>
        );
    };
}

import { Text } from "..";

export default Footer;
export const { Footer } = Component;