import React, { useState, useEffect } from "react";

import { default as Table } from "./Table";

import * as Query from "./Query";

import Skeleton from "./Skeleton";

const Component = () => {
    const [rows, setRows] = useState(20);
    const [page, setPage] = useState(1);
    const [awaiting, setAwaiting] = useState(false);

    useEffect(() => {
        switch (awaiting) {
            case true:
                return () => setAwaiting(true);
            case false:
                return () => setAwaiting(false);
            default:
                return () => setAwaiting(null);
        }

    }, []);

    const Handler = Query.State();

    const Headers = [ // Total = 8
        {
            key: "ID",
            header: "ID",
            sortable: false,
            value: "ID"
        },
        {
            key: "Name",
            header: "Name",
            sortable: false,
            value: "Name"
        },
        {
            key: "Activity",
            header: "Activity",
            sortable: false,
            value: "Activity"
        },
        {
            key: "Visibility",
            header: "Visibility",
            sortable: false,
            value: "Visibility"
        },
        {
            key: "URL",
            header: "URL",
            sortable: false,
            value: "URL"
        },
        {
            key: "Description",
            header: "Description",
            sortable: false,
            value: "Description"
        },

        {
            key: "Git-HTTP-URL",
            header: "Git-HTTP-URL",
            sortable: false,
            value: "URL"
        }
    ];

    const Pages = {
        Rows: {
            Data: rows,
            Setter: (value) => setRows(value)
        }, Total: Handler.Total - rows,
        Index: {
            Data: page,
            Setter: (value) => setPage(value)
        }, Size: rows,
        Sizes: [rows]
    };

    const Awaitable = () => {
        if (awaiting === true) {
            return Component();
        }

        const Data = new Array(Handler.Response[page]);

        const Offset = Data.length;

        return (<Table Headers={Headers} Data={Data.pop()} Offset={Offset} State={setAwaiting} Pages={Pages}/>);
    };

    return (Handler.Waiter === false) ? (<Awaitable/>) : (<Skeleton/>);
};

export default Component;
