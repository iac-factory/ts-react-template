import "./index.scss";

import Styles from "./index.module.scss";

import { NavLink } from "react-router-dom";

import { Strings } from "../imports";

interface Input {
    /*** Global Menu Item Path Prefix(es) */
    title: string;
    /*** Global Menu Item Title, Text */
    paths?: string[] | string;
    /*** Optional Path Forced Overwrite */
    overwrite?: string;

    reload?: boolean;
}

const Component = ( input: Input ) => {
    const Path = ( input.paths ) ? Strings.formalize(input.title, (typeof input.paths !== "string") ? input.paths.join() : input.paths) : Strings.formalize(input.title);

    return (
        <NavLink reloadDocument={ input.reload ?? false } to={ (input?.overwrite ) ? input.overwrite : Path } className={ Styles.item } style={({ isActive }) =>
            (isActive) ? {
                color: "whitesmoke"
            } : undefined
        }>
            <span>
                {
                    input.title
                }
            </span>
        </NavLink>
    );
};

export default Component;

export { Component as Item };
