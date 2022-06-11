import { MDXProvider } from "@mdx-js/react";
import Content from "./content.mdx";

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

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