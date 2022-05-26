import { Router } from "../..";
import { Strings } from "../..";

import styles from "./index.module.scss";
export module Component {
    export const Item = ( input: Input ) => {
        const Path = ( input.paths ) ? Strings.Formalize(input.title, (typeof input.paths !== "string") ? input.paths.join() : input.paths) : Strings.Formalize(input.title);

        return (
            <Router.Active reloadDocument={ input.reload ?? false } to={ (input?.overwrite ) ? input.overwrite : Path } className={ styles.item } style={({ isActive }) =>
                (isActive) ? {
                    color: "whitesmoke"
                } : undefined
            }>
            <span>
                {
                    input.title
                }
            </span>
            </Router.Active>
        );
    };

    export interface Input {
        /*** Global Menu Item Path Prefix(es) */
        title: string;
        /*** Global Menu Item Title, Text */
        paths?: string[] | string;
        /*** Optional Path Forced Overwrite */
        overwrite?: string;

        reload?: boolean;
    }
}

export default Item;
export const { Item } = Component;
