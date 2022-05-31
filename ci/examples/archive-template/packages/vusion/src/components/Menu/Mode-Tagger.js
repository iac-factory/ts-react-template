import { Tag } from "@carbon/react";
import React from "react";

import Styles from "./SCSS/Mode.module.scss";

import { default as Modal } from "./../Version";

const Mode = () => {
    const display = (process.env["NODE_ENV"] !== "production");

    return (display === true)
        ? (
            <div className={ Styles.tag }>
                <span>
                    {
                        (process.env["NODE_ENV"] !== "production")
                            ? (<Tag type={ "green" }>Development</Tag>)
                            : (<Tag>Staging</Tag>)
                    }
                </span>
            </div>
        ) : (
            <></>
        );
};

export default Mode;
