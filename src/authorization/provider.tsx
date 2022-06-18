import type { Location, NavigateFunction } from ".";
import { Outlet, React, useLocation, useNavigate } from ".";

import { Spinner, Text } from "../library";

import { useState } from "react";

export module Authorization {
    /***
     * @example <br/> <br/> Sign-In Form Usage
     * export const Form = () => {
     *     const location = Provider.useSession();
     *     const navigate = Provider.useNavigator();
     *     const authorization = Provider.useAuthorization();
     *
     *     const session = { location, navigate, authorization };
     *
     *     return (
     *         <form id={ "login-form" } onSubmit={(event) => Handler(event, session)}>
     *             <input name={ "username" } type={ "text" } placeholder={ "username" } id={"username"}/>
     *             <input name={ "password" } type={ "password" } id={"password"}/>
     *             <input type="submit" hidden={ true }/>
     *         </form>
     *     );
     * };
     */
    export const Context = React.createContext<Context>( null! );

    /*** @see {@link Context} */
    export function useAuthorization() {
        return React.useContext( Context );
    }

    /*** @see {@link Context} */
    export function useSession() {
        return useLocation() as Location & { state: { from?: { pathname?: string } } };
    }

    /*** @see {@link Context} */
    export function useNavigator() {
        return useNavigate();
    }

    /*** @see {@link Context} */
    export const Provider = ( { children }: { children?: React.ReactNode } ) => {
        const [ user, setUser ] = React.useState<User>( null );

        const login = ( username: string, callback: ( () => void ) ) => {
            console.log( "Provider User Login Context", username );

            setUser( {
                username,
                expiration: "...",
                uid: "...",
                name: "..."
            } );

            void callback();
        };

        const logout = ( callback: ( () => void ) ) => {
            return void setTimeout( callback, 1000 * 10000 );
        };

        const attribution = {
            user,
            login,
            logout
        } as const;

        return (
            <Context.Provider value={ attribution }>
                {
                    ( children ) ? children : null
                }
            </Context.Provider>
        );
    };

    /*** @see {@link Context} */
    export const Consumer = () => {
        const loading = useState( true );

        const location = useLocation();
        const authorization = useAuthorization();
        const navigate = useNavigator();

        React.useEffect( () => {
            const jwt = window.localStorage.getItem( process.env[ "REACT_APP_LOCAL_STORAGE_JWT_KEY" ] );

            /***
             * Oddly enough, during the same session where a user may lose both context and localstorage,
             * the React.useEffect conditional can still pass. Therefore, it's required to, again, try
             * and pull from localstorage.
             */

            const update = async () => {
                if ( jwt ) {
                    const input = new URLSearchParams();

                    input.set( "jwt", jwt );

                    const validation = await fetch( process.env[ "REACT_APP_API_ENDPOINT" ] + "/authorization", {
                        method: "POST",
                        mode: "cors",
                        body: input
                    } );

                    if ( validation.status === 200 ) {
                        const data = await validation.json();

                        setTimeout( () => authorization.login( data.username as string, () => loading[ 1 ]( false ) ), 1000 );
                    } else {
                        window.localStorage.clear();
                    }
                }
            };

            const redirect = () => {
                if ( !( authorization[ "user" ] ) && !( jwt ) ) {
                    // Redirect the user to the /login page, but save the current location that
                    // was attempted; such allows the web-application to send them the user back
                    // to the originally attempted page.

                    setTimeout( () => {
                        navigate( "/login", {
                            state: { from: location },
                            replace: true
                        } );
                    }, 1000 );
                }
            };

            return (jwt) ? (() => void update())() : ( () => void redirect())();
        }, [ ] );

        return ( loading[ 0 ] ) ? <Spinner children={ ( <Text input={ "Authorizing ..." }/> ) }/> : ( <Outlet/> );
    };

    /*** @see {@link Context} */
    export type Context = {
        user: User;
        login: ( username: string, callback: () => void ) => void;
        logout: ( callback: VoidFunction ) => void;
    } | null

    /*** @see {@link Context} */
    export type Navigation = NavigateFunction;

    /*** @see {@link Context} */
    export type Session = { readonly navigate: Authorization.Navigation; readonly authorization: Authorization.Context; readonly location: Location & { state: { from?: { pathname?: string } } } };

    /*** @see {@link Context} */
    export type User = {
        readonly name: string;
        readonly username: string;
        readonly uid: string;
        readonly expiration: string;
    }
}


export default Authorization;