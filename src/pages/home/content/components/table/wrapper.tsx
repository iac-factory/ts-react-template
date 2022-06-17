import React from "react";

import Data from "./data";

import styles from "./index.module.scss";
import { Toolbar } from "./toolbar";

import { User } from "./form-handle";

function Container( { children } ) {
    return (
        <div className={ styles.container }>
            { children }
        </div>
    );
}

export default Tabular;
export const Tabular = ( properties?: Component.properties ) => {
    const { toolbar } = properties;
    const { children } = properties;
    const { width } = properties;

    return (
        <form id={ "form" } onSubmit={ ( event ) => User.Submit( event, properties.loader[ 1 ] ?? undefined ) }>
            <Container>
                <table { ...{ ...properties, ...{ toolbar: ( toolbar ) ? "true" : "false" } } } width={ width ?? "auto" }>
                    <caption className={ styles.caption }>
                        <Toolbar active={ toolbar } caption={ "Alien Football Stars" }/>
                    </caption>
                    {
                        ( children ) ? children : null
                    }
                </table>
            </Container>
        </form>
    );
};

module Component {
    interface Element extends React.HTMLAttributes<HTMLTableElement> {
        /*** [Properties] */
    }

    export type properties = JSX.IntrinsicAttributes & React.HTMLAttributes<{}> & Element & {
        small?: boolean;
        width?: number;
        loader?: [ boolean, React.Dispatch<boolean> ];
        toolbar: [ { count: number; }, React.Dispatch<boolean> ];
    }
}
