import React, { useState, useEffect } from "react";

import { Outlet } from "react-router-dom";

import { Notification } from "../components/notification";

import { Text } from "../components/text";

import { Awaitable } from "../utilities/awaitable";

/*** The Callable Instance of a Stateful Initializer */
type Dispatch<Generic> = ( $: Generic ) => void;

/*** The Running Callable Instance of the Stateful Initializer */
type Mutation<State> = State | ( ( $: State ) => State );

type Binary = Mutation<boolean>;
type Intrinsic = Mutation<object | false | null>;
type Nullable = Mutation<Intrinsic>;

type Loadable = [ Binary, Dispatch<Binary> ];
type Stateful = [ Intrinsic, Dispatch<Intrinsic> ];
type Throwable = [ Nullable, Dispatch<Nullable> ];

const Health = process.env["REACT_APP_API_ENDPOINT"] + "/utility/health";

const URL = process.env["REACT_APP_API_ENDPOINT"] + [ "/utility/awaitable?duration", process.env["REACT_APP_SIMULATED_AWAIT_DURATION"] ].join( "=" );

interface Properties {
    children?: JSX.Element | JSX.Element[];
}

/**
 * Exportable Page Template Component (and Wrapper)
 *
 * @return {JSX.Element}
 * @constructor
 */

export const Page = ( properties: Properties ) => {
    const Data: Stateful = useState( null );
    const Throw: Throwable = useState( false );
    const Loading: Loadable = useState( true );

    const $ = useState( true );

    ( $[0] ) && ( async () => {
        window.focus();
        document.body.focus();

        /// await fetch( Health ).catch( ( _ ) => {
        ///     console.warn( "[Warning] (Health-Check)", "Failure Resolving" + " " + Health );
        /// } ).then( async ( _ ) => {
        ///     ( $[0] ) && Loading[1]( true );
        /// } ).finally( async () => {
        ///     $[1]( false );
        /// } );

        await Awaitable(500, JSON.stringify({Status: "Healthy"})).then(($) => {
            ($[0]) && Loading[1](true);
        }).then(async () => {
            await Awaitable(1000).then(() => $[1](false));
        });

        /// Handler => Initial Application Load
    } )();

    useEffect( () => {
        console.debug( "[Debug] (Page-Loading-Wrapper)", "Initializing Page + Data." );

        const $ = async () => {
            try {
                // const $ = await fetch( URL ).then( async ( $ ) => {
                //     return await $.json();
                // } );

                const $ = await Awaitable(750, JSON.stringify({Status: "Healthy"})).then(async ($) => {
                    return await Awaitable(1250).then(() => $[1](false));
                });

                Data[1]( $ );

                /// ?? Verification ||

                Throw[1]( false );
            } catch ( error ) {
                /// const Expression = /((.*)+(:) + ?(.*))/gm;
                ///
                /// const $ = new Error( error );
                ///
                /// const Partials = Expression.exec( $?.message );
                ///
                /// const Message = Partials[Partials.length - 1] || error;
                /// const Type = Partials[Partials.length - 3] || error;
                ///
                /// if ( Type === "TypeError" ) {
                ///     Throw[1]( {
                ///         Type: "API-Error", Message: "API Server Unreachable"
                ///     } );
                /// } else {
                ///     Throw[1]( {
                ///         Type, Message
                ///     } );
                /// }

                const noop = true;

                // @ts-ignore
                console.warn( "[Warning] (Page-API-Waiter)", /* Type === "TypeError" */ (noop !== false ) ? "API-Connection-Error" : error );

                Data[1]( null );
            } finally {
                Loading[1](false);
            }
        };

        console.debug( "[Debug] (Page-Loading-Wrapper)", "Successfully Initialized Callable(s)." );

        $().finally( () => {
            console.debug( "[Debug] (Page-Loading-Wrapper)", "All Wrapper Promise(s) have Settled." );
        } );
    }, [ Location ] );

    const Loader = () => ( Loading[0] ) ? ( <Text input={ "Loading ..." }/> ) : null;
    const Content = () => ( !Loading[0] && !Throw[0] ) ? ( <Outlet/> ) : null;
    const Trace = () => ( Throw[0] && !Loading[0] ) ? (
        <Notification content={ Throw[0]["Message"] } duration={ null } theme={ "dark" }/>
    ) : null;

    return ( Loading[0] === true ) ? ( <Loader/> ) : ( ( Throw[0] ) ? ( <Trace/> ) : ( <Content/> ) );
};

export default Page;
