import PropTypes from "prop-types";
import React from "react";

import { Navigate } from "react-router-dom";

import { Validator } from "./../components/Loader";

const Request = require("axios");

import Forage from "localforage";

const NAME = "Nexus-UI";
const DESCRIPTION = "Nexus Dashboard Login State";
const STORE = "JWT";

const URL = process.env.REACT_APP_API_ENDPOINT;
const Deserialize = URL + "/v1/authorization";

const Cancellation = Request.CancelToken;

const Store = Forage.createInstance({
    name: NAME,
    storeName: STORE,
    description: DESCRIPTION
});

//export const Store = Forage.createInstance({
//    name: NAME,
//    storeName: STORE,
//    description: DESCRIPTION,
//    driver: Forage.INDEXEDDB || Forage.defineDriver(Local) || Forage.LOCALSTORAGE
//});

const API = Request.create({});

/***
 *
 * @param Token
 * @param Handler
 *
 * @returns {Promise<{Status: {Message: string, Code: number}, Loading: boolean, Error: boolean, Data: null}>}
 *
 * @constructor
 */
const Validate = async (Token, Handler = Cancellation.source()) => {
    const Validation = {
        Data: null, // { JWT: String, Type: String ... }
        Loading: true,
        Error: false,
        Status: {
            Code: -1,
            Message: ""
        }
    };

    try {
        const $ = await API.post(Deserialize, {
            Token
        }, {
            headers: {
                "Authorization": [ "Bearer", Token ].join(" ")
            }, cancelToken: Handler.token
        }).then(async (Response) => {
            console.debug("[Debug]", "Authorization Validation Context");
            console.debug("[Debug]", "Contextual Response", Response);

            Validation.Data = Response.data;
            Validation.Error = null;

            Validation.Status.Code = Response.status;
            Validation.Status.Message = Response.statusText;

            await Store.setItem(STORE, (Validation.Data["Token"]["JWT"]), (e, value) => {
                (e) && console.error("[Fatal Error] Unknown Exception", e);
                if (value === null || value === undefined) {
                    const error = new Error("Unknown, Fatal Error" + JSON.stringify(e, null, 4));
                    error.name = "Fatal-Unknown-Error";
                    throw error;
                }

                console.debug("[Debug]", "Established JWT Token in Storage", value);
            });
        }).catch((error) => {
            Validation.Data = null;
            Validation.Error = error;

            console.debug("[Debug]", "Clearing Session Storage ...");

            return Store.clear((e) => {
                if (e) console.error("[Fatal Error] Unknown Exception", e);
                console.debug("[Debug]", "Removed Stale JWT Token(s) from Storage");
            });
        });

        await $;

        console.debug("[Debug]", "Awaitable Complete", "Session Storage Awaitable(s) ?:= Complete");
    } catch (e) {
        console.error("[Fatal Error (2)]", "@Unknown, Uncaught Error", e);

        Handler.cancel("Invalid JWT Token or Response");
    } finally {
        Validation.Loading = false;
    }

    return Validation;
};

const Token = async (Handler) => {
    console.debug("[Debug]", "Retrieving JWT Token from Storage ...");
    const Schema = await Store.getItem(STORE);
    console.debug("[Debug]", "JWT", Schema);

    if (Schema !== null) {
        const $ = await Validate(Schema, Handler);

        return $.Status;
    } else {
        return null;
    }
};

const JWT = async () => {
    console.debug("[Debug] Indexing Session Storage" + ":", STORE);
    const Token = await Store.getItem(STORE);
    console.debug("[Debug] Session Token" + ":", Token);

    return Token;
};

/***
 *
 * Wrapper Redirect for Authorization-Only Component Page(s)
 *
 * @param Page {React.ExoticComponent}
 * @param Session {Boolean}
 * @param description {String}
 *
 * @returns {JSX.Element} Authorizer
 *
 * @constructor
 *
 */

const Authorizer = ({ Page, Session, description }) => {
    if (Page === null) {
        throw Error("Page Cannot be Null");
    }

    if (Session === null) {
        throw Error("Authorization Session Cannot be Null");
    }

    if (description === null) {
        throw Error("Page Loader's Description Cannot be Null");
    }

    return (
        <Validator>
            {
                (Session === true)
                    ? (<Page description={ description }/>)
                    : (<Navigate to={ "/login" }/>)
            }
        </Validator>
    );
};

Authorizer.defaultProps = {
    Session: null,
    description: "Loading Page ..."
};

Authorizer.propTypes = {
    /***
     * @type {React.ExoticComponent}
     * @requires {React.ExoticComponent}
     */
    Page: PropTypes.object.isRequired,

    /***
     * @type {Boolean|null}
     * @requires {Boolean|null}
     */
    Session: PropTypes.oneOf([ true, false, null ]),

    /***
     * @type {String}
     * @requires {String}
     */
    description: PropTypes.string
};

export {
    Cancellation,
    Store,
    STORE,
    Validate,
    Token,
    JWT,
    Authorizer
};

export default Authorizer;