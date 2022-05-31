import React from "react";

import Styles from "./../SCSS/Skeleton.module.scss";

import Card from "../Card";

import { SkeletonText } from "../../Skeleton-Text";

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
            <br/>
            <br/>
            <div className={ Styles.wrapper }>
                <SkeletonText width={ lg }/>
                <br/>
                <SkeletonText width={ sm }/>
            </div>
        </Card>
    );
}

export { Skeleton };

export default { Skeleton };