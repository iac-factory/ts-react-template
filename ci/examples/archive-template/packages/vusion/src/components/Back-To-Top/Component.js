import PropTypes from "prop-types";

import React from "react";

import { UpToTop } from "@carbon/icons-react";

import * as Styles from "./SCSS/Index.module.scss";

import { button } from "./SCSS/Index.module.scss";

const Defaults = {
    /***
     * Icon JSX Element XOR null
     */
    Icon: () => (<UpToTop/>),

    /***
     * Title Pop-Over Content (String)
     */
    Title: "Page Information",

    /***
     * Text Assistive Reading Content (String)
     */
    ARIA: "Page Information Button",

    Styles: {
        Styles: Styles,
        Target: button
    }
}

const Component = ({Properties = Defaults, Title}) => (
    <button
        onClick={ () => window.scrollTo({ top: 0, left: 0, behavior: "smooth" }) }
        className={Properties.Styles.Target}
        data-tooltip-position={"left"}
        data-tooltip-title={Title ? Title : Properties.Title}
        type={"button"}
        aria-label={Properties.ARIA}
        children={
            (<Properties.Icon/>)
        }
    />
);

Component.propTypes = {
    /***
     * Icon JSX Element XOR null
     */
    Icon: PropTypes.object,

    /***
     * Title Pop-Over Content (String)
     */
    Title: PropTypes.any,

    /***
     * Text Assistive Reading Content (String)
     */
    ARIA: PropTypes.any
}

export default Component;

export const Settings = Defaults;