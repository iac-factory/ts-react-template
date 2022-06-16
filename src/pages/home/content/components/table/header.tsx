import React from "react";

export const Header = (properties: Component.properties) => {
    const { children } = properties;
    const { scope } = properties;

    return (
        <thead { ...properties }>
        { ( children ) ? children : null }
        </thead>
    );
};

import type CSS from "csstype";

module Component {
    type Attribution = CSS.HtmlAttributes;

    export interface Element extends React.HTMLAttributes<HTMLTableCellElement> {
        /*** [Attributes] */
    }

    export type properties = JSX.IntrinsicAttributes & React.HTMLAttributes<{}> & Element & {
        /*** [Properties] */
        scope?: string;
    }
}

export default Header;