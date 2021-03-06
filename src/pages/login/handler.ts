import { Extractor } from "./extractor";

import type { Event } from "./form";
import type { Session } from "./provider";

/***
 * Login Form Submit Event Handler
 * ---
 *
 * Upon a successful login event, the client's
 * sessionStorage + localStorage are injected
 * with a JWT-related key-value pair, followed with
 * a redirect to the user's original, intended
 * page.
 *
 * @param {React.FormEvent<HTMLFormElement>} event
 * @param {Authorization.Session} session
 *
 * @constructor
 */
export const Handler = async ( event: Event, session: Session ) => {
    event.preventDefault();

    const data = Extractor( event.currentTarget.elements );

    const username = data.username;

    const input = new URLSearchParams();

    input.set( "username", data.username );
    input.set( "password", data.password );

    const clear = () => {
        console.debug( "[Debug] Authorization Handler - Clearing Storage Authorization Context(s)" );

        window.sessionStorage.clear();
        window.localStorage.clear();
    };

    await fetch( process.env[ "REACT_APP_API_ENDPOINT" ] + "/authorization/jwt", {
        method: "POST",
        body: input
    } ).then( async ( response ) => {
        const status = response.status;
        const value = await response.text();

        if ( status !== 200 ) {
            const error = new Error( "Authorization-Failure-Exception" );
            error.name = "Authorization-Failure-Exception";
        }

        ( status === 200 ) && sessionStorage.setItem( process.env[ "REACT_APP_SESSION_STORAGE_JWT_KEY" ], value );
        ( status === 200 ) && window.localStorage.setItem( process.env[ "REACT_APP_LOCAL_STORAGE_JWT_KEY" ], value ); //, (exception, value) => {

        try {
            session.authorization.login( username, { status, response: value }, () => {
                session.navigate( session.location.state.from ?? "/", { replace: false } );
            } );
        } catch ( exception ) {
            console.debug( "[Debug] Exception Caught in Authorization Handler. See the following output." );
            console.debug( "[Debug] Authorization Handler Exception" + ":", exception );
            session.authorization.login( username, { status, response: value }, () => {
                session.navigate( "/", { replace: false } );
            } );
        }
    } ).catch( ( exception ) => {
        if ( exception instanceof TypeError ) {
            console.warn( "[Warning] Caught Network-Error - The Backend API is Down, or the Supporting System(s) are Unresolvable" );

            clear();
        } else if ( exception.name === "Authorization-Failure-Exception" ) {
            console.warn( "Failed Authorization Attempt" );
            clear();
        } else {
            console.warn( "[Warning] Unknown, Uncaught Exception" );
            console.warn( exception );

            clear();
        }
    } );
};

export default Handler;