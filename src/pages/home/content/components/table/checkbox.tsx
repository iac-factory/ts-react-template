import styles from "./index.module.scss";

import * as Icons from "./icons";

import CXS from "classnames/bind";

const CX = CXS.bind( styles );

import { User } from "./form-handle";

export const Check = ( properties: Component.properties ) => {
    const { identifier } = properties;

    const classes = CX( {
        [ styles.checkbox ]: true
    }, properties.className );

    const identifiers = {
        input: identifier,
        cell: [ identifier, "cell" ].join( "-" )
    };

    const { toolbar } = properties;

    const check = React.useState( properties.initial ?? false );

    const handleClick = () => {
        const checkbox = document.getElementById( identifiers.input ) as HTMLInputElement;

        check[ 1 ]( !check[ 0 ] );
        toolbar[ 1 ]( checkbox.checked );
    };

    const dataset = { [ [ "data", User.Dataset ].join( "-" ) ]: crypto.randomUUID() };

    return (
        <td id={ identifiers.cell }>
            <div className={ classes } onClick={ handleClick } { ...{ ...properties, ...{ toolbar: ( toolbar ) ? "true" : "false" } } }>
                <input { ... dataset } id={ identifiers.input } type={ "checkbox" } className={ styles.hide } checked={ check[ 0 ] } onChange={ ( event ) => {
                    event.target.checked = !check[ 0 ];
                } }/>
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
        identifier: string;
        initial?: boolean;
        minimal?: boolean;
        toolbar: [ { count: number; }, React.Dispatch<boolean> ];
    }
}

export default Check;