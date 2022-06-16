import { Row } from ".";
import { Cell } from ".";
import { Check } from ".";
import { Header } from ".";
import { Body } from ".";
import { Tabular } from ".";
import { Footer } from ".";

import React from "react";

import styles from "./index.module.scss";

const CX = CXS.bind( styles );

import { Add } from "@carbon/icons-react/lib";

const Identifier = "table";

import { Data } from "./data";

import { User } from "./data";

/***
 * Only use within a useEffect
 * @param table {string} - Table Unique Identifier
 * @constructor
 */
const Columns = ( table: string = Identifier ) => {
    const rows = document.getElementById( table ).getElementsByTagName( "tr" );

    for ( const [ identifier, row ] of Object.entries( rows ) ) {
        const iterator = parseInt( identifier );

        if ( iterator === 0 || iterator === ( rows.length - 1 ) ) continue;

        const cells = row.getElementsByTagName( "td" );

        const columns = Object.values( cells ).map( ( cell, index ) => {
            return cell;
        } );
    }
};

function reducer( state, check: boolean ) {
    switch ( check ) {
        case true:
            return { count: state.count - 1 };
        case false:
            return { count: state.count + 1 };
        default:
            throw new Error();
    }
}

/*** Complexity Here Cannot be Avoided without Excessive Module Separation */
/*** Various attempts were made ... */
export module Generator {
    export interface Input {
        Headers: { identifier: string, cells: { header: string }[], toolbar: [ { count: number; }, React.Dispatch<boolean> ] };
        Body: { cells: { title: string, value?: string }[], toolbar: [ { count: number; }, React.Dispatch<boolean> ] };
        Footer: { cells: { header: string }[] };
    }

    export const Headers = ( properties: Input["Headers"] ) => {
        return (
            <Header scope={ "column" }>
                <Row>
                    <Check toolbar={ properties.toolbar } identifier={ properties.identifier }/>
                    {
                        properties.cells.map( ( element, index ) => {
                            return (
                                <Cell key={ index }>
                                    {
                                        element.header
                                    }
                                </Cell>
                            );
                        } )
                    }
                </Row>
            </Header>
        );
    };

    export const Content = ( properties: Input["Body"] ) => {
        const Context = ( element ) => {
            return properties.cells.map(
                ( property, index ) => {
                    return (
                        <Cell identifier={ property.title + "-" + index } key={ index }>
                            {
                                element[ ( property.value ) ? property.value : property.title ]
                            }
                        </Cell>
                    );
                }
            );
        };

        return (
            <Body scope={ "row" }>
                {
                    React.useMemo( () => Data, [ Data ] ).map( ( element, index ) => {
                        return (
                            <Row key={ index }>
                                <Check toolbar={ properties.toolbar } identifier={ element.id }/>
                                { Context( element ) }
                            </Row>
                        );
                    } )
                }
            </Body>
        );
    };

    export const Pager = ( properties: Input["Footer"] ) => {
        return (
            <Footer>
                <Row>
                    {
                        properties.cells.map( ( element, index ) => {
                            return (
                                <Cell key={ index }>
                                    {
                                        element.header
                                    }
                                </Cell>
                            );
                        } )
                    }
                </Row>
            </Footer>
        );
    };
}

export const Table = ( properties: Component.properties ) => {
    const classes = CX( {
        [ styles.component ]: properties.style ?? true,
        [ styles.hover ]: properties.hover ?? true,
        [ styles.vertical ]: properties.vertical ?? false
    } );

    const toolbar = React.useReducer( reducer, { count: 0 } );

    const Icon = () => (
        <Add size={ 16 } style={ { height: "auto" } }/>
    );

    const Headers = Generator.Headers( {
        identifier: "check-all-users",
        toolbar: toolbar,
        cells: [
            { header: "Name" },
            { header: "Username" },
            { header: "Email" },
            { header: "Role" }
        ]
    } );

    const Body = Generator.Content( {
        toolbar: toolbar,
        cells: [
            {
                title: "Name",
                value: "name"
            },
            {
                title: "Username",
                value: "username"
            },
            {
                title: "Email",
                value: "email"
            },
            {
                title: "Role",
                value: "role"
            }
        ]
    } );

    const Pager = Generator.Pager( {
        cells: [
            { header: "" },
            { header: "-" },
            { header: "-" },
            { header: "-" },
            { header: "-" }
        ]
    } );

    return (
        <Tabular className={ classes } id={ Identifier } toolbar={ toolbar }>
            { Headers }
            { Body }
            { Pager }
        </Tabular>
    );
};

import type CSS from "csstype";
import CXS from "classnames/bind";

module Component {
    type Attribution = CSS.HtmlAttributes;

    interface Element extends React.HTMLAttributes<HTMLTableElement> {
        /*** [Attributes] */
    }

    export type properties = JSX.IntrinsicAttributes & React.HTMLAttributes<{}> & Element & {
        hover?: boolean;
        vertical?: boolean;
        style?: boolean;
    }
}


export default Table;