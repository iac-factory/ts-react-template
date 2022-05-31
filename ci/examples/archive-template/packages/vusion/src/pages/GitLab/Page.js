import React, {
    useState,
    useEffect
} from "react";

import * as Activity from "./SCSS/Activity.module.scss";

import { default as API } from "./Query";

import Skeleton from "./Skeleton";

import {
    Tag as Visibility
} from "@carbon/react";

import { default as Tabular } from "./Table";

const Component = () => {
    const [ rows, setRows ] = useState(20);
    const [ page, setPage ] = useState(1);
    const [ awaiting, setAwaiting ] = useState(true);

    useEffect(() => {
        async function Await() {
            const Waiter = new Promise((_) => setTimeout(
                (_) => {
                    console.debug("Updating Await := false");
                    setAwaiting(false);
                }
            ), 1500);

            await Waiter;
        }

        Await().finally(() => {
            /* ... */
        });
    }, []);

    const Handler = API.Awaitable();

    const Headers = React.useMemo(() => [
        {
            key: "ID",
            header: "ID",
            sortable: true,
            value: "ID"
        },
        {
            key: "Name",
            header: "Name",
            sortable: true,
            value: "Name"
        },
        {
            key: "Activity",
            header: "Activity",
            sortable: true,
            value: "Activity"
        },
        {
            key: "Visibility",
            header: "Visibility",
            sortable: true,
            value: "Visibility"
        },
        {
            key: "URL",
            header: "URL",
            sortable: false,
            value: "URL"
        },

        {
            key: "Options",
            header: "Options",
            sortable: false,
            value: "Options"
        }
    ], []);

    const Pages = {
        Rows: {
            Data: rows,
            Setter: (value) => setRows(value)
        },
        Total: (
            Handler.Total > rows
        ) ? Handler.Total - rows : rows,
        Index: {
            Data: page,
            Setter: (value) => setPage(value)
        },
        Size: rows,
        Sizes: [ rows ]
    };

    const Awaitable = () => {
        if ( awaiting === true ) return Component();

        const Data = React.useMemo(() => Handler.Response["Data"]["Projects"]) || [];

        return (
            <Tabular Headers={ Headers } Data={ Data } State={ setAwaiting } Pages={ Pages }/>
        );
    };

    return (
        Handler.Waiter === false
    ) ? (
        <Awaitable/>
    ) : (
        <Skeleton/>
    );
};

export default Component;
//
//import React, {
//    useState,
//    useEffect
//} from "react";
//
//import * as Activity from "./SCSS/Activity.module.scss";
//
//import { default as API } from "./Query";
//
//import Skeleton from "./Skeleton";
//
//import {
//    Tag as Visibility
//} from "@carbon/react";
//
//import { default as Tabular } from "./Table";
//
//const Component = () => {
//    const [ rows, setRows ] = useState(20);
//    const [ page, setPage ] = useState(1);
//    const [ awaiting, setAwaiting ] = useState(true);
//
//    useEffect(() => {
//        async function Await() {
//            const Waiter = new Promise((_) => setTimeout(
//                (_) => {
//                    console.debug("Updating Await := false");
//                    setAwaiting(false);
//                }
//            ), 1500);
//
//            await Waiter;
//        }
//
//        Await().finally(() => {
//            /* ... */
//        });
//    }, []);
//
//    const Handler = API.Awaitable();
//
//    const Headers = React.useMemo(() => [
//        {
//            key: "ID",
//            header: "ID",
//            sortable: true,
//            value: "ID"
//        },
//        {
//            key: "Name",
//            header: "Name",
//            sortable: true,
//            value: "Name"
//        },
//        {
//            key: "Activity",
//            header: "Activity",
//            sortable: true,
//            value: "Activity"
//        },
//        {
//            key: "Visibility",
//            header: "Visibility",
//            sortable: true,
//            value: "Visibility"
//        },
//        {
//            key: "URL",
//            header: "URL",
//            sortable: false,
//            value: "URL"
//        },
//
//        {
//            key: "Options",
//            header: "Options",
//            sortable: false,
//            value: "Options"
//        }
//    ], []);
//
//    const Pages = {
//        Rows: {
//            Data: rows,
//            Setter: (value) => setRows(value)
//        },
//        Total: (
//            Handler.Total > rows
//        ) ? Handler.Total - rows : rows,
//        Index: {
//            Data: page,
//            Setter: (value) => setPage(value)
//        },
//        Size: rows,
//        Sizes: [ rows ]
//    };
//
//    const Awaitable = () => {
//        if ( awaiting === true ) return Component();
//
//        const Data = (
//            Handler && Handler.Response && Handler.Response[page] !== null
//        ) ? new Array(Handler.Response[page]) : new Array(0);
//
//        //        const Memoization = React.useMemo(() => Data[Data.length - 1], [ Data ]);
//
//        return (
//            <Tabular Headers={ Headers } Data={ Data.pop() } State={ setAwaiting } Pages={ Pages }/>
//        );
//    };
//
//    return (
//        Handler.Waiter === false
//    ) ? (
//        <Awaitable/>
//    ) : (
//        <Skeleton/>
//    );
//};
//
//export default Component;
//
