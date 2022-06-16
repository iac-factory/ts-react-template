import React from "react";

import { Tag } from "..";

import styles from "./index.module.scss";

export function Modal() {
    const [ view, setView ] = React.useState( false );

    function show() {
        setView( true );
    }

    function close() {
        setView( false );
    }

    return (
        <>
            <div className={ styles.modal } style={ { top: view && "5px" } }>
                <p className={ styles.header }>This is a Modal Header</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis, auctor consequat urna. Morbi a bibendum metus. </p>
                <div className={ styles.box }>
                    <button onClick={ close }>Close</button>
                </div>
            </div>
            <Tag title={ "Test" } handler={ () => show() }></Tag>
        </>
    );
}

export default Modal;