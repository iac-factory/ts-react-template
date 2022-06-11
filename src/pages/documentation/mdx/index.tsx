import Styles from "./index.module.scss";

import { Suspense } from "react";

import { Configuration } from "./npm";

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
        <Suspense fallback={ ( null ) }>
            <div className={ Styles.content }>
                { children }
            </div>
        </Suspense>
    );
};

export { Content };

export const Page = () => {
    return (
        <Configuration/>
    );
};

export default Page;
