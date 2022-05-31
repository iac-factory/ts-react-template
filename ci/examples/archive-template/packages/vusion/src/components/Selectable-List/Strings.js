const State = {};

State.base = "structured-list-input";

/***
 *
 * @param index: {Number}
 *
 * @return {String}
 *
 * @constructor
 *
 */

State.identifier = (index) => {
    const quantifier = "identifier";

    const value = [ State.base, quantifier, String(index + 1) ].join("-");

    return value;
}

/***
 *
 * @param index: {Number}
 *
 * @return {String}
 *
 * @constructor
 *
 */

State.value = (index) => {
    const quantifier = "";

    const value = [ State.base, quantifier, String(index + 1) ].join("-");

    return value;
}

/***
 *
 * @param index: {Number}
 *
 * @return {String}
 *
 * @constructor
 *
 */

State.title = (index) => {
    const quantifier = "title";

    const value = [ State.base, quantifier, String(index + 1) ].join("-");

    return value;
}

/***
 *
 * @param index: {Number}
 *
 * @return {String}
 *
 * @constructor
 *
 */

State.name = (index) => {
    const quantifier = "name";

    const value = [ State.base, quantifier, String(index + 1) ].join("-");

    return value;
}

/***
 *
 * @param index: {Number}
 *
 * @return {String}
 *
 * @constructor
 *
 */

State.checked = (index) => {
    const quantifier = "value";

    const value = [ State.base, quantifier, String(index + 1) ].join("-");

    return value;
}

/***
 *
 * @param row {Number}
 *
 * @param index {Number}
 *
 * @returns {string}
 *
 * @constructor
 *
 */

State.columnID = (row, index) => {
    return [ "structured-list", "row", String(row + 1), "column", String(index + 1) ].join("-");
}

/***
 *
 * @param row {Number}
 *
 * @param index {Number}
 *
 * @returns {string}
 *
 * @constructor
 *
 */

State.columnKey = (row, index) => {
    return [ "structured-list-key", "row", String(row + 1), "column", String(index + 1) ].join("-");
}

/***
 *
 * @param index {Number}
 *
 * @returns {string}
 *
 * @constructor
 *
 */

State.rowID = (index) => {
    const display = index + 1;

    return "structured-list-row" + "-" + String(display);
}

/***
 *
 * @param index {Number}
 *
 * @returns {string}
 *
 * @constructor
 *
 */

State.rowKey = (index) => {
    const display = index + 1;

    return "structured-list-row-index" + "-" + String(display);
}

export default State;
