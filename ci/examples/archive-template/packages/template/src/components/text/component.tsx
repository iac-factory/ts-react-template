import "./index.scss";

import Properties from "prop-types";

import Styles from "./index.module.scss";

const Component = ( { input, theme, center } ) => {
    const Theme = ( theme === "light" ) ? Styles.light : Styles.dark;

    return (
        <span className={ [ Styles.component, Theme, ( center ) && Styles.center || null ].join(" ") }>
            {
                input
            }
        </span>
    )
};

Component.propTypes = {
    /*** Component Display Text */
    input: Properties.string.isRequired,
    /*** Component Display Text Color (Theme) */
    theme: Properties.oneOf([ "dark", "light" ]),
    /*** Component Display Text Alignment */
    center: Properties.bool
};

Component.defaultProps = {
    input: "...",
    theme: "dark",
    center: false
};

export default Component;

export { Component };