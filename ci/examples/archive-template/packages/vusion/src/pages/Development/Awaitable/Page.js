import React, { useState, useEffect } from "react";

const Page = () => {
    const [ awaiting, setAwaiting ] = useState(true);

    useEffect(() => {
        async function Await() {
            const Waiter = new Promise((resolve, $) => setTimeout(
                () => {
                    console.debug("[Debug]", "Instantiating Waiter ...");

                    setAwaiting(false);

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
            "... Waiting"
        );
    }

    default: {
        console.debug("[Debug]", "Awaitable", awaiting);

        console.debug("[Debug]", "Waiter has Successfully Resolved");

        return (awaiting === false) && null;
    }
    }
};

export default Page;