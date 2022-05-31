import React from "react";

import {
    DataTable,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableHeader,
    TableRow,
    Button
} from "@carbon/react";

import {
    Icon, Edit
} from "@carbon/icons-react";

const Editor = () => {
    return (
        <Edit style={{fill: "white"}}/>
    );
}

const Component = ({rows, headers}) => {
    return (
        <DataTable
            rows={rows}
            headers={headers}
            render={({
                         rows,
                         headers,
                         getRowProps,
                         getTableProps,
                     }) => (
                <TableContainer>
                    <Table {...getTableProps()}>
                        <TableHead>
                            <TableRow>
                            {
                                headers.map((header, index) => (
                                    <TableHeader key={"Table-Row-Header" + "-" + "Key" + "-" + String(index)} id={"Table-Row-Header" + "-" + "ID" + "-" + String(index)} colSpan={2}>
                                        {header.header}
                                    </TableHeader>
                                ))
                            }
                                <TableHeader key={"Table-Action-Row-Header"} id={"Table-Row-Header"} style={{width: "200px"}}/>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow {...getRowProps({row})} key={"Table-Row" + "-" + String(index)} id={"Table-Row" + "-" + "ID" + "-" + String(index)}>
                                    {
                                        row.cells.map((cell, index) => (
                                            <TableCell colSpan={2} key={"Table-Cell" + "-" + String(index)} id={"Table-Cell" + "-" + "ID" + "-" + String(index)}>
                                                {
                                                    cell.value
                                                }
                                            </TableCell>
                                        ))
                                    }
                                    <TableCell key={"Table-Row-Action" + "-" + String(index)} id={"Table-Row-Action"}>
                                        {
                                            (
                                                <>
                                                    <Button className={"io-inline-table-column-button-item io-hidden-assistive-text"} size={"sm"} tooltipAlignment={"center"} renderIcon={() => (<Editor/>)} tooltipPosition={"right"} iconDescription={"..."} tabIndex={0} isExpressive={false} kind={"secondary"} hasIconOnly={true}/>
                                                    <Button className={"io-inline-table-column-button-item io-hidden-assistive-text"} size={"sm"} tooltipAlignment={"center"} renderIcon={() => (<Editor/>)} tooltipPosition={"right"} iconDescription={"..."} tabIndex={0} isExpressive={false} kind={"secondary"} hasIconOnly={true}/>
                                                    <Button className={"io-inline-table-column-button-item io-hidden-assistive-text"} size={"sm"} tooltipAlignment={"center"} renderIcon={() => (<Editor/>)} tooltipPosition={"right"} iconDescription={"..."} tabIndex={0} isExpressive={false} kind={"secondary"} hasIconOnly={true}/>
                                                </>
                                            )
                                        }
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        />
    );
};

export default Component;