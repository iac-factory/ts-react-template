import { MDXProvider } from "@mdx-js/react";
import Content from "./content.mdx";

/***
 * The MDX (Markdown) Content + Runtime Injections
 * ---
 *
 * @returns {JSX.Element}
 * @constructor
 */
export const Component = () => {
    return (
        <MDXProvider components={ {} }>
            <Content/>
        </MDXProvider>
    );
};

export default Component;