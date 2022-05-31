import React from "react";

import Styles from "./SCSS/Index.module.scss";

import {
    Pagination,
    PaginationSkeleton
} from "@carbon/react";

export const Skeleton = () => {
    return (
        <PaginationSkeleton className={ Styles }/>
    );
};

const Component = ({ Pages }) => {
    return (
        <Pagination
            className={ Styles.component }
            backwardText="Previous"
            forwardText="Next"
            itemsPerPageText="Total Paged Items"
            pageNumberText="Page Number"
            pageSize={ Pages.Size }
            /// pageSizes={ [5, 10, 15, 25, 50, 100, 1000] }
            pageSizes={ [ 20 ] }
            totalItems={ Pages.Total }
            page={ Pages.Index.Data }
            onChange={ (Data) => Pages.Index.Setter(Data.page) }
        />);
};

export default Component;
