import PropTypes from "prop-types";

import React, {
    useEffect, useState
} from "react";

import {
    InlineLoading
} from "@carbon/react";

/***
 *
 * @param description {String} Target Component Description
 *
 * @return {JSX.Element}
 * @constructor
 */

export const Loader = ({ description }) => (
    <InlineLoading
        description={ description }
        iconDescription={ "Loading Indicator" }
    />
);

Loader.defaultProps = {
    description: " "
};

Loader.propTypes = {
    /*** @type {String} Loader's Target Component Description */
    description: PropTypes.string.isRequired
};

/***
 *
 * @param children {JSX.Element}
 * @param description {String}
 * @param timeout {Number}
 *
 * @returns {JSX.Element}
 *
 * @constructor
 *
 */

const Component = ({ children, description, timeout }) => {
    const $ = () => children;

    if ( timeout === null ) return (<Loader description={ " " }/>);

    const [ awaiting, setAwaiting ] = useState(null);

    useEffect(() => {
        let $ = setTimeout(() => setAwaiting(false), timeout);

        return () => {
            clearTimeout($);
        };

        /***
         * useEffect will run only once with an empty [];
         * if there are value(s) associated inside the dependencies
         * array, then clearTimeout will run every time any attribute
         * or value changes.
         */
    }, [ awaiting ]);

    return (awaiting === false) ? (<$/>) : (<Loader description={ description }/>);
};

Component.propTypes = {
    /***
     * Target render component that replaces the loading component upon timout
     */

    children: PropTypes.element,

    /***
     * String describing the waiting event; description is displayed as text
     * inline to the loading component
     */

    description: PropTypes.string,

    /***
     * Total timeout (ms) before children component renders and replaces the loading
     * component
     */

    timeout: PropTypes.number
};

export default Component;

/***
 *
 * Authorization Lazy Page Loader
 *
 * @param children {JSX.Element}
 * @param description {String}
 * @param timeout {Number}
 *
 * @returns {JSX.Element}
 *
 * @constructor
 *
 */

export const Validator = ({ children, description, timeout }) => {
    const $ = () => children;

    if ( timeout === null ) return (<Loader description={ " " }/>);

    const [ awaiting, setAwaiting ] = useState(null);

    useEffect(() => {
        let $ = setTimeout(() => setAwaiting(false), timeout);

        return () => clearTimeout($);

        /***
         * useEffect will run only once with an empty [];
         * if there are value(s) associated inside the dependencies
         * array, then clearTimeout will run every time any attribute
         * or value changes.
         */
    }, [ awaiting ]);

    return (awaiting === false) ? (<$/>) : (<Loader description={ description }/>);
};

Validator.defaultProps = {
    timeout: 1000,
    description: "Validating Authorized Session ..."
};

Validator.propTypes = {
    /***
     * Target render component that replaces the loading component upon timout
     *
     * @type {JSX.Element}
     * @requires {JSX.Element}
     *
     */

    children: PropTypes.element.isRequired,

    /***
     * String describing the waiting event; description is displayed as text
     * inline to the loading component
     *
     * @type {String}
     * @default "Validating Authorized Session ..."
     *
     */

    description: PropTypes.string,

    /***
     * Total timeout (ms) before children component renders and replaces the loading
     * component
     *
     * @type {Number}
     * @default 1000
     *
     */

    timeout: PropTypes.number
};
