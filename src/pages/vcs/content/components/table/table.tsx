import React from "react";

import { Tabular, Type } from ".";
import { Pagination } from ".";
import { Generator } from ".";

import CXS from "classnames/bind";

import styles from "./index.module.scss";

const CX = CXS.bind( styles );

const Identifier = "table";

enum Sorting {
    unsorted = "UNSORTED",
    ascending = "ASCENDING",
    descending = "DESCENDING"
}

type Sort = keyof typeof Sorting;

/***
 * Table Content
 *
 * @link {Table}
 *
 * @param properties
 * @constructor
 */
export const Table = ( properties: Component.properties ) => {
    const classes = CX( {
        [ styles.component ]: properties.style ?? true,
        [ styles.hover ]: properties.hover ?? true,
        [ styles.vertical ]: properties.vertical ?? false
    } );

    const [ total, setTotal ] = React.useState( 10 );
    const [ page, setPage ] = React.useState( 0 );
    const [ loading, setLoading ] = React.useState( true );

    const hydration = React.useCallback( () => {
        const data: Type.Enumeration[] = [];

        const input = new URLSearchParams();

        input.set( "page", String(page) );
        input.set( "total", String(total) );

        void fetch( [ process.env[ "REACT_APP_API_ENDPOINT" ], "github", "organization", "repositories", "tabular" ].join( "/" ), {
            method: "POST",
            cache: "default",
            body: input
        } ).then( async ( response ) => {
            const repositories = await response.json();
            repositories.forEach( ( repository ) => {
                data.push( repository );
            } );

            setLoading( false );
        } );

        return data;
    }, [ page, total ] );

    const repositories = React.useMemo( hydration, [ hydration ] );

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

    const handleSelectAll = ( event ) => {
        setIsCheckAll( !isCheckAll );
        setIsCheck( repositories.map( ( repository ) => {
            return String( repository.id );
        } ) );
        if ( isCheckAll ) {
            setIsCheck( [] );
        }
    };

    const Toolbar = React.useCallback( () => {
        switch ( isCheckAll ) {
            case true:
                return {
                    repositories: repositories,
                    count: isCheck.length,
                    rows: isCheck[ 0 ]
                };
            case false:
                return {
                    repositories: repositories,
                    count: isCheck.length,
                    rows: isCheck[ 0 ]
                };
            default:
                throw new Error();
        }
    }, [ isCheck, isCheckAll, repositories ] );

    const Pager = Generator.Pager( {
        cells: [
            { header: "" },
            { header: "-" },
            { header: "-" },
            { header: "-" },
            { header: "-" },
            { header: "-" }
        ]
    } );

    const Headers = Generator.Headers( {
        toolbar: Toolbar,
        isAllChecked: isCheckAll,
        handleCheckAll: handleSelectAll,
        /// filters???
        cells: [
            /// https://www.aleksandrhovhannisyan.com/blog/sorting-ant-design-tables/
            { header: "Name" /*** filter */ },
            { header: "Username" /*** filter */ },
            { header: "Email" /*** filter */ },
            { header: "Role" /*** filter */ },
            { header: "Data" /*** filter */ }
        ]
    } );

    const Content = Generator.Content( repositories, {
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

    return ( loading ) ? null : (
        <>
            <Tabular className={ classes } id={ Identifier } toolbar={ Toolbar }>
                { Headers }
                { Content }
                { Pager }
            </Tabular>
            <Pagination total={ [ total, setTotal ] } selected={ isCheck.length }/>
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