import { default as axios } from "axios";

import { useState, useEffect } from "react";

import { JWT } from "./../../components/Authenticate.js";

const Adapter = require("axios-cache-interceptor");
const Forage = require("localforage");

const NAME = "Nexus-UI";
const DESCRIPTION = "Cache Key-Value Table for VCS";
export const STORE = "Gitlab-Project-Pages";

const Cancellation = axios.CancelToken.source();

Cancellation.Instantiate = () => axios.CancelToken.source();

export const Store = Forage.createInstance({
    name: NAME,
    storeName: STORE,
    description: DESCRIPTION,
    driver: Forage.INDEXEDDB
});

const Cache = Adapter({
    excludeFromCache: false, // --> Debugging
    debug: (
        process.env.NODE_ENV !== "production"
    ),
    clearOnStale: true,
    ignoreCache: true,
    limit: false,
    clearOnError: true,
    readHeaders: true,
    readOnError: true,
    maxAge: 5 * 60 * 1000,
    store: Store
});

const API = axios.create({
    adapter: Cache.adapter,
    cache: Cache,
    cancelToken: Cancellation.token
});

export const Methods = [
    "get", "GET",
    "delete", "DELETE",
    "head", "HEAD",
    "options", "OPTIONS",
    "post", "POST",
    "put", "PUT",
    "patch", "PATCH",
    "purge", "PURGE",
    "link", "LINK",
    "unlink", "UNLINK"
];

export class AIO {
    static URL = String(process.env.REACT_APP_API_ENDPOINT) + "/v1/gitlab/projects";

    static Request = () => {
        const Query = () => {
            const [ data, setData ] = useState({});
            const [ loading, setLoading ] = useState(true);
            const [ error, setError ] = useState(null);

            useEffect(() => {
                let ignore = false;

                const fetch = async () => {
                    setLoading(true);

                    try {
                        setError({});

                        const Awaitable = { Value: null };

                        await Store.getItem(STORE).then((Data) => {
                            if ( Data ) {
                                console.debug("[DEBUG]", "Cache Hit");

                                setData(Data);
                                Awaitable["Value"] = Data;
                                ignore = true;
                            } else {
                                console.debug("[DEBUG]", "Cache Miss");
                            }
                        }).catch((error) => console.debug(
                            "[DEBUG]",
                            "Void Cache-Key Look-Up",
                            "Warning", error
                        ));

                        const Handler = async () => {
                            if ( Awaitable.Value !== null ) {
                                await Store.setItem(STORE, Awaitable.Value);
                            }
                        };

                        await Handler().then(async () => {
                            if ( ignore === false ) {
                                const Token = await JWT();
                                const response = API.get(AIO.URL, {
                                    timeout: 30000,
                                    headers: {
                                        "Authorization": "Bearer" + " " + Token
                                    }
                                }).catch((error) => (
                                    console.debug("[DEBUG]", "API-Request", "Projects", "Error", error)
                                )).finally(
                                    () => {
                                        console.debug("[DEBUG]", "Query Awaitable Complete");
                                    }
                                );

                                const Result = await response;

                                const Collection = (
                                    Result && Result.data
                                ) ? Result.data : null;

                                await Store.setItem(STORE, Collection);

                                if ( !ignore ) setData(Collection);
                            }
                        });
                    } catch ( error ) {
                        console.debug("[DEBUG]", error);
                        await Store.clear();
                        console.debug("[DEBUG]", "Cache", "Projects", "Cleared");
                        ignore = true;
                    }

                    finally { setLoading(false); }

                };

                return (
                    ignore === false
                ) ? fetch()
                    : () => {
                        ignore = true;
                    };
            }, []);

            return { data, loading, error };
        };

        return Query();
    };

    static Clear = async () => {
        await Store.clear();
    };

    static Awaitable = () => {
        const { data, loading, error } = AIO.Request();

        let total = 0;
        if ( data !== null ) {
            let iterator = 0;
            for ( iterator; iterator < data.length; iterator++ ) {
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
}

export default AIO;

export const State = AIO.Awaitable;
