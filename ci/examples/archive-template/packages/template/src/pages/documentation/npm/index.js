import { lazy } from "react";

import { Content } from "..";
import { Mutators } from "..";

/***
 * A 2nd Level Abstraction for MDX Component(s) relating to `npm` Imports/Exports
 * ---
 *
 * See {@link Content} for the the parent
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Configuration = () => {
    const Component = lazy(() => import("./configuration-object"));
    return (
        <Content children={(<Component/>)}/>
    )
};

const NPM = {
    Configuration
};

export { NPM };
export { Mutators };

export default NPM;