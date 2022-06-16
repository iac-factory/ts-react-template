import React from "react";

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
        <div>
            <div className={ styles.modal } style={ { top: view && "5px" } }>
                <p className={ styles.mheader }>This is a Modal Header</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis, auctor consequat urna. Morbi a bibendum metus. </p>
                <div className={ styles.btnbox }>
                    <button onClick={ close }>Close</button>
                </div>
            </div>
            <div className={ styles.btnbox }>
                <button onClick={ show }>Show Modal</button>
            </div>
        </div>
    );
}

export default Modal;