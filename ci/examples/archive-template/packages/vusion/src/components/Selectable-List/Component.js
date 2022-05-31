import PropTypes from "prop-types";

import Styles from "./SCSS/Index.module.scss";

import {
    StructuredListBody,
    StructuredListCell,
    StructuredListHead,
    StructuredListInput,
    StructuredListRow,
    StructuredListWrapper
} from "@carbon/react";

import { CheckmarkFilled } from "@carbon/icons-react";

import { default as Stringify } from "./Strings";

/***
 *
 * @param rows {Number}
 *
 * @returns {JSX.Element}
 *
 * @constructor
 *
 */

const Component = ({ rows }) => {
    const Columns = [
        "Column-1",
        "Column-2",
        "Column-3"
    ];

    const Generator = (rows) => {
        return Array.apply(null, Array(rows)).map((Row, r) => (
            <StructuredListRow id={ Stringify.rowID(r) } key={ Stringify.rowKey(r) }>
                {
                    Columns.map(
                        (Column, c) => {
                            return (
                                <StructuredListCell id={ Stringify.columnID(r, c) } key={ Stringify.columnKey(r, c) }>
                                    Row { r + 1 } ::: Column { c + 1 }
                                </StructuredListCell>
                            );
                        }
                    )
                }
                <StructuredListInput
                    title={ Stringify.title(r) }
                    name={ Stringify.name(r) }
                    checked={ !r || null }
                    /// value={ !r || "" }
                />
                <StructuredListCell>
                    <CheckmarkFilled
                        className={ "cds--structured-list-svg" }
                        aria-label="Select a Row"
                    >
                        <title>Select</title>
                    </CheckmarkFilled>
                </StructuredListCell>
            </StructuredListRow>
        ));
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
            <StructuredListBody>
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