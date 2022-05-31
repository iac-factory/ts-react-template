import React from "react";

import Styles from "./SCSS/Paginator.module.scss";

import {
    Pagination,
    PaginationSkeleton
} from "@carbon/react";

export const Skeleton = () => {
    return (
        <PaginationSkeleton className={ [ Styles.skeleton, "cds--pagination--inline--skeleton" ].join(" ") }/>
    );
};

// const Component = ({Pages}) => {
//     return (
//         <Pagination
//             className={Styles.paginator}
//             backwardText="Previous"
//             forwardText="Next"
//             itemsPerPageText="Total Paged Items"
//             pageNumberText="Page Number"
//             pageSize={Pages.Size}
//             /// pageSizes={ [5, 10, 15, 25, 50, 100, 1000] }
//             pageSizes={[20]}
//             totalItems={Pages.Total}
//             page={Pages.Index.Data}
//             onChange={(Data) => Pages.Index.Setter(Data.page)}
//         />);
// };

const Component = ({ Data, currentPageSize, setCurrentPageSize, setFirstRowIndex }) => {
    return (
        <Pagination
            className={ Styles.paginator }
            backwardText={ "Previous" }
            forwardText={ "Next" }
            itemsPerPageText={ "Total Paged Item(s)" }
            pageSize={ currentPageSize }
            pageNumberText={ "Page Number" }
            pageSizes={ [ 5, 10, 15, 25, 50, 100, 1000 ] }
            totalItems={ Data.length }
            onChange={ ({ page, pageSize }) => {
                if (pageSize !== currentPageSize) {
                    setCurrentPageSize(pageSize);
                }
                setFirstRowIndex(pageSize * (page - 1));
            } }
        />
    );
};

export default Component;
