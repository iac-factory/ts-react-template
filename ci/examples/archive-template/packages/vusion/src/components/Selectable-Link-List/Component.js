import "./SCSS/Index.scss";

import { Book } from "@carbon/icons-react";
import PropTypes from "prop-types";
import React, { useEffect } from "react";

import Styles from "./SCSS/Index.module.scss";

import { Tag } from "@carbon/react";

import {
    StructuredListBody,
    StructuredListCell,
    StructuredListHead,
    StructuredListRow,
    StructuredListWrapper,
    Button
} from "@carbon/react";

import { default as Stringify } from "./Strings";

import cx from "classnames";

const Default = {
    Tags: [
        "Tag-1",
        "Tag-2",
        "Tag-3"
    ]
};

/***
 *
 * @param rows {Number}
 *
 * @returns {JSX.Element}
 *
 * @constructor
 *
 */

const Component = ({ rows, data }) => {
    const Columns = [
        "Articles",
        ""
    ];

    const Generator = (rows) => {
        return Array.apply(null, Array(rows)).map((Row, r) => {
            const ID = Stringify.rowID(r);

            // useEffect(() => {
            //     const Element = document.getElementById(ID);
            //     Element.addEventListener("click", (event) => {
            //         const Row = event.target.parentElement;
            //         console.debug("[Debug]", "Event Click", Row);
            //     });
            // });

            const Mapping = (
                <StructuredListRow id={ ID } key={ Stringify.rowKey(r) } className={ Styles.row }>
                    {
                        Columns.map(
                            (Column, c) => {
                                return (
                                    <StructuredListCell id={ Stringify.columnID(r, c) }
                                        key={ Stringify.columnKey(r, c) }
                                        className={ (c === 0) ? cx("primary-data-column") : cx("auxiliary-data-column") }
                                    >
                                        {
                                            (c === 0) ? (
                                                <div>
                                                    <h3>
                                                        Name: Title Name
                                                    </h3>
                                                    <p>
                                                        Author: Jacob B. Sanders
                                                    </p>
                                                    <p>
                                                        Time: 7 Minutes
                                                    </p>
                                                    <p style={ { marginTop: "0.5rem" } }>
                                                        Robotic process automation (RPA) helps the retail sector streamline critical workflows.
                                                    </p>
                                                    <Button size={ "small" } className={ "data-table-row-selection-navigator" }>
                                                        Read
                                                    </Button>
                                                </div>
                                            ) : (
                                                Default.Tags.map(($, iterator) => {
                                                    return (
                                                        <Tag title={ $ } key={ iterator } filter={ true } className={ Styles.tag }>
                                                            {
                                                                $
                                                            }
                                                        </Tag>
                                                    );
                                                })
                                            )
                                        }
                                    </StructuredListCell>
                                );
                            }
                        )
                    }
                </StructuredListRow>
            );

            return Mapping;
        });
    };

    return (
        <StructuredListWrapper selection>
            <StructuredListHead>
                <StructuredListRow head>
                    {
                        Columns.map(
                            ($, Index) => {
                                return (
                                    <StructuredListCell id={ Stringify.columnID(Index) } key={ Stringify.columnKey(Index) } head>
                                        {
                                            Columns[Index] /// --> $
                                        }
                                    </StructuredListCell>
                                );
                            }
                        )
                    }
                </StructuredListRow>
            </StructuredListHead>
            <StructuredListBody className={ Styles.body }>
                {
                    Generator(rows)
                }
            </StructuredListBody>
        </StructuredListWrapper>
    );
};

Component.propTypes = {
    /***
     * Number of Total Rows to Generate Strictly-Alike Data
     */

    rows: PropTypes.number.isRequired
};

export default Component;