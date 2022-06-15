import { Row } from ".";
import { Cell } from ".";
import { Check } from ".";
import { Header } from ".";
import { Body } from ".";
import { Wrapper } from ".";
import { Footer } from ".";

import React from "react";

import styles from "./index.module.scss";

const CX = CXS.bind( styles );

import { Add } from "@carbon/icons-react/lib";

const Identifier = "table";

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

        console.log( columns );
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

export const Table = ( properties: Component.properties ) => {
    const classes = CX( {
        [ styles.component ]: properties.style ?? true,
        [ styles.hover ]: properties.hover ?? true,
        [ styles.vertical ]: properties.vertical ?? false
    } );

    const toolbar = React.useReducer(reducer, { count: 0 });

    const Icon = () => (
        <Add size={16}/>
    );

    // React.useEffect( Columns, [] );

    return (
        <Wrapper className={ classes } id={ Identifier } toolbar={toolbar}>
            <Header>
                <Row>
                    <Check toolbar={toolbar}/>
                    <Cell icon={(<Icon/>)}>
                        {
                            "Header-1"
                        }
                    </Cell>
                    <Cell>
                        {
                            "Header-2"
                        }
                    </Cell>
                    <Cell>
                        {
                            "Header-3"
                        }
                    </Cell>
                </Row>
            </Header>
            <Body>
                <Row>
                    <Check toolbar={toolbar}/>
                    <Cell>
                        {
                            "Body-1"
                        }
                    </Cell>
                    <Cell>
                        {
                            "Body-2"
                        }
                    </Cell>
                    <Cell>
                        {
                            "Body-3"
                        }
                    </Cell>
                </Row>
                <Row>
                    <Check toolbar={toolbar}/>
                    <Cell>
                        {
                            "Body-1"
                        }
                    </Cell>
                    <Cell>
                        {
                            "Body-2"
                        }
                    </Cell>
                    <Cell>
                        {
                            "Body-3"
                        }
                    </Cell>
                </Row>
                <Row>
                    <Check toolbar={toolbar}/>
                    <Cell>
                        {
                            "Body-1"
                        }
                    </Cell>
                    <Cell>
                        {
                            "Body-2"
                        }
                    </Cell>
                    <Cell>
                        {
                            "Body-3"
                        }
                    </Cell>
                </Row>
            </Body>
            <Footer>
                <Row>
                    <Check toolbar={toolbar}/>
                    <Cell>
                        {
                            "Footer-1"
                        }
                    </Cell>
                    <Cell>
                        {
                            "Footer-2"
                        }
                    </Cell>
                    <Cell>
                        {
                            "Footer-3"
                        }
                    </Cell>
                </Row>
            </Footer>
        </Wrapper>
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