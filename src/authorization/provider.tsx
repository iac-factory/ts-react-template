import React from "react";

import { API } from ".";
import { Navigate } from ".";
import { useLocation } from ".";
import { useNavigate } from ".";

import type { Location } from "react-router-dom";
import type { NavigateFunction } from "react-router-dom";

export module Authorization {
    export const Context = React.createContext<Context>( null! );
    export function useAuthorization() {
        return React.useContext( Context );
    }

    export function useSession () {
        return useLocation() as Location & { state: { from?: { pathname?: string } } };
    }

    export function useNavigator () {
        return useNavigate();
    }

    export const Provider = ( { children }: { children: React.ReactNode } ) => {
        const [ user, setUser ] = React.useState<any>( null );

        const login = ( username: string, callback: () => void ) => {
            return API.login( username, () => {
                setUser( username );
                console.log( username );
                void callback();
            } );
        };

        const logout = ( callback: () => void ) => {
            return API.logout( () => {
                setUser( null );
                callback();
            } );
        };

        const attribution = {
            user,
            login,
            logout
        } as const;

        return ( <Context.Provider value={ attribution } children={ children }/> );
    };

    export const Router = ( { children }: { children: JSX.Element } ) => {
        const location = useLocation();
        const authorization = useAuthorization();

        if ( !authorization.user ) {
            // Redirect them to the /login page, but save the current location they were
            // trying to go to when they were redirected. This allows us to send them
            // along to that page after they login, which is a nicer user experience
            // than dropping them off on the home page.
            return <Navigate to="/login" state={ { from: location } } replace/>;
        }

        return children;
    };

    export type Context = {
        user: object;
        login: ( username: string, callback: () => void ) => void;
        logout: ( callback: VoidFunction ) => void;
    };

    export type Navigation = NavigateFunction;

    export type Session = { readonly navigate: Authorization.Navigation; readonly authorization: Authorization.Context; readonly location: Location & { state: { from?: { pathname?: string } } } };
}

export default Authorization;