import { Router } from "..";

import styles from "./index.module.scss";
export module Component {
    export const Global = ( { reload = false, path = "/", prefix, title } ) => {
        return (
            <Router.Link to={ path } className={ styles.global } reloadDocument={ reload }>
            <span>
                <span className={ styles.prefix }>
                    { prefix }
                </span>
                { title }
            </span>
            </Router.Link>
        );
    };
}

export default Global;
export const { Global } = Component;
