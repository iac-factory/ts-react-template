import * as Types from "prop-types";

import {
    DataTableSkeleton,
    PaginationSkeleton,
    TableContainer
} from "@carbon/react";


import React from "react";

const Table = ({Rows = 20, Headers = 6}) => (
    <TableContainer className={"io-primary-page-data-table-container-skeleton"}>
        <DataTableSkeleton
            className={"io-data-table-skeleton-container"}
            compact={false}
            columnCount={Headers}
            rowCount={Rows}
            showHeader={true}
            showToolbar={true}
            zebra={false}
        />
        <PaginationSkeleton className={"bx--pagination-skeleton-bottom"}/>
    </TableContainer>
);

Table.propTypes = {
    Rows: Types.number,
    Headers: Types.number
};

export default Table;
