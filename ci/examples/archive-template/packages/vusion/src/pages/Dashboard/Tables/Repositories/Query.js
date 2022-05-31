import { useState, useEffect    } from "react";

const Request = require("axios");
const Adapter = require("axios-cache-interceptor");
const Forage =  require("localforage");

const STORE = "Gitlab-Project-Pages";
const NAME = "Nexus-UI";
const DESCRIPTION = "Cache Key-Value Table for VCS";

const Cancellation = Request.CancelToken.source();

const Store = Forage.createInstance({
    name: NAME,
    storeName: STORE,
    description: DESCRIPTION,
    driver: Forage.INDEXEDDB
});

const Cache = Adapter({
    /// excludeFromCache: true, // --> Debugging
    debug: false,               // --> Debugging
    clearOnStale: true,
    ignoreCache: false,
    limit: false,
    clearOnError: true,
    readHeaders: true,
    readOnError: true,
    maxAge: 5 * 60 * 1000,
    store: Store
});

const API = Request.create({
    adapter: Cache.adapter,
    cache: Cache,
    cancelToken: Cancellation.token
});

export const Methods = [
    "get",      "GET",
    "delete",   "DELETE",
    "head",     "HEAD",
    "options",  "OPTIONS",
    "post",     "POST",
    "put",      "PUT",
    "patch",    "PATCH",
    "purge",    "PURGE",
    "link",     "LINK",
    "unlink",   "UNLINK"
];

export const Responses = {
    Buffer:     "arraybuffer",
    Binary:     "blob",
    DOM:        "document",
    JSON:       "json",
    Text:       "text",
    Stream:     "stream"
};

/*** Example Implementation
 * =========================
 * >>> class Example extends Base {
 * >>>     constructor(props) {
 * >>>         super(props);
 * >>>     };
 * >>>
 * >>>    static URL = "/API/Gitlab/Projects";
 * >>>
 * >>>    static Request = () => {
 * >>>        const Query = () => {
 * >>>            const [data, setData] = useState(null);
 * >>>            const [loading, setLoading] = useState(null);
 * >>>            const [error, setError] = useState(null);
 * >>>            useEffect(() => {
 * >>>                let ignore = false;
 * >>>                const fetch = async () => {
 * >>>                    setLoading(true);
 * >>>                    try {
 * >>>                        setError({});
 * >>>                        const response = await Request(Example.URL, {
 * >>>                            method: "GET",
 * >>>                            timeout: 30000,
 * >>>                            withCredentials: false,
 * >>>                            responseType: Responses.JSON,
 * >>>                            onUploadProgress: async () => console.log("Upload in Progress"),
 * >>>                            onDownloadProgress: async () => console.log("Download in Progress")
 * >>>                        });
 * >>>                        console.debug(response);
 * >>>                        if (!ignore) setData(response.data);
 * >>>                    } catch (err) {
 * >>>                        setError(err);
 * >>>                    }
 * >>>                    setLoading(false);
 * >>>                }; fetch().then().finally();
 * >>>                return (() => { ignore = true; });
 * >>>            }, [URL]);
 * >>>            return { data, loading, error };
 * >>>         };
 * >>>         return Query(URL);
 * >>>     };
 * >>>
 * >>>     static Awaitable = () => {
 * >>>         const { data, loading, error } = Example.Request();
 * >>>         return {
 * >>>             Response: data,
 * >>>             Waiter: loading,
 * >>>             Error: error
 * >>>         };
 * >>>     };
 */

class Base extends Object {
    static URL = null;
    static Store = null;
    static Cache = null;

    static API = null;

    static Request = () => null;
    static Awaitable = () => null;
}

export class AIO extends Base {
    static URL = process.env.REACT_APP_API_ENDPOINT + "/API/Gitlab/Projects";

    static Request = () => {
        const Query = (URL) => {
            const [data, setData] = useState({});
            const [loading, setLoading] = useState(true);
            const [error, setError] = useState(null);

            useEffect(() => {
                let ignore = false;
                const fetch = async () => {
                    setLoading(true);

                    try {
                        setError({});

                        const Awaitable = { Value: null };

                        await Store.getItem(STORE).then((Key) => {
                            if (Key !== null) {
                                console.debug("[DEBUG]", "Cache Hit");

                                setData(Key);
                                Awaitable["Value"] = Key;
                                ignore = true;
                            }
                            else {
                                console.debug("[DEBUG]", "Cache Miss");
                            }
                        }).catch((error) => console.debug(
                            "[DEBUG]",
                            "Void Cache-Key Look-Up",
                            "Warning", error
                        ));

                        const Handler = async () => {
                            if (Awaitable.Value !== null) {
                                await Store.setItem(STORE, Awaitable.Value);
                            }
                        }; await Handler().then(async () => {
                            if (ignore === false) {
                                const response = API.get(URL, {
                                    method: "GET",
                                    timeout: 30000,
                                    withCredentials: false,
                                    responseType: Responses.JSON,
                                    onUploadProgress: async () => console.log("[DEBUG]", "Upload in Progress"),
                                    onDownloadProgress: async () => console.debug("[DEBUG]", "Download in Progress")
                                }).catch((error) => (console.debug("[DEBUG]", "API-Request", "Projects", "Error", error))).finally(
                                    () => {
                                        console.debug("[DEBUG]", "Query Awaitable Complete");
                                    }
                                );

                                const Result = await response;

                                const Collection = Result.data;

                                await Store.setItem(STORE, Collection);

                                if (!ignore) setData(Collection);
                            }
                        });
                    } catch (error) {
                        console.debug("[DEBUG]", error);
                        await Store.clear();
                        console.debug("[DEBUG]", "Cache", "Projects", "Cleared");
                    }

                    finally { setLoading(false); };

                }; fetch().then().finally();

                return (() => { ignore = true; });
            }, []);
            return { data, loading, error };
        };
        return Query(AIO.URL);
    };

    static Clear = async () => {
        await Store.clear();
    }

    static Awaitable = () => {
        const { data, loading, error } = AIO.Request();

        let total = 0;
        if (data !== null) {
            let iterator = 0;
            for (iterator; iterator < data.length; iterator++) {
                total += data[iterator].length;
            }
        }

        return {
            Response: data,
            Waiter: loading,
            Error: error,
            Total: total
        };
    };
};

export default AIO;

export const State = AIO.Awaitable;
