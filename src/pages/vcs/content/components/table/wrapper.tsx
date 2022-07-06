import React from "react";

import { Toolbar } from "./toolbar";

import { User } from "./form-handle";

import styles from "./index.module.scss";

function Container( { children } ) {
    return (
        <div className={ styles.container }>
            { children }
        </div>
    );
}

export default Tabular;

/*** See {@link ./component.tsx Component} for Table Body Implementation */
export const Tabular = ( properties?: Component.properties ) => {
    const { children } = properties;
    const { toolbar } = properties;
    const { width } = properties;

    const loader = React.useState( {
        loading: true,
        title: "Database User(s)"
    } );

    return (
        <>
            <form id={ "form" } onSubmit={ ( event ) => User.Submit( event ) }/>
            <table { ...{ ...properties, ...{ toolbar: ( toolbar ) ? "true" : "false" } } } width={ width ?? "auto" }>
                <caption className={ styles.caption }>
                    <Container>
                        <Toolbar active={toolbar} loader={ loader } caption={ ( loader[ 0 ].loading ) ? "Loading ..." : loader[ 0 ].title }/>
                    </Container>
                </caption>
                {
                    ( children ) ? children : null
                }
            </table>
        </>
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
        toolbar: () => { count: number };
    }
}
