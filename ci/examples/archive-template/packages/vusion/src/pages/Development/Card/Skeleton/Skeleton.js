import PropTypes from "prop-types";
import React from "react";

import * as Styles from "./../SCSS/Skeleton.module.scss";

import Card from "../Card";

import SkeletonText from "../../Skeleton-Text";

function Skeleton({ className, ... other }) {
    const widths = {
        sm: "25%",
        md: "50%",
        lg: "75%"
    };

    const { sm, md, lg } = widths;

    return (
        <Card>
            <br/>
            <SkeletonText width={ sm }/>
            <SkeletonText width={ md } heading/>
            <SkeletonText width={ md }/>

            <div className={ Styles.wrapper }>
                <SkeletonText width={ lg }/>
                <SkeletonText width={ sm }/>
            </div>
        </Card>
    );
}

Skeleton.propTypes = {
    /** Extra classes to add. */
    className: PropTypes.string
};

Skeleton.defaultProps = {
    className: null
};

export default Skeleton;
