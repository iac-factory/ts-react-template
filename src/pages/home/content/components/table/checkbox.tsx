import styles from "./index.module.scss";

import * as Icons from "./icons";

import CXS from "classnames/bind";

const CX = CXS.bind( styles );

export const Check = ( properties: Component.properties ) => {
    const classes = CX( {
        [ styles.checkbox ]: true
    }, properties.className );

    const { toolbar } = properties;

    const check = React.useState( properties.initial ?? false );

    const handleClick = () => {
        check[ 1 ]( !check[ 0 ] );
        toolbar[1](check[0]);
    };

    return (
        <td>
            <div className={ classes } onClick={ handleClick } { ...properties }>
                {
                    ( check[ 0 ] ) ? ( <Icons.Checked.Checkbox/> ) : ( <Icons.Checkbox/> )
                }
            </div>
        </td>
    );
};

import type CSS from "csstype";
import React from "react";

module Component {
    type Attribution = CSS.HtmlAttributes;

    interface Element extends React.HTMLAttributes<HTMLDivElement> {
        /*** [Attributes] */
    }

    export type properties = JSX.IntrinsicAttributes & React.HTMLAttributes<{}> & Element & {
        initial?: boolean;
        minimal?: boolean;
        toolbar: [{ count: number; }, React.Dispatch<boolean>];
    }
}

export default Check;