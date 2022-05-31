import React, { useEffect, useState } from "react";

const Request = require("axios");
const Adapter = require("axios-cache-adapter");
const Forage = require("localforage");

const STORE = "Pseudo-Data";
const NAME = "Nexus-UI";
const DESCRIPTION = "Nexus Pseudo State";

const Cancellation = Request.CancelToken.source();

Cancellation.Instantiate = () => Request.CancelToken.source();

const Store = Forage.createInstance({
    name: NAME,
    storeName: STORE,
    description: DESCRIPTION,
    driver: Forage.INDEXEDDB
});

const Cache = Adapter.setupCache({
    excludeFromCache: false, // --> Debugging
    debug: (process.env.NODE_ENV !== "production"),
    clearOnStale: true,
    ignoreCache: true,
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

class AIO extends Object {
    constructor(props) {
        super(props);
    };

    static URL = process.env.REACT_APP_API_ENDPOINT + "/v1/gitlab/projects/empty";

    static Resolve = () => {
        const Query = () => {
            const [ data, setData ] = useState(null);
            const [ loading, setLoading ] = useState(null);
            const [ error, setError ] = useState(null);

            useEffect(() => {
                let ignore = false;

                const Fetch = async () => {
                    setLoading(true);
                    try {
                        setError({});

                        const response = await API.post(AIO.URL, {
                            Input: "Data"
                        }).then((Data) => Store.setItem(STORE, Data.data).then((Value) => {
                            console.debug("[Debug] Cache Store Update(s)", Value);
                            return Value;
                        }));

                        console.debug("[Debug] Query (Pseudo) Response", response);

                        if ( !ignore ) setData(response);

                    } catch ( Error ) {
                        setError(Error);
                    }

                    setLoading(false);
                };

                Fetch().then().finally();

                return (() => {
                    ignore = true;
                });
            }, [ URL ]);
            return { data, loading, error };
        };
        return Query(URL);
    };

    static Awaitable = () => {
        const Response = AIO.Resolve();

        return {
            Response: Response.data,
            Waiter: Response.loading,
            Error: Response.error
        };
    };
}

export default AIO;

export const State = AIO.Awaitable;