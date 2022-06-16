import React from "react";

import styles from "./index.module.scss";

const CX = CXS.bind( styles );

function Container({ children }) {
    return (
        <div className={styles.container}>
            { children }
         </div>
    );
}

function Transitionable() {
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

const Toolbar = ( {
                      active,
                      caption
                  } ) => {
    const classes = CX( {
        [ styles.toolbar ]: true
    }, ( active[ 0 ].count > 0 ) ? styles.active : styles.hidden );

    const count = React.useDeferredValue( { value: active[ 0 ].count } );

    React.useEffect( () => {
        count.value = active[ 0 ].count;
    }, [ active ] );
    return (
        <>
            <span className={ ( styles.active ) }>{ caption }</span>

            { ( active[ 0 ].count === 0 ) ? ( <br/> ) : ( <></> ) }

            <div className={ classes }>
                {
                    ( count.value > 0 ) ? count.value
                        : <data style={ { opacity: 0 } }>
                            {
                                count.value
                            }
                        </data>
                }
            </div>
        </>
    );
};

export default Wrapper;
export const Wrapper = ( properties?: Component.properties ) => {
    const { toolbar } = properties;
    const { children } = properties;
    const { width } = properties;

    return (
        <Container>
            <table { ...{ ... properties, ... { toolbar: (toolbar) ? "true" : "false" } } } width={ width ?? "auto" }>
                <caption className={ styles.caption }>
                    <Toolbar active={ toolbar } caption={ "Alien Football Stars" }/>
                    <Transitionable/>
                </caption>
                {
                    ( children ) ? children : null
                }
            </table>
        </Container>
    );
};

import type CSS from "csstype";
import CXS from "classnames/bind";

module Component {
    type Attribution = CSS.HtmlAttributes;

    interface Element extends React.HTMLAttributes<HTMLTableElement> {
        /*** [Properties] */
    }

    export type properties = JSX.IntrinsicAttributes & React.HTMLAttributes<{}> & Element & {
        small?: boolean;
        width?: number;
        toolbar: [ { count: number; }, React.Dispatch<boolean> ];
    }
}
