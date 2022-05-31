import * as Types from "prop-types";

import {
    DataTableSkeleton,
    PaginationSkeleton,
    BreadcrumbSkeleton
} from "carbon-components-react";


import React from "react";

const Table = ({Rows = 20, Headers = 6}) => (
    <DataTableSkeleton
        compact={false}
        columnCount={Headers}
        rowCount={Rows}
        className={"io-data-table-skeleton-container"}
        showHeader={true}
        showToolbar={true}
        zebra={false}
    />
);

Table.propTypes = {
    Rows: Types.number,
    Headers: Types.number
};

export default Table;
