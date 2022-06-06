import { React } from ".";

import { Outlet } from ".";
import { useLocation } from ".";
import { useNavigate } from ".";

import type { Location } from ".";
import type { NavigateFunction } from ".";

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

        const login = ( username: string, callback: (() => void) ) => {
            console.log(username);

            (username) && setUser({
                username,
                expiration: "...",
                uid: "...",
                name: "..."
            });

            console.log(user, callback);

            return void callback();
        };

        const logout = ( callback: (() => void) ) => {
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
        const location = useLocation();
        const authorization = useAuthorization();
        const navigate = useNavigator();

        React.useEffect(() => {
            if ( !authorization["user"] ) {
                // Redirect the user to the /login page, but save the current location that
                // was attempted; such allows the web-application to send them the user back
                // to the originally attempted page.

                navigate("/login", { state: { from: location }, replace: true } );
            }
        });

        return (<Outlet/>);
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