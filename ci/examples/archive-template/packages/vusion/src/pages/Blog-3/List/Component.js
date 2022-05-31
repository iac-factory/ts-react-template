import { Button, StructuredListBody, StructuredListCell, StructuredListHead, StructuredListRow, StructuredListWrapper, Tag } from "@carbon/react";

import cx from "classnames";
import PropTypes from "prop-types";
import React from "react";

import * as Styles from "./SCSS/Index.module.scss";
import "./SCSS/Index.scss";

import { default as Stringify } from "./Strings";

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

            return (
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
        });
    };

    return (
        <StructuredListWrapper selection>
            <StructuredListHead className={ "blog-list-data-row-header" }>
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
