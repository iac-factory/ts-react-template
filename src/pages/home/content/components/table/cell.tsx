import styles from "./index.module.scss";

import CXS from "classnames/bind";

const CX = CXS.bind( styles );

const UUID = () => {
    return {
        identifier: window.crypto.randomUUID()
    };
};

export const Cell = ( properties: Component.properties ) => {
    const { children } = properties ?? null;
    const { icon } = properties ?? null;
    const { span } = properties ?? null;

    const classes = CX( {}, properties.className );

    const content = React.useDeferredValue( children );

    return (
        <td className={ classes } rowSpan={ span ?? 1 }>
            <div className={ styles.cell }>
                <div style={ { float: "left", display: "flex" } }>
                    {
                        ( icon ) ? icon : null
                    }
                    <span className={styles.text}>
                        {
                            ( children ) ? content : null
                        }
                    </span>
                </div>
                <div style={ { float: "right" } } className={styles.text}>
                    { "Test" }
                </div>
            </div>
        </td>
    );
};

import type CSS from "csstype";
import React from "react";

module Component {
    type Attribution = CSS.HtmlAttributes;

    interface Element extends React.HTMLAttributes<HTMLTableCellElement> {
        /*** [Attributes] */
    }

    export type properties = JSX.IntrinsicAttributes & React.HTMLAttributes<{}> & Element & {
        /*** [Properties] */
        icon?: JSX.Element
        content?: string
        span?: number;
    }
}

export default Cell;