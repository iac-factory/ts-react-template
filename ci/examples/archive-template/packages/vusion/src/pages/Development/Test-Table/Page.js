import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { default as Table } from "./Table.js";

const Page = () => {
    const [ firstRowIndex, setFirstRowIndex ] = useState(0);
    const [ currentPageSize, setCurrentPageSize ] = useState(10);
    const [ awaiting, setAwaiting ] = useState(true);

    useEffect(() => {
        async function Await() {
            const Waiter = new Promise((resolve, reject) => setTimeout(
                () => {
                    console.debug("[Debug]", "Instantiating Waiter ...");

                    setAwaiting(false)

                    if ( awaiting === false ) resolve(awaiting);
                },
                1500
            ));

            await Waiter.finally(() => setAwaiting(null));
        }

        Await().finally();
    }, []);

    switch ( awaiting ) {
        case true: {
            console.debug("[Debug]", "Awaitable", awaiting);

            return (awaiting === true) && (
                "..."
            );
        }

        default: {
            console.debug("[Debug]", "Awaitable", awaiting);
            
            console.debug("[Debug]", "Waiter has Successfully Resolved");

            return (awaiting === false) && (
                <Table/>
            );
        }
    }
};

export default Page;
