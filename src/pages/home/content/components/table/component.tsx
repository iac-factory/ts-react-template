import React from "react";

import { Tabular } from ".";
import { Pagination } from ".";
import { Generator } from ".";

import { Data } from ".";
import { Hydration } from ".";

import CXS from "classnames/bind";

import styles from "./index.module.scss";

const CX = CXS.bind( styles );

const Identifier = "table";

export const Table = ( properties: Component.properties ) => {
    const classes = CX( {
        [ styles.component ]: properties.style ?? true,
        [ styles.hover ]: properties.hover ?? true,
        [ styles.vertical ]: properties.vertical ?? false
    } );

    const [ total, setTotal ] = React.useState( Data.length );

    const hydration = React.useCallback( ( total: number ) => Hydration.generate( total ), [] );

    const users = React.useMemo( () => hydration( total ), [ total ] );

    const [ isCheckAll, setIsCheckAll ] = React.useState( false );
    const [ isCheck, setIsCheck ] = React.useState( [] );

    const handleCheck = ( event ) => {
        const { id } = event.target;
        const { checked } = event.target;

        setIsCheck( [ ...isCheck, id ] );
        if ( !checked ) {
            setIsCheck( isCheck.filter( item => item !== id ) );
        }
    };

    const handleSelectAll = (event) => {
        setIsCheckAll( !isCheckAll );
        setIsCheck( users.map( user => user.id ) );
        if ( isCheckAll ) {
            setIsCheck( [] );
        }
    };

    const Toolbar = React.useReducer( ( state, check: boolean ) => {
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
        toolbar: Toolbar,
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

    return (
        <>
            <Tabular className={ classes } id={ Identifier } toolbar={ Toolbar }>
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