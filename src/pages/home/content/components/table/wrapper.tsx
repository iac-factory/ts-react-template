import React from "react";

import styles from "./index.module.scss";

const CX = CXS.bind( styles );

function Container( { children } ) {
    return (
        <div className={ styles.container }>
            { children }
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

            <div className={ classes }>
                {
                    ( count.value > 0 ) ? ( count.value )
                        : (
                            <data style={ { opacity: 0 } }>
                                {
                                    count.value
                                }
                            </data>
                        )
                }
            </div>
        </>
    );
};

export default Tabular;
export const Tabular = ( properties?: Component.properties ) => {
    const { toolbar } = properties;
    const { children } = properties;
    const { width } = properties;

    return (
        <Container>
            <table { ...{ ...properties, ...{ toolbar: ( toolbar ) ? "true" : "false" } } } width={ width ?? "auto" }>
                <caption className={ styles.caption }>
                    <Toolbar active={ toolbar } caption={ "Alien Football Stars" }/>
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
