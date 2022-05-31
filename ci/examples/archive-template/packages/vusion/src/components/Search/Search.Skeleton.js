import PropTypes from "prop-types";
import React from "react";
import cx from "classnames";
import { settings } from "carbon-components";

const { prefix } = settings;

const SearchSkeleton = ({ small, className, ... rest }) => {
    const searchClasses = cx(className, {
        [`${ prefix }--skeleton`]: true,
        [`${ prefix }--search--xl`]: !small,
        [`${ prefix }--search--sm`]: small
    });

    return (
        <div className={ searchClasses } { ... rest }>
            <span className={ `${ prefix }--label` }/>
            <div className={ `${ prefix }--search-input` }/>
        </div>
    );
};

SearchSkeleton.propTypes = {
    /**
     * Specify an optional className to add.
     */
    className: PropTypes.string,

    /**
     * Specify whether the Search should be a small variant
     */
    small: PropTypes.bool
};

SearchSkeleton.defaultProps = {
    small: false
};

export default SearchSkeleton;