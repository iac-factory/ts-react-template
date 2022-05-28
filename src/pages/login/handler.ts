import { Extractor } from ".";

import type { Event } from ".";
import type { Session } from ".";

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
        void fetch( process.env[ "REACT_APP_API_ENDPOINT" ] + "/login", {
            method: "POST",
            body: input
        } ).then( async ( response ) => {
            const status = response.status;
            const value = await response.text();

            ( status === 200 ) && sessionStorage.setItem( "JWT", value );
            ( status === 200 ) && localStorage.setItem( "IO.IaC-Factory.JWT", value );

            session.authorization.login( username, () => {
                session.navigate( session.location.state.from ?? "/", { replace: true } );
            } );
        } );
    } catch ( exception ) {
        console.warn( exception );
    }
};

export default Handler;