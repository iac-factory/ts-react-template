import cx from "classnames";
import PropTypes from "prop-types";
import React from "react";

import { usePrefix } from "./../../utilities/hooks/usePrefix.js";

function Row({ as: BaseComponent = "div", condensed = false, narrow = false, className: containerClassName, children, ... rest }) {
    const prefix = usePrefix();
    const className = cx(containerClassName, {
        [`${ prefix }--row`]: true,
        [`${ prefix }--row-condensed`]: condensed,
        [`${ prefix }--row-narrow`]: narrow
    });

    return (
        <BaseComponent className={ className } { ... rest }>
            { children }
        </BaseComponent>
    );
}

Row.propTypes = {
    /**
     * Provide a custom element to render instead of the default <div>
     */
    as: PropTypes.oneOfType([ PropTypes.string, PropTypes.elementType ]),

    /**
     * Pass in content that will be rendered within the `Row`
     */
    children: PropTypes.node,

    /**
     * Specify a custom className to be applied to the `Row`
     */
    className: PropTypes.string,

    /**
     * Specify a single row as condensed.Rows that are adjacent
     * and are condensed will have 2px of margin between them to match gutter.
     */
    condensed: PropTypes.bool,

    /**
     * Specify a single row as narrow. The container will hang
     * 16px into the gutter.
     */
    narrow: PropTypes.bool
};

export default Row;