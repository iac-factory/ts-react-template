import cx from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { usePrefix } from "../../utilities/hooks/usePrefix.js";

function SideNavDivider({ className }) {
    const prefix = usePrefix();
    const classNames = cx(`${ prefix }--side-nav__divider`, className);
    return <li role="separator" className={ classNames }/>;
}

SideNavDivider.propTypes = {
    /**
     * Provide an optional class to be applied to the containing node
     */
    className: PropTypes.string
};

export default SideNavDivider;