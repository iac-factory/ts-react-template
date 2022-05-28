import React, { lazy, Suspense, useEffect } from "react";
import CX from "classnames";

import styles from "./index.module.scss";

const Help = () => {
    const state = React.useState( false );

    /// Pseudo-State Testing Pattern
    /// ... Which was much harder to figure out compared
    // to how the`useEffect` looks ...

    useEffect(() => {
        const effect = {
            interval: setInterval( () => {
                state[ 1 ]( !state[ 0 ] );
                console.log( state[0] );
            }, 1500 )
        };

        return () => void clearInterval(effect.interval);
    }, [ state ]);

    return (
        <div className={ styles.help } hidden={ state[ 0 ] }>
            Optional Help Context
        </div>
    );
};

export const Home = ( properties?: { name?: string } ) => {
    const Text = lazy( () => import("./../../components/text") );

    const name = "input";
    const id: string | undefined = undefined;

    return (
        <Suspense fallback={ <span> Loading ... </span> }>
            <Text input={ properties.name ?? "Home" }/>
            <div className={ styles.item }>
                <label className={ styles.label } title={ "label" }>
                    Label
                </label>
                <div className={ styles.outer }>
                    <div className={ styles.wrapper }>
                        <input
                            className={ styles.input }
                            title={ name[ 0 ].toUpperCase() + name.slice( 1 ) }
                            id={ ( id ) ? id : [ name, "identifier" ].join( "-" ) }
                            name={ name }
                            autoComplete={ "off" }
                            autoFocus={ true }
                            placeholder={ "Placeholder" }></input>
                    </div>
                    <Help/>
                </div>
            </div>
            <div className={ styles.item }>
                <label className={ styles.label } title={ "label" }>
                    Label
                </label>
                <div className={ styles.outer }>
                    <div className={ styles.wrapper }>
                        <input
                            className={ styles.input }
                            title={ name[ 0 ].toUpperCase() + name.slice( 1 ) }
                            id={ ( id ) ? id : [ name, "identifier" ].join( "-" ) }
                            name={ name }
                            autoComplete={ "off" }
                            autoFocus={ true }
                            placeholder={ "Placeholder" }>
                        </input>
                    </div>
                    <Help/>
                </div>
            </div>

        </Suspense>
    );
};

export default Home;