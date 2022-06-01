import React, { useState, useEffect, Suspense } from "react";

import { Outlet } from "..";

import { Text } from "..";

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

const URL = process.env[ "REACT_APP_API_ENDPOINT" ] + [ "/utility/awaitable?duration", process.env[ "REACT_APP_SIMULATED_AWAIT_DURATION" ] ].join( "=" );

/**
 * Exportable Page Template Component (and Wrapper)
 *
 * @return {JSX.Element}
 * @constructor
 */

export const Proxy = ( children? ) => {
    const Data: Stateful = useState( null );
    const Throw: Throwable = useState( false );
    const Loading: Loadable = useState( true );

    useEffect( () => {
        console.debug( "[Debug] (Page-Loading-Wrapper)", "Initializing Page + Data." );

        const Health = async () => {
            try {
                const request = await fetch( URL ).then( async ( response ) => {
                    return response.json();
                } ).catch( ( error ) => {
                    Throw[ 1 ]( error );

                    throw error;
                } );

                Data[ 1 ]( request );

                /// ?? Verification ||

                Throw[ 1 ]( false );
            } catch ( error ) {
                console.warn("[Warning] Caught Error Exception", error);

                const Expression = /((.*)+(:) + ?(.*))/gm;

                const $ = new Error( error );

                const Partials = Expression.exec( $?.message );

                const Message = Partials[ Partials.length - 1 ] || error;
                const Type = Partials[ Partials.length - 3 ] || error;

                if ( Type === "TypeError" ) {
                    Throw[ 1 ]( {
                        Type: "API-Error",
                        Message: "API Server Unreachable"
                    } );
                } else {
                    Throw[ 1 ]( {
                        Type,
                        Message
                    } );
                }

                console.warn( "[Warning] (Page-API-Waiter)", Type === "TypeError" ? "API-Connection-Error" : error );

                Data[ 1 ]( null );
            } finally {
                Loading[ 1 ]( false );
            }
        };

        console.debug( "[Debug] (Page-Loading-Wrapper)", "Successfully Initialized Callable(s)." );

        return () => {
            return void ( async () => Health().catch( ( error ) => {
                console.warn("[Warning] Caught Error Exception During Closure", error);
            } ) )();
        };
    }, [] );

    const Page = () => {
        const Awaitable = () => ( Loading[ 0 ] ) ? ( /* <Text input={ "Loading ..." }/> */ null ) : null;
        const Content = () => ( !Loading[ 0 ] && !Throw[ 0 ] ) ? ( <Outlet/> ) : null;
        const Trace = () => ( Throw[ 0 ] && !Loading[ 0 ] ) ? ( <Text input={ "[Error]" + " " + Throw[ 0 ] }/> ) : null;

        return ( Loading[ 0 ] === true ) ? ( <Awaitable/> ) : ( ( Throw[ 0 ] ) ? ( <Trace/> ) : ( <Content/> ) );
    };

    return (
        <Suspense fallback={(null)}>
            <Page/>
        </Suspense>
    )

    // return (
    //     <Suspense fallback={( null )}>
    //         <Outlet/>
    //     </Suspense>
    // );
};

export default Proxy;