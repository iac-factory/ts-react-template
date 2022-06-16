import React, { Suspense } from "react";

import { Spinner, Text, Outlet, Grid, Container, Responsive } from "..";

import { Menu } from "..";
import { Footer } from "..";

const Awaitable = ( { label = "Loading ..." }: { label?: string } ) => ( <Spinner children={ ( label ) ? ( <Text input={ label }/> ) : null }/> );

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
export const Shell = ( { children }: { children? } ): JSX.Element => {
    const Proxy = () => ( children ) ?? ( <Outlet/> );

    return (
        <>
            <Menu/>
            <Container>
                {/*<Responsive>*/ }
                {/*    <Grid>*/ }
                <Suspense fallback={ ( <Awaitable/> ) }>
                    <Proxy/>
                </Suspense>
                {/*    </Grid>*/ }
                {/*</Responsive>*/ }
            </Container>
            <Footer.Component/>
        </>
    );
};

export type Interface = { children?: JSX.Element | undefined | null };

export default Shell;
