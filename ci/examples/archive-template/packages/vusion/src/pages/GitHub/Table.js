import React from "react";

import Styles from "./SCSS/Table.module.scss";

import {
    DataTable,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableExpandHeader,
    TableHeader,
    TableBody,
    TableExpandRow,
    TableCell,
    TableExpandedRow,
    TableSelectAll,
    TableSelectRow
} from "@carbon/react";

const Tabular = ({ rows, headers }) => {
    const getRowDescription = () => {
        return "[Repository Description Placeholder]";
    };

    /// const getRowDescription = rowId => {
    ///     const row = rows.find(({ id }) => id === rowId);
    ///     return row ? (row.description) : "[Repository Description Placeholder]";
    /// };

    return (
        <DataTable
            rows={ rows }
            headers={ headers }
            render={ ({
                rows,
                headers,
                getHeaderProps,
                getRowProps,
                getTableProps,
                getExpandHeaderProps,
                getSelectionProps
            }) => (
                <TableContainer
                    title="[Title]"
                    description="[Description]"
                    className={ Styles.repoPageGithubDataTableContainer }
                >
                    <Table { ... getTableProps() }>
                        <TableHead>
                            <TableRow>
                                <TableExpandHeader enableToggle={ true } { ... getExpandHeaderProps() } />
                                <TableSelectAll { ... getSelectionProps() } />
                                <TableExpandHeader { ... getExpandHeaderProps() } />
                                {
                                    headers.map(
                                        (header) => (
                                            <TableHeader { ... getHeaderProps({ header }) }>
                                                {
                                                    header.header
                                                }
                                            </TableHeader>
                                        )
                                    )
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                rows.map((row) => (
                                    <React.Fragment key={ row.id }>
                                        <TableExpandRow { ... getRowProps({ row }) }>
                                            <TableSelectRow { ... getSelectionProps({ row }) } />
                                            <TableCell key={ "expand" }>{ "" }</TableCell>
                                            {
                                                row.cells.map((cell) => (
                                                    <TableCell key={ cell.id }>
                                                        {
                                                            cell.value
                                                        }
                                                    </TableCell>
                                                ))
                                            }
                                        </TableExpandRow>
                                        <TableExpandedRow colSpan={ headers.length + 3 }>
                                            <p>{ getRowDescription(row.id) }</p>
                                        </TableExpandedRow>

                                    </React.Fragment>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            ) }
        />
    );
};

export default Tabular;
