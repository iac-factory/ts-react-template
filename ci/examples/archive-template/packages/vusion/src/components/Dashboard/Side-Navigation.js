import "./SCSS/Side-Navigation.scss";

import {
    SideNav, SideNavIcon,
    SideNavItems,
    SideNavLink,
    SideNavMenu,
    SideNavMenuItem
} from "@carbon/react";

import {
    Debug as Search20,
    Debug as DataVis_120,
    Debug,
    Debug as Switcher20,
    Debug as Development20,
    Debug as Dashboard,
    Debug as Table,
    Debug as Mobile
} from "@carbon/icons-react";
import { useState } from "react";

/*****
 *
 * @param href
 * @returns {JSX.Element}
 * @constructor
 */

const Item = (href, s) => {
    return (
        <SideNavMenuItem href={ href }>
            {
                header
            }
        </SideNavMenuItem>
    );
};

/*****
 *
 * @returns {{children}}
 * @constructor
 */

const Items = (items = [ Item(location.href, "[Link]") ]) => {
    const Collection = {
        Items: []
    };

    items.forEach((Item, index) => Collection.Items.push((<Item key={ index }/>)));

    return Collection.Items;
};

/*****
 *
 * @param title
 * @param Items
 * @param items
 * @returns {*}
 * @constructor
 */

const Collapsable = ({ title = "[Aria-Title]" }, Items = Items) => {
    return (
        <SideNavMenu title={ title }>
            <Items/>
        </SideNavMenu>
    );

};

const Icons = {
    Dashboard: () => (<Dashboard style={ { height: "20px", width: "20px", fill: "rgba(185, 185, 185, 0.825)" } }/>),
    Table: () => (<Table style={ { height: "20px", width: "20px", fill: "rgba(185, 185, 185, 0.825)" } }/>),
    Mobile: () => (<Mobile style={ { height: "20px", width: "20px", fill: "rgba(185, 185, 185, 0.825)" } }/>)
};

const Base = "/#/dashboard";

/*****
 *
 * @param endpoint {string}
 * @returns "/#/dashboard/{endpoint}" {string}
 * @constructor
 */

const Route = (endpoint) => (endpoint.slice(0, 1) === "/") ? Base + String(endpoint)
    : Base + "/" + String(endpoint);

const Component = () => {
    const [ rail, setRail ] = useState(true);

    return (
        <SideNav
            isRail={ false }

            defaultExpanded={ true }
            isFixedNav={ true }
            isChildOfHeader={ false }
            isPersistent={ true }
            aria-label="Side navigation"
            className={ "io-dashboard-left-side-menu" }
            tabIndex={ 0 }
        >
            <SideNavItems>
                <SideNavLink /// --> Dashboard Home Page
                    renderIcon={ Icons.Dashboard }
                    href={ Base }
                    async={ true }
                    children={ "Home" }
                />
                <SideNavLink /// --> Table Page
                    renderIcon={ Icons.Mobile }
                    href={ Route("mobile") }
                    async={ true }
                    children={ "Mobile" }
                />
                <SideNavLink /// --> Table Page
                    renderIcon={ Icons.Table }
                    href={ Route("table") }
                    async={ true }
                    children={ "Table" }
                />
                {/* <SideNavMenu title="Category One">         */ }
                {/*     <SideNavMenuItem href={location.href}> */ }
                {/*         Link                               */ }
                {/*     </SideNavMenuItem>                     */ }
                {/*     <SideNavMenuItem href={location.href}> */ }
                {/*         Link                               */ }
                {/*     </SideNavMenuItem>                     */ }
                {/*     <SideNavMenuItem href={location.href}> */ }
                {/*         Link                               */ }
                {/*     </SideNavMenuItem>                     */ }
                {/* </SideNavMenu>                             */ }
            </SideNavItems>
        </SideNav>
    );
};

export default Component;