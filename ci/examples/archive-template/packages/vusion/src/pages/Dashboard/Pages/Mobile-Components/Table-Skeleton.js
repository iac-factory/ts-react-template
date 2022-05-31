import "./SCSS/Table-Skeleton.scss";

import * as Types from "prop-types";

import {
    DataTableSkeleton,
    PaginationSkeleton,
    TableContainer
} from "@carbon/react";


import React from "react";

const Table = ({Rows = 20, Headers = 6}) => (
    <TableContainer
        className={"io-table-editor-skeleton"}>
        <DataTableSkeleton
            compact={false}
            columnCount={Headers}
            rowCount={Rows}
            showHeader={true}
            showToolbar={true}
            zebra={false}
        />
    </TableContainer>
);

Table.propTypes = {
    Rows: Types.number,
    Headers: Types.number
};

export default Table;
