import { default as Template } from "./Module.js";

import { default as Page } from "./Page.js";

import Styles from "./SCSS/Index.module.scss";

/***
 * Primary Module Export (Page Wrapper)
 * ------------------------------------
 * @param timeout {Number} Timeout Spinner Duration
 * @param description {String} Spinner Contextual Overlay
 *
 * @return {JSX.Element}
 *
 * @constructor
 *
 */

const Component = ({ timeout, description }) => {
    return (
        <Template Page={ Page } description={ description } timeout={ timeout } className={ Styles.component }/>
    );
};

export default Component;