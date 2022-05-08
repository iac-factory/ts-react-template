import React from "react";

import { Column } from "react-table";

interface Callable<$> {
    (): Column;
}

const Component: () => ( { Header: string; accessor: string } )[] = () => {
    /// Column Definitions
    return React.useMemo(
        () => [
            {
                Header: "Column 1",
                accessor: "column-1" // Accessor "key" Data
            },
            {
                Header: "Column 2",
                accessor: "column-2"
            }
        ],
        []
    );
};

export { Component as Columns };

export default Component;
