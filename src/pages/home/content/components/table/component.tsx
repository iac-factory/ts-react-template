import { Row } from ".";
import { Cell } from ".";
import { Check, All } from ".";
import { Header } from ".";
import { Body } from ".";
import { Tabular } from ".";
import { Footer } from ".";
import { Pagination } from ".";

import React from "react";

import styles from "./index.module.scss";
import CXS from "classnames/bind";
const CX = CXS.bind( styles );

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

/*** Complexity Here Cannot be Avoided without Excessive Module Separation */
export module Generator {
    export interface Input {
        Headers: { identifier: string, cells: { header: string }[], toolbar: [ { count: number; }, React.Dispatch<boolean> ], isAllChecked: boolean, handleCheckAll: React.Dispatch<boolean> };
        Body: {
            handleCheck: any;
            isChecked: any;
            cells: { title: string, value?: string }[]
        };
        Footer: { cells: { header: string }[] };
    }

    export const Headers = ( properties: Input["Headers"] ) => {
        return (
            <Header scope={ "column" }>
                <Row>
                    <All identifier={ properties.identifier } isAllChecked={ properties.isAllChecked } handleCheckAll={ properties.handleCheckAll }/>
                    {/*<All id={ "check-all" } type={ "checkbox" } name={ "check-all-input" } isAllChecked={ properties.isAllChecked } handleCheckAll={ properties.isAllChecked }/>*/ }
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

    const Context = ( properties: Input["Body"], element ) => {
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

    export const Content = ( data: User.Type[], properties: Input["Body"] ) => {
        return (
            <Body scope={ "row" }>
                {
                    data.map( ( element, index ) => {
                        return (
                            <Row key={ index }>
                                <Check name={ element.name } id={ element.id } type={ "checkbox" } checkbox={ [ properties.isChecked, properties.handleCheck ] }/>
                                { Context( properties, element ) }
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

    const [ total, setTotal ] = React.useState( Data.length );

    const hydration = React.useCallback( ( total: number ) => User.generate( total ), [] );

    const users = React.useMemo( () => hydration( total ), [ total ] );

    const [ isCheckAll, setIsCheckAll ] = React.useState( false );
    const [ isCheck, setIsCheck ] = React.useState( [] );

    // const [ list, setList ] = React.useState( [] );

    const handleCheck = ( event ) => {
        const { id } = event.target;
        const { checked } = event.target;

        setIsCheck( [ ...isCheck, id ] );
        if ( !checked ) {
            setIsCheck( isCheck.filter( item => item !== id ) );
        }
    };

    const handleSelectAll = e => {
        setIsCheckAll( !isCheckAll );
        setIsCheck( users.map( user => user.id ) );
        if ( isCheckAll ) {
            setIsCheck( [] );
        }
    };

    const toolbar = React.useReducer( ( state, check: boolean ) => {
        switch ( check ) {
            case true:
                return { count: state.count - 1 };
            case false:
                return { count: state.count + 1 };
            default:
                throw new Error();
        }
    }, { count: 0 } );

    const Headers = Generator.Headers( {
        identifier: "check-all-users",
        toolbar: toolbar,
        isAllChecked: isCheckAll,
        handleCheckAll: handleSelectAll,
        cells: [
            { header: "Name" },
            { header: "Username" },
            { header: "Email" },
            { header: "Role" }
        ]
    } );

    const Body = Generator.Content( users, {
        isChecked: isCheck,
        handleCheck: handleCheck,
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

    // React.useEffect( () => {
    //     setList( users );
    // }, [ list ] );

    return (
        <>
            <Tabular className={ classes } id={ Identifier } toolbar={ toolbar }>
                { Headers }
                { Body }
                { Pager }
            </Tabular>
            <Pagination total={ [ total, setTotal ] }/>
        </>
    );
};

module Component {
    interface Element extends React.HTMLAttributes<HTMLTableElement> {
        /*** [Attributes] */
    }

    export type properties = JSX.IntrinsicAttributes & React.HTMLAttributes<{}> & Element & {
        hover?: boolean;
        vertical?: boolean;
        style?: boolean;
        all?: [ boolean, React.Dispatch<boolean> ]
    }
}


export default Table;