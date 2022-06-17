import React from "react";
import { Loading, Defaults } from ".";

import Spinner from "react-spinkit";

export module User {
    /***
     *  Optional Usage for Dataset Name-IDs
     *  ---
     *
     *  The following Constant Helps avoid Magic Constants from Floating around in code
     *
     *  @example <br/> Component Usage
     *  const dataset = { [ [ "data", User.Dataset ].join( "-" ) ]: crypto.randomUUID() };
     *  return (
     *      <input type={"checkbox"} { ... dataset }/>
     *  );
     *
     *  @example <br/> Form Usage
     *  const { dataset: { [ User.Dataset ]: user } } = document.getElementById( target );
     *  */
    export const Dataset = "user" as const;
    export const Submit = async ( event: React.FormEvent<HTMLFormElement>, loading?: React.Dispatch<boolean> ) => {
        event.preventDefault();

        (loading) && loading( true );

        const form: HTMLFormElement = document.getElementById( "form" ) as HTMLFormElement;

        const valid = form.checkValidity();
        const checkboxes = Object.entries( form.elements ).map( ( entry, index ) => {
            const [ item, element ] = entry;

            if ( ( element as HTMLInputElement ).type === "checkbox" ) {
                const value = ( element as HTMLInputElement ).checked;

                return {
                    identifier: element.id,
                    value
                };
            }
            return { value: null };
        } ).filter( ( element ) => element.value );

        const targets = new Set( checkboxes.map( ( element ) => element.identifier ) );

        const users = [];
        for await ( const target of targets ) {
            const { dataset: { [ User.Dataset ]: user } } = document.getElementById( target );

            /// Database Query
            /// ...
            console.log( "[Debug] User Form Handler", user );

            users.push( await User.API( user ) );
        }

        (loading) && loading( false );
    };

    export const API = ( id: string ) => {
        return new Promise( resolve =>
            setTimeout( () => {
                resolve( id );
            }, 2000 )
        );
    };

    export const Loader = ( { loading } ) => {
        return ( loading ) ? (
                <div style={
                    {
                        display: "flex"
                    }
                }>
                    <Spinner name="pacman" fadeIn="none" color="yellow" style={ {
                        marginTop: "auto",
                        marginBottom: "auto",
                        marginLeft: "auto",
                        marginRight: "auto"
                    } }/>
                </div>
        ) : null;
    };

    export const Provider = ( {

                                  loading
                              } ) => {
        return (
            <Loading.Provider value={ { ...Defaults.Loading, ...{ loading } } }>
                <Loading.Consumer>
                    { ( {
                            show,
                            hide,
                            loading,
                            message
                        } ) => {
                        return (
                            <React.Fragment>
                                <Loader loading={ loading } { ...{
                                    show,
                                    hide
                                } } />
                            </React.Fragment>
                        );
                    } }
                </Loading.Consumer>
            </Loading.Provider>
        );
    };
}