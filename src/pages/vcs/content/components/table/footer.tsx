import React from "react";

export const Footer = (properties: Component.properties) => {
    const { children } = properties;

    return (
        <tfoot>
            {
                ( children ) ? children : null
            }
        </tfoot>
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
    }
}

export default Footer;