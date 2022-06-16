import CXS from "classnames/bind";
const CX = CXS.bind( styles );

export const Row = (properties: Component.properties) => {
    const { children } = properties;

    const classes = CX( {
        [styles.row]: true
    }, properties.className );

    return (
        <tr /* className={classes} */>
            {
                ( children ) ? children : null
            }
        </tr>
    );
};

import type CSS from "csstype";
import styles from "./index.module.scss";

module Component {
    type Attribution = CSS.HtmlAttributes;

    interface Element extends React.HTMLAttributes<HTMLTableElement> {
        /*** [Attributes] */
    }

    export type properties = JSX.IntrinsicAttributes & React.HTMLAttributes<{}> & Element & {
        /*** [Properties] */
    }
}

export default Row;