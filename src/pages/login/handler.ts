import { Extractor } from "./extractor";

import type { Event } from "./form";
import type { Session } from "./provider";

import { Local, useLocalStorage } from "../../library";

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
export const Handler = ( event: Event, session: Session ) => {
    event.preventDefault();

    const data = Extractor( event.currentTarget.elements );

    const username = data.username;

    const input = new URLSearchParams();

    input.set( "username", data.username );
    input.set( "password", data.password );

    try {
        void fetch( process.env[ "REACT_APP_API_ENDPOINT" ] + "/authorization/jwt", {
            method: "POST",
            body: input
        } ).then( async ( response ) => {
            const status = response.status;
            const value = await response.text();

            ( status === 200 ) && sessionStorage.setItem( process.env[ "REACT_APP_SESSION_STORAGE_JWT_KEY" ], value );
            ( status === 200 ) && await Local.setItem(process.env["REACT_APP_LOCAL_STORAGE_JWT_KEY"], value, (exception, value) => {
                if (exception) throw exception;

                console.log("Local Storage JWT Update", { value });
            });

            try {
                session.authorization.login( username, () => {
                    session.navigate( session.location.state.from ?? "/", { replace: true } );
                } );
            } catch ( exception ) {
                console.debug( "[Debug] Exception Caught in Authorization Handler", exception );
                session.authorization.login( username, () => {
                    session.navigate( "/", { replace: false } );
                } );
            }
        } );
    } catch ( exception ) {
        console.warn( exception );
    }
};

export default Handler;