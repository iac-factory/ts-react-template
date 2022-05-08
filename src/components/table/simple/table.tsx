import { useTable, useResizeColumns, useFlexLayout } from "react-table";

import { Data } from "./data";
import { Columns } from "./columns";
import { useRowSelect } from "react-table";
import { useRowState } from "react-table";

import { Checkbox } from "./../../indeterminate-checkbox";

const Component = ( { properties = { columns: Columns(), data: Data() } } ) => {
    const Columns = properties.columns;
    const Data = properties.data;

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable( {
        // @ts-ignore
        columns: Columns,
        data: Data
    }, useResizeColumns, useFlexLayout, useRowSelect, useRowState, hooks => {
        hooks.allColumns.push(columns => [
            // Let's make a column for selection
            {
                id: 'selection',
                disableResizing: true,
                minWidth: 35,
                width: 35,
                maxWidth: 35,
                // The header can use the table's getToggleAllRowsSelectedProps method
                // to render a checkbox
                Header: () => (
                    <div>
                        <Checkbox />
                    </div>
                ),
                // The cell can use the individual row's getToggleRowSelectedProps method
                // to the render a checkbox
                Cell: ({ row }) => (
                    <div>
                        <Checkbox />
                    </div>
                ),
            },
            ...columns,
        ])
        hooks.useInstanceBeforeDimensions.push(({ headerGroups }) => {
            // fix the parent group of the selection button to not be resizable
            /// const selectionGroupHeader = headerGroups[0].headers[0]
            /// selectionGroupHeader.canResize = false
//            headerGroups.forEach(($) => {
//                const properties = $.getHeaderProps();
//                const t = $.getToggleHiddenProps();
//            })
        })
    } );

    return (
        <table { ... getTableProps() } style={ { border: "solid 1px blue", color: "black" } }>
            <thead>
            { headerGroups.map( headerGroup => (
                <tr { ... headerGroup.getHeaderGroupProps() }>
                    { headerGroup.headers.map( column => (
                        <th
                            { ... column.getHeaderProps() }
                            style={ {
                                borderBottom: "solid 3px red",
                                background: "aliceblue",
                                color: "black",
                                fontWeight: "bold"
                            } }
                        >
                            { column.render( "Header" ) }
                        </th>
                    ) ) }
                </tr>
            ) ) }
            </thead>
            <tbody { ... getTableBodyProps() }>
            { rows.map( row => {
                prepareRow( row );
                return (
                    <tr { ... row.getRowProps() }>
                        { row.cells.map( cell => {
                            return (
                                <td
                                    { ... cell.getCellProps() }
                                    style={ {
                                        padding: "10px",
                                        border: "solid 1px gray",
                                        background: "papayawhip"
                                    } }
                                >
                                    { cell.render( "Cell" ) }
                                </td>
                            );
                        } ) }
                    </tr>
                );
            } ) }
            </tbody>
        </table>
    );
};

export default Component;

export { Component as Table };
