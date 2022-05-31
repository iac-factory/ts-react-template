import React from "react";

import { useTable, useExpanded, useSortBy } from "react-table";

import { default as Generator } from "./Generator.js";

import { default as Columns } from "./Columns.js";

function SubRows({ row, rowProps, visibleColumns, data, loading, error }) {
    if ( loading ) {
        return (
            <tr>
                <td/>
                <td colSpan={ visibleColumns.length - 1 }>
                    Loading...
                </td>
            </tr>
        );
    }

    return (error) ? (
        <tr>
            <td/>
            <td colSpan={ visibleColumns.length - 1 }>
                Error
            </td>
        </tr>
    ) : (
        <>
            {
                (row.isExpanded)
                    ? (
                        data.map((x, i) => {
                            return (
                                <tr
                                    { ... rowProps }
                                    key={ `${ rowProps.key }-expanded-${ i }` }
                                >
                                    { row.cells.map((cell) => {
                                        return (
                                            <td { ... cell.getCellProps() } >
                                                {
                                                    cell.render(
                                                        cell.column.SubCell
                                                            ? "SubCell"
                                                            : "Cell", {
                                                            value:
                                                                cell.column.accessor &&
                                                                cell.column.accessor(x, i),
                                                            row: { ... row, original: x }
                                                        }
                                                    )
                                                }
                                            </td>
                                        );
                                    }) }
                                </tr>
                            );
                        })
                    ) : (null)
            }
        </>
    );
}

const SubRowAsync = ({ row, rowProps, visibleColumns }) => {
    const [ loading, setLoading ] = React.useState(true);
    const [ data, setData ] = React.useState([]);
    const [ error, setError ] = React.useState(null);

    React.useEffect(() => {
        let $ = true;

        console.debug("[Debug] Simulating Asynchronous Request ...");
        const State = new Promise((resolve) => {
            console.debug("[Debug]      - Establishing Lock ...");
            return setTimeout(async () => {
                const Evaluation = await Generator(3);
                resolve(Evaluation);
            }, 5 * 1000);
        });

        console.debug("[Debug]      - Initialized Promise ...");
        console.debug("[Debug]      - Waiting ...");

        State.then((response) => {
            ($) && setData(response);
            ($) && setLoading(false);
        }).catch((e) => {
            ($) && setError(e);
        });

        return () => ($ = false) && clearTimeout(State);
    }, []);

    return (
        <SubRows
            row={ row }
            rowProps={ rowProps }
            visibleColumns={ visibleColumns }
            data={ data }
            loading={ loading }
            error={ error }
        />
    );
};

function Table({ columns, data, renderer, ... properties }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        visibleColumns,
        state
    } = useTable({
        columns, data,
        initialState: {
            sortBy: []
        }
    }, useSortBy, useExpanded);

    console.debug("[Debug] State" + ":", state);
    console.debug("[Debug] Properties" + ":", properties);

    return (
        <table { ... getTableProps() } className={ [ "cds--data-table", "cds--data-table--normal", "cds--data-table--no-border" ].join(" ") }>
            <thead>
                { headerGroups.map((headerGroup) => (
                    <tr { ... headerGroup.getHeaderGroupProps() }>
                        { headerGroup.headers.map((column) => (
                            <th className={ "cds--table-expand" } { ... column.getHeaderProps() }>{
                                (column.id !== "expander") && (
                                    <button onClick={ (event) => {
                                        console.log("[Debug] Click-Event (Event)" + ":", event);
                                        console.log("[Debug] Click-Event (Column)" + ":", column);

                                        const $ = (column.sortDescFirst === false)
                                            ? undefined
                                            : column.sortDescFirst === false;

                                        column.toggleSortBy($);
                                    } }
                                    >
                                        {
                                            column.render("Header")
                                        }
                                    </button>
                                ) }</th>
                        )) }
                    </tr>
                )) }
            </thead>
            <tbody { ... getTableBodyProps() }>
                { rows.map((row, i) => {
                    prepareRow(row);
                    const rowProps = row.getRowProps();
                    return (
                        // Use a React.Fragment here so the table markup is still valid
                        <React.Fragment key={ rowProps.key }>
                            <tr { ... rowProps }>
                                { row.cells.map(cell => {
                                    return (
                                        <td { ... cell.getCellProps() }>{ cell.render("Cell") }</td>
                                    );
                                }) }
                            </tr>
                            {
                                row?.isExpanded && renderer(
                                    { row, rowProps, visibleColumns }
                                )
                            }
                        </React.Fragment>
                    );
                }) }
            </tbody>
        </table>
    );
}

const Component = () => {
    const columns = React.useMemo(() => Columns(), []);
    const data = React.useMemo(() => Generator(20), []);
    const renderer = React.useCallback(
        ({ row, rowProps, visibleColumns }) => {
            return (
                <SubRowAsync
                    row={ row }
                    rowProps={ rowProps }
                    visibleColumns={ visibleColumns }
                />
            );
        }, []
    );

    return (<Table columns={ columns } data={ data } renderer={ renderer }/>);
};

export default Component;