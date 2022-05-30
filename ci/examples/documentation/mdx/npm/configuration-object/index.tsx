import { MDXProvider } from "@mdx-js/react";
import { Mutators } from "..";
import Content from "./index.mdx";


/***
 * The MDX (Markdown) Content + Runtime Injections
 * ---
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Component = () => {
    const code = Mutators.code;
    return (
        <MDXProvider components={ { code: code }} children={(<Content/>)} disableParentContext={false}/>
    );
};

export { Component as Configuration };
export default Component;