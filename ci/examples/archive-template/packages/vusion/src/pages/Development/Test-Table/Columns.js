import React from "react";

import { Person } from "./Generator.js";

import { ChevronDown, ChevronRight } from "@carbon/icons-react";

/***
 *
 * @returns {[{SubCell: (function(): null), Header: (function(): null), id: string, Cell: (function({row: *}))}, {Header: string, columns: [{SubCell: (function(*)), Header: string, accessor: (function(*): string|*)}, {Header: string, accessor: (function(*): string|*)}]}, {Header: string, columns: [{Header: string, accessor: (function(Person): string|String|*)}, {Header: string, accessor: (function(Person): *)}, {Header: string, accessor: (function(Person): string|Marital|*)}]}]}
 *
 * @constructor
 *
 */

const Columns = (index) => {
    return [
        {
            id: "expander", // @required
            // Cell := Expander
            Header: () => null,
            Cell: ({ row }) => {

                console.debug("[Debug] Row Data" + ":", row);

                return (
                    // Use Cell to render an expander for each row.
                    // We can use the getToggleRowExpandedProps prop-getter
                    // to build the expander.
                    <span { ... row.getToggleRowExpandedProps() }>
                        { (index !== 0) && row.isExpanded ? (<ChevronDown/>) : (<ChevronRight/>) }
                    </span>
                );
            },
            // We can override the cell renderer with a SubCell to be used with an expanded row
            SubCell: () => null // No expander on an expanded row
        },
        {
            id: "first-name",
            Header: "First Name",
            // We re-map data using accessor functions for subRows
            accessor: ($) => $.Name?.First,
            // We can render something different for subRows
            SubCell: (cellProps) => (
                <>🥳 { cellProps?.value } 🎉</>
            )
        },
        {
            id: "last-name",
            Header: "Last Name",
            accessor: ($) => $.Name?.Last
        },
        {
            id: "age",
            Header: "Age",
            /*** @param $ {Person} */
            accessor: ($) => $?.Age
        },
        {
            id: "height",
            Header: "Height",
            /*** @param $ {Person} */
            accessor: ($) => $?.Height
        },
        {
            id: "status",
            Header: "Status",
            /*** @param $ {Person} */
            accessor: ($) => $?.Marital
        }

        //        {
        //            Header: "Name",
        //            columns: [
        //                {
        //                    Header: "First Name",
        //                    // We re-map data using accessor functions for subRows
        //                    accessor: ($) => $.Name?.First,
        //                    // We can render something different for subRows
        //                    SubCell: (cellProps) => (
        //                        <>🥳 { cellProps.value } 🎉</>
        //                    )
        //                },
        //                {
        //                    Header: "Last Name",
        //                    accessor: ($) => $.Name?.Last
        //                }
        //            ]
        //        },
        //        {
        //            Header: "Information",
        //            columns: [
        //                {
        //                    Header: "Age",
        //                    /*** @param $ {Person} */
        //                    accessor: ($) => $.Age
        //                },
        //                {
        //                    Header: "Height",
        //                    /*** @param $ {Person} */
        //                    accessor: ($) => $.Height
        //                },
        //                {
        //                    Header: "Status",
        //                    /*** @param $ {Person} */
        //                    accessor: ($) => $.Marital
        //                }
        //            ]
        //        }
    ];
};

export default Columns;