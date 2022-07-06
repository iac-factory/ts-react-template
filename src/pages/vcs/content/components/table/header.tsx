import React from "react";

export const Header = ( properties: Component.properties ) => {
    const { children } = properties;
    const { scope } = properties;
    const { hoverable } = properties;

    return (
        <thead { ...properties }>
        { ( children ) ? children : null }
        </thead>
    );
};

module Component {
    export interface Element extends React.HTMLAttributes<HTMLTableCellElement> {
        /*** [Attributes] */
    }

    export type properties = JSX.IntrinsicAttributes & React.HTMLAttributes<{}> & Element & {
        /*** [Properties] */
        scope?: string;
        hoverable?: boolean;
    }
}

export default Header;