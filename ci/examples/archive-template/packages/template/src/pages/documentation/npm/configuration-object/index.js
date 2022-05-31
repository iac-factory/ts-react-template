import Content from "./index.mdx";

import { Mutators } from "..";

/***
 * The MDX (Markdown) Content + Runtime Injections
 * ---
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Component = () => {
    const code = Mutators.code;

    /*** `components` has to be := an html tag (.e.g. <code> - relating to a {@link Mutators} extension */
    const Target = () => (<Content components={ { code } }/>);

    return (<Target/>);
};

export { Component as Configuration };
export default Component;