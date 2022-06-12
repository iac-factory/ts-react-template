import type { Location, NavigateFunction } from ".";
import { Outlet, React, useLocation, useNavigate } from ".";

import { Spinner, Text } from "../library";

import { Local, useLocalStorage } from "../library/storage";
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

        const [ jwt, setJWT ] = useLocalStorage( "JWT", null );

        const login = ( username: string, callback: ( () => void ) ) => {
            console.log( "Provider User Login Context", username );

            ( username ) && setUser( {
                username,
                expiration: "...",
                uid: "...",
                name: "..."
            } );

            console.log( user, callback );

            return void callback();
        };

        const logout = ( callback: ( () => void ) ) => {
            return void setTimeout( callback, 1000 * 10000 );
        };

        const attribution = {
            user,
            login,
            logout,
            jwt,
            setJWT
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

        const jwt = useLocalStorage( "JWT" );

        React.useEffect( () => {
            /***
             * Oddly enough, during the same session where a user may lose both context and localstorage,
             * the React.useEffect conditional can still pass. Therefore, it's required to, again, try
             * and pull from localstorage.
             */

            const update = async () => {
                const token: string = await Local.getItem( process.env[ "REACT_APP_LOCAL_STORAGE_JWT_KEY" ], ( exception, value ) => {
                    if ( exception ) throw exception;

                    /***
                     * If within the following context, the browser session did derive a JWT. However, if a JWT is present,
                     * but the user context is not, an API call now needs to be made to attempt to get that information. First
                     * the user authorization object is checked.
                     */

                    console.log( "Update Post-Validation (Authorization)", authorization[ 0 ] );

                    ( typeof jwt[ 1 ] !== "string" ) && jwt[ 1 ]( value );

                    console.log( "Update Post-Validation (JWT)", value );

                    return value;
                } );

                if ( token ) {
                    const input = new URLSearchParams();

                    input.set( "jwt", token );

                    const validation = await fetch( process.env[ "REACT_APP_API_ENDPOINT" ] + "/authorization", {
                        method: "POST",
                        mode: "cors",
                        body: input
                    } );

                    if (validation.status === 200) {
                        const data = await validation.json();

                        setTimeout(() => authorization.login(data.username as string, () => loading[1](false)), 1000);
                    } else {
                        void await Local.clear( ( exception ) => {
                            if ( exception ) throw exception;
                            navigate( "/login", {
                                state: { from: location },
                                replace: true
                            } );
                        } );
                    }
                }
            };

            if ( !authorization[ "user" ] && !jwt[ 0 ] ) {
                // Redirect the user to the /login page, but save the current location that
                // was attempted; such allows the web-application to send them the user back
                // to the originally attempted page.

                setTimeout( () => {
                    navigate( "/login", {
                        state: { from: location },
                        replace: true
                    } );
                }, 1000 );
            } else return () => void update();
        }, [] );

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