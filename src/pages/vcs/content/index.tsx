import React from "react";

import { Component } from "./mdx-component";
import Styles from "./index.module.scss";

/***
 * Abstract Functional Component for Nested Directories (MDX) related Usage
 * ---
 *
 * See * exports for Child MDX Module(s)
 *
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
const Content = ( { children } ) => {
    return (
        <div className={ Styles.content }>
            { children }
        </div>
    );
};

/***
 * A 2nd Level Abstraction for MDX Component(s) relating to `npm` Imports/Exports
 * ---
 *
 * See {@link Content} for the the parent
 *
 * @returns {JSX.Element}
 * @constructor
 */
export const Page = () => {
    return (
        <Content>
            <Component/>
        </Content>
    );
};

export default Page;

export { Table } from "./components";