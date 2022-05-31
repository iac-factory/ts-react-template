import { default as Template } from "./../Module.js";

import PropTypes from "prop-types";

import { default as Page } from "./Page.js";

import Styles from "./SCSS/Index.module.scss";

const Component = ({ timeout, description }) => {
    return (
        <Template Page={ Page } description={ description } timeout={ timeout } className={ Styles.component }/>
    );
};

Component.defaultProps = {
    timeout: 1250
};

Component.propTypes = {
    /**
     * Forced Delay during Transition
     */

    timeout: PropTypes.number.isRequired,

    /***
     * Loading Screen Context
     */

    description: PropTypes.string.isRequired
};

export default Component;