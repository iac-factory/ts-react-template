import { MDXProvider } from "@mdx-js/react";
import { Mutators } from "..";

import Content from "./content.mdx";

/***
 * The MDX (Markdown) Content + Runtime Injections
 * ---
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Component = () => {
    return (
        <MDXProvider components={ Mutators }>
            <Content/>
        </MDXProvider>
    );
};

export { Component as Configuration };
export default Component;