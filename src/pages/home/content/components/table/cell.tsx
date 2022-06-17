import React from "react";

import CXS from "classnames/bind";

const CX = CXS.bind( styles );

import styles from "./index.module.scss";

const UUID = () => {
    return {
        identifier: window.crypto.randomUUID()
    };
};

export const Cell = ( properties: Component.properties ) => {
    const { identifier } = properties ?? UUID();

    const { children } = properties ?? null;
    const { icon } = properties ?? null;
    const { span } = properties ?? null;
    const { floater } = properties ?? null;

    const classes = CX( {}, properties.className );

    const content = React.useDeferredValue( children );

    return (
        <td className={ classes } rowSpan={ span ?? 1 } id={ identifier }>
            <div className={ styles.cell }>
                <div style={ {
                    float: "left",
                    display: "flex"
                } }>
                    {
                        ( icon ) ? icon : null
                    }
                    <span className={ styles.text }>
                        {
                            ( children ) ? content : null
                        }
                    </span>
                </div>
                {
                    ( floater ) ? (
                        <div style={ { float: "right" } } className={ styles.text }>
                            { "Test" }
                        </div>
                    ) : ( <></> )
                }
            </div>
        </td>
    );
};

module Component {
    interface Element extends React.HTMLAttributes<HTMLTableCellElement> {
        /*** [Attributes] */
    }

    export type properties = JSX.IntrinsicAttributes & React.HTMLAttributes<{}> & Element & {
        /*** [Properties] */
        icon?: JSX.Element
        content?: string
        span?: number;
        floater?: JSX.Element;

        identifier?: string;
    }
}

export default Cell;