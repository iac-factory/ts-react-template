import "./index.scss";

import Styles from "./index.module.scss";

import { Link } from "react-router-dom";

export const Global = ( { reload = false, path = "/", prefix, title } ) => {
    return (
        <Link to={ path } className={ Styles.global } reloadDocument={ reload }>
            <span>
                <span className={ Styles.prefix }>
                    {
                        prefix
                    }
                </span>
                {
                    title
                }
            </span>
        </Link>
    );
};

export default Global;
