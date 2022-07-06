import React from "react";

import * as Icons from "./icons";

import CXS from "classnames/bind";

const CX = CXS.bind( styles );

import styles from "./index.module.scss";

export const All = ( properties: Component.header ) => {
    const classes = CX( {
        [ styles.checkbox ]: true
    }, properties.className );

    const handleClick = () => {
        properties.handleCheckAll( !properties.isAllChecked );
    };

    return (
        <td>
            <div className={ classes } onClick={ handleClick }>
                <input type={ "checkbox" } className={ styles.hide } checked={ properties.isAllChecked } onChange={ ( event ) => {
                    event.target.checked = !properties.isAllChecked;
                } }/>
                {
                    ( properties.isAllChecked ) ? ( <Icons.Checked.Checkbox/> ) : ( <Icons.Checkbox/> )
                }
            </div>
        </td>
    );
};

export const Informational = ( properties: Component.button ) => {
    const classes = CX( {
        [ styles.checkbox ]: true
    }, properties.className );

    const handleClick = () => {
        properties.handleActive();
    };

    return (
        <td>
            <div className={ classes } onClick={ handleClick }>
                <input type={ "checkbox" } className={ styles.hide } checked={ properties.isActive } onChange={ ( event ) => {
                    event.target.checked = !properties.isActive;
                } }/>
                {
                    ( properties.isActive ) ? ( <Icons.Overflow.Base/> ) : ( <Icons.Overflow.Base/> )
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

module Component {
    interface Element extends React.HTMLAttributes<HTMLDivElement> {
        /*** [Attributes] */
    }

    export type properties = JSX.IntrinsicAttributes & React.HTMLAttributes<{}> & Element & {
        id: string;
        type: string;
        name: string;

        checkbox: [ string[], React.Dispatch<React.MouseEvent<HTMLDivElement, MouseEvent>> ];
    }

    export type header = JSX.IntrinsicAttributes & React.HTMLAttributes<{}> & Element & {
        isAllChecked?: boolean;
        handleCheckAll?: React.Dispatch<boolean>;
    }

    export type button = JSX.IntrinsicAttributes & React.HTMLAttributes<{}> & Element & {
        isActive: boolean;
        handleActive?: () => void;
    }
}

export default Check;