import PropTypes from "prop-types";

import {
    DataTableSkeleton,
    TableContainer
} from "@carbon/react";

import { Skeleton } from "./Paginator";

const Table = ({ Rows = 20, Headers = 6 }) => (
    <TableContainer>
        <DataTableSkeleton
            compact={ false }
            columnCount={ Headers }
            rowCount={ Rows }
            showHeader={ true }
            showToolbar={ true }
            zebra={ false }
        />
        <Skeleton/>
    </TableContainer>
);

Table.propTypes = {
    Rows: PropTypes.number,
    Headers: PropTypes.number
};

export default Table;
