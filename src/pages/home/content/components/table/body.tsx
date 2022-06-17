import React from "react";

export const Body = (properties: Component.properties) => {
    const { children } = properties;

    return (
        <tbody {... properties}>
            {
                ( children ) ? children : null
            }
        </tbody>
    );
};

import type CSS from "csstype";

module Component {
    type Attribution = CSS.HtmlAttributes;

    interface Element extends React.HTMLAttributes<HTMLTableElement> {
        /*** [Attributes] */
    }

    export type properties = JSX.IntrinsicAttributes & React.HTMLAttributes<{}> & Element & {
        /*** [Properties] */
        scope?: string
    }
}

export default Body;