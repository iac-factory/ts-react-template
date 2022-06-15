export const Header = (properties: Component.properties) => {
    const { children } = properties;

    return (
        <thead>
            { (children) ? children : null }
        </thead>
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

export default Header;