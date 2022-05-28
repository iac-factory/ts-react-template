import { Outlet } from "react-router-dom";

import { Page } from "./page";

import { Menu } from "./menu/index";
import { Footer } from "./footer";
import { Container } from "./container";

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
export const Shell = () => {
    return (
        <>
            <Menu/>
            <Container>
                <Page>
                    <Outlet/>
                </Page>
            </Container>
            <Footer/>
        </>
    );
};

export default Shell;
