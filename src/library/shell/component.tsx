import React, { Suspense, useEffect, useState, useTransition } from "react";

import { Spinner, Text, Outlet, Grid, Container } from "..";

import { Menu } from "..";
import { Footer } from "..";

const Loading = React.createContext<Context>( null! );

export type Context = {
    state: boolean,
    display?: string,
    update: ( value: boolean, p: () => any ) => void
} | null;

export type Loader = boolean;

export function useLoading(force?: boolean) {
    return (force) ? React.useContext( { ... Loading, ... { state: true } })
        : React.useContext( Loading );
}

const Awaitable = ( { label = "Loading ..." }: {label?: string }) => ( <Spinner children={ (label) ? ( <Text input={ label }/> ) : null }/> );

/***
 * Shell - UI Application Wrapper around `<Outlet>`
 *
 * > *An <Outlet> should be used in parent route elements to render their child route elements. This allows nested UI to
 * > show up when child routes are rendered. If the parent route matched exactly, it will render a child index
 * > route or nothing if there is no index route.*
 *
 * @returns {JSX.Element}
 *
 * @see {@link https://reactrouter.com/docs/en/v6/api#outlet Outlets}
 *
 * @constructor
 */
export const Shell = ({children}: {children?}): JSX.Element => {
    return (
        <>
            <Menu/>
            <Container>
                <Grid>
                    <Provider>
                        <Suspense fallback={ ( <Awaitable/> ) }>
                            <Consumer children={children}/>
                        </Suspense>
                    </Provider>
                </Grid>
            </Container>
            <Footer.Component/>
        </>
    );
};

export const Provider = ( { children }: { children: React.ReactNode } ) => {
    const [ loading, setLoading ] = React.useState<Loader>(  true );
    const load = ( value: boolean, callback: () => void ) => {
        setTimeout( () => {
            setLoading( value );
        }, 750);

        return callback();
    };

    return (
        <Loading.Provider value={ { state: loading, update: (value: boolean, callback: () => void) => load(value, callback) } }>
            {
                ( children )
            }
        </Loading.Provider>
    );
};

export const Consumer = ( { children } ) => {
    const loading = useLoading();

    loading.update(true, () => loading.update(false, () => void null));

    const Proxy = () => children ?? ( <Outlet/> );

    return (loading.state) ? (<Awaitable label={loading.display ?? "Initializing ..."}/>) : ( <Proxy/> );
};

export type Interface = { children?: JSX.Element | undefined | null };

export default Shell;
