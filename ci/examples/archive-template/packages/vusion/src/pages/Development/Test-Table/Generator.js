import Names from "./First-Names";
import Surnames from "./Last-Names";

import { UUID } from "../../../utilities/UUID-V4.js";

/***
 *
 * @param length
 *
 * @returns {Array<Number>}
 *
 */

const range = (length) => {
    /***
     *
     * @type {[Number]}
     *
     */

    const $ = [];

    let i = 0;

    for (i; i < length; i++) {
        $.push(i);
    }

    return $;
};

const Age = (minimum, maximum) => {
    return Number(Math.random() * (maximum - minimum) + minimum).toFixed(0);
};

/***
 *
 * @param minimum
 *
 * @param maximum
 *
 * @returns {string}
 *
 * @constructor
 *
 */

const Height = (minimum, maximum) => {
    return Number(Math.random() * (maximum - minimum) + minimum).toFixed(3);
};

/***
 *
 * @param maximum {Number}
 *
 * @returns {Number}
 *
 * @constructor
 *
 */

const Index = (maximum) => {
    const Value = Number(Math.random() * (maximum)).toFixed(0);

    const Cast = Number(Value);

    console.debug("[Debug]", "Casted String ==> Number Index" + ":", Cast);

    return Cast;
};

/***
 *
 * @type {{"First-Names": [String], "Last-Names": [String]}}
 *
 */

const Data = {
    "First-Names": Names.Data,
    "Last-Names": Surnames.Data
};

/***
 *
 * @type {{MARRIED: string, OTHER: string, random: (function(): string), SINGLE: string, NULL: null}}
 *
 */

const Marital = {
    SINGLE: "Single",
    MARRIED: "Married",
    OTHER: "Other",

    NULL: null,

    /***
     *
     * @returns {string}
     *
     * @constructor
     *
     */

    random: () => {
        return [
            Marital.SINGLE,
            Marital.MARRIED,
            Marital.OTHER
        ][Index(2)];
    }
};

/***
 * @param index {Number}
 *
 * @param UID {String}
 * @param UUID {String}
 *
 * @param First {String}
 * @param Last {String}
 *
 * @param Age {String}
 * @param Height {String}
 *
 * @param Marital {Marital}
 *
 * @returns {{Height: String, UUID: String, Age: String, Name: {Last: String, First: String}, Marital: Marital, index: Number}}
 *
 * @type {function(String): {Height: String, UUID: String, Age: String, Name: {Last: String, First: String}, Marital: Marital, index: Number}} Person
 *
 * @constructor
 *
 */

export const Person = (
    {
        Name: {
            First = typeof String, Last = typeof String
        },
        Age = typeof String,
        Height = typeof String,

        UUID = typeof String,
        Marital = Marital.NULL,
        index = 0
    }
) => {
    return {
        Name: { First, Last }, Age, Height, UUID, Marital, index
    };
};

/***
 *
 * @param Total {Number}
 *
 * @returns {[Person]}
 *
 * @constructor
 *
 */

export const Generator = (Total) => {
    console.debug("[Debug]", "Total First Name(s)", Data["First-Names"].length);
    console.debug("[Debug]", "Total Last Name(s)", Data["Last-Names"].length);

    /***
     *
     * @type {Array<Person>}
     *
     */

    const $ = [];

    let i = 0;
    for (i; i < Total; i++) {
        const Instance = Person({
            Name: {
                First: Data["First-Names"][Index(Total)],
                Last: Data["Last-Names"][Index(Total)]
            }, Age: Age(18, 99),
            Height: Height(36, 100),

            UUID: UUID(),

            Marital: Marital.random(),

            index: i
        });

        $.push(Instance);
    }

    return $;
};

export default Generator;
