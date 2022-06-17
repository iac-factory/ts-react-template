import styles from "./index.module.scss";

import * as Icons from "./icons";

import CXS from "classnames/bind";

const CX = CXS.bind( styles );

export const All = ( properties: Component.header ) => {
    const { identifier } = properties;

    const classes = CX( {
        [ styles.checkbox ]: true
    }, properties.className );

    const handleClick = () => {
        properties.handleCheckAll( !properties.isAllChecked );
    };

    return (
        <td id={ [ identifier, "checkbox-element" ].join( "-" ) }>
            <div className={ classes } onClick={ handleClick }>
                <input id={ [ identifier, "input" ].join( "-" ) } type={ "checkbox" } className={ styles.hide } checked={ properties.isAllChecked } onChange={ ( event ) => {
                    event.target.checked = !properties.isAllChecked;
                } }/>
                {
                    ( properties.isAllChecked ) ? ( <Icons.Checked.Checkbox/> ) : ( <Icons.Checkbox/> )
                }
            </div>
        </td>
    );
};

export const Check = ( properties: Component.properties ) => {
    const { checkbox } = properties;
    const { id } = properties;
    const { type } = properties;
    const { name } = properties;

    const classes = CX( {
        [ styles.checkbox ]: true
    }, properties.className );

    /***
     * Hijack the User's intended HTMLInputElement Click event and
     * use it to enable the SVG Icon + Reset the event's target to
     * the hidden `<input>` field.
     *
     * @param event
     */
    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();

        event.target = document.getElementById( id );

        const element = document.getElementById(id) as HTMLInputElement;

        element.checked = !element.checked;

        console.debug("[Debug] [Table] Checkbox Item(s)", checkbox[0], "\n - " + "Projected" + ":", "(+/-)" + " " + element.id);

        checkbox[1](event);

        event.persist();
    };

    return (
        <td>
            <div id={ [ id, "icon" ].join( "-" ) } className={ classes } onClick={ (event) => handleClick(event) }>
                <input id={ id } checked={checkbox[0].includes(id)} type={ type } name={ name } className={ styles.hide } onChange={(event) => {
                    const element = document.getElementById(id) as HTMLInputElement;
                    element.checked = checkbox[0].includes(id);
                }}/>
                {
                    ( checkbox[0].includes(id) ) ? ( <Icons.Checked.Checkbox/> ) : ( <Icons.Checkbox/> )
                }
            </div>
        </td>
    );
};

// export const Check = ( properties: Component.properties ) => {
//     const { identifier } = properties;
//     const { checkbox } = properties;
//
//     const classes = CX( {
//         [ styles.checkbox ]: true
//     }, properties.className );
//
//     const identifiers = {
//         input: identifier,
//         cell: [ identifier, "cell" ].join( "-" )
//     };
//
//     const { toolbar } = properties;
//
//     const handleClick = () => {
//         const checkbox = document.getElementById( identifiers.input ) as HTMLInputElement;
//
//         checkbox[ 1 ]( !checkbox[ 0 ] );
//         toolbar[ 1 ]( checkbox.checked );
//     };
//
//     const dataset = { [ [ "data", User.Dataset ].join( "-" ) ]: crypto.randomUUID() };
//
//     return (
//         <td id={ identifiers.cell }>
//             <div className={ classes } onClick={ () => checkbox[1](!checkbox[0]) } { ...{ ...properties, ...{ toolbar: ( toolbar ) ? "true" : "false" } } }>
//                 <Checkbox id={identifiers.input} type={"checkbox"} className={ styles.hide } name={identifiers.input} isChecked={checkbox[0]} handleClick={ ( event ) => {
//                     event.target.checked = !checkbox[ 0 ];
//                 } } { ... dataset }/>
//                 {
//                     ( checkbox[ 0 ] ) ? ( <Icons.Checked.Checkbox/> ) : ( <Icons.Checkbox/> )
//                 }
//             </div>
//         </td>
//     );
// };

import type CSS from "csstype";
import React from "react";

module Component {
    type Attribution = CSS.HtmlAttributes;

    interface Element extends React.HTMLAttributes<HTMLDivElement> {
        /*** [Attributes] */
    }

    export type properties = JSX.IntrinsicAttributes & React.HTMLAttributes<{}> & Element & {
        id: string;
        type: string;
        name: string;
        minimal?: boolean;
        // isChecked: boolean;
        // handleCheck: React.Dispatch<boolean>;
        checkbox: [ string[], React.Dispatch<React.MouseEvent<HTMLDivElement, MouseEvent>> ];
        // toolbar: [ { count: number; }, React.Dispatch<boolean> ];
    }

    export type header = JSX.IntrinsicAttributes & React.HTMLAttributes<{}> & Element & {
        identifier: string;
        initial?: boolean;
        minimal?: boolean;
        isAllChecked?: boolean;
        handleCheckAll?: React.Dispatch<boolean>;
        // checkbox: [ boolean, React.Dispatch<boolean> ];
        // toolbar: [ { count: number; }, React.Dispatch<boolean> ];
    }
}

export default Check;