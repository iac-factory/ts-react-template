import cx from "classnames";
import PropTypes from "prop-types";

import React, { useContext, useEffect } from "react";

import { usePrefix } from "./../../utilities/hooks/usePrefix.js";

const SubgridContext = React.createContext(false);

function Grid({
                  as: BaseComponent = "div",
                  condensed = false,
                  narrow = false,
                  fullWidth = false,
                  columns = 16,
                  className: containerClassName,
                  children,
                  ... rest
              }) {
    const prefix = usePrefix();

    const isSubgrid = useContext(SubgridContext);

    const cssGridClassNames = {
        [`${ prefix }--css-grid`]: !isSubgrid,
        [`${ prefix }--css-grid-${ columns }`]: !isSubgrid && columns !== 16,
        [`${ prefix }--css-grid-condensed`]: condensed,
        [`${ prefix }--css-grid-narrow`]: narrow,
        [`${ prefix }--css-grid-full-width`]: fullWidth,
        [`${ prefix }--subgrid`]: isSubgrid,
        [`${ prefix }--col-span-${ columns }`]:
        (isSubgrid && columns !== 16) || columns !== 16
    };

    const flexGridClassNames = {
        [`${ prefix }--grid`]: true,
        [`${ prefix }--grid-condensed`]: condensed,
        [`${ prefix }--grid-narrow`]: narrow,
        [`${ prefix }--grid-full-width`]: fullWidth
    };

    const className = cx(containerClassName, cssGridClassNames);

    return (
        <SubgridContext.Provider value={ true }>
            <BaseComponent className={ className } { ... rest }>
                { children }
            </BaseComponent>
        </SubgridContext.Provider>
    );
}

Grid.propTypes = {
    /**
     * Provide a custom element to render instead of the default <div>
     */
    as: PropTypes.oneOfType([ PropTypes.string, PropTypes.elementType ]),

    /**
     * Pass in content that will be rendered within the `Grid`
     */
    children: PropTypes.node,

    /**
     * Specify a custom className to be applied to the `Grid`
     */
    className: PropTypes.string,

    /**
     * Specify how many columns wide the Grid should span
     */
    columns: PropTypes.number,

    /**
     * Collapse the gutter to 1px. Useful for fluid layouts.
     * Rows have 1px of margin between them to match gutter.
     */
    condensed: PropTypes.bool,

    /**
     * Remove the default max width that the grid has set
     */
    fullWidth: PropTypes.bool,

    /**
     * Container hangs 16px into the gutter. Useful for
     * typographic alignment with and without containers.
     */
    narrow: PropTypes.bool
};

export default Grid;