import { Content } from "..";
import { Component } from "./github-markdown";

/***
 * A 2nd Level Abstraction for MDX Component(s) relating to `npm` Imports/Exports
 * ---
 *
 * See {@link Content} for the the parent
 *
 * @returns {JSX.Element}
 * @constructor
 */
export const Configuration = () => {
    return (
        <Content>
            <Component/>
        </Content>
    );
};

// export { Mutators };

export default Configuration;