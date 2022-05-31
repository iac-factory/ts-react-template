import Request from "axios";
import Forage from "localforage";

const STORE = "JWT";
const NAME = "Nexus-UI";
const DESCRIPTION = "Nexus Dashboard Login State";

const Debug = (
    "production" !== process.env["NODE_ENV"]
);

const URL = process.env.REACT_APP_API_ENDPOINT;

/***
 * API Basic Authentication Endpoint + JWT Generator
 *
 * The following URL -- upon successful authentication -- will return a newly
 * generated JWT authorization token.
 *
 * @type {string}
 *
 */

const Authorizer = URL + "/authorization/login";

/***
 * HTTP Request Cancellation Handler
 *
 * Without the following cancellation token, React-based front-ends will warn
 * against memory leaks; additionally, the cancellation token is used to avoid
 * difficult to debug errors and endless request loops.
 *
 * @type {function(): CancelTokenSource}
 *
 */

const Cancellation = () => Request.CancelToken.source();

const Store = Forage.createInstance({
    name: NAME,
    storeName: STORE,
    description: DESCRIPTION
});

export const API = Request.create({});

/***
 *
 * Authentication Entry Point
 *
 * @param Payload {{Username: null|String, Password: null|String}}
 * @param Handler {CancelTokenSource}
 *
 * @returns {Promise<null|{Loading: boolean, Data: null, Error: boolean}>}
 *
 * @constructor
 *
 */

const Authenticate = async (Payload, Handler) => {
    const Return = {
        Data: null,
        Loading: true,
        Error: false,
        Status: {
            Code: -1,
            Message: ""
        }
    };

    (Debug) && console.debug("[Debug] Submitting Authentication Payload", Payload);

    const $ = async () => await API.post(Authorizer, {
        Grant: "Password",
        Username: Payload.Username,
        Password: Payload.Password
    }, {
        cancelToken: Handler.token
    }).then((Data) => {
        (Debug) && console.debug("[Debug] Response Data", Data);
        (Debug) && console.debug("[Debug] JWT Authorization Data", Data.data);
        (Debug) && console.debug("[Debug] JWT Authorization Return Headers", Data.headers);

        Return.Error = false;
        Return.Data = {
            Payload: Data.data,
            Headers: Data.headers,
            Status: {
                Code: Data.status,
                Message: Data.statusText
            }
        };

        Return.Status.Code = Data.status;
        Return.Status.Message = Data.statusText;

        try {
            (Debug) && console.debug("[Debug] Authentication Object", Return);
            (Debug) && console.debug("[Debug]", "JWT Token (Pre-Storage Setter)", Return.Data.Payload["JWT"]);

            return Store.setItem(STORE, Return.Data.Payload["JWT"], (error, value) => {
                if (error) console.error("[Fatal Error] Unknown Exception", error);
                (error)
                    ? Handler.cancel("Unknown Error Establishing JWT Token")
                    : (Debug) && console.debug("[Debug]", "Established JWT Token in Storage", value);
            });
        } catch (error) {
            (Debug) && console.debug("[Warning] Unsuccessful JWT Token Create Event", error);

            Return.Error = error;

            Handler.cancel("Error Establishing JWT Token");

            return Store.clear((e) => {
                if (e) {
                    (Debug) && console.error("[Fatal Error] Unknown Exception", e);
                }
                (Debug) && console.debug("[Debug]", "Removed Stale JWT Token(s) from Storage");
            });
        }
    }).finally(() => Return.Loading = false);

    (Debug) && console.debug("[Debug]", "Initializing Authorization Awaitable ...");

    // @Task --> Try Catch
    (Debug) && console.debug("[Debug] Authorizer" + ":", Authorizer);

    await $();

    (Debug) && console.debug("[Debug]", "Awaitable Complete", "Session Storage Awaitable(s) ?:= Complete");

    return Return;
};

export { Authenticate, Cancellation, Authorizer, Store };

export default Authenticate;