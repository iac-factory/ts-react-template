import React, {useEffect, useState} from "react";

import {default as Skeleton} from "./Skeleton";
import {default as Table} from "./Table";

const Component = () => {
    const [awaiting, setAwaiting] = useState(null);

    const Await = async () => await new Promise((_) => setTimeout((_) => setAwaiting(false), 1500));

    useEffect(async () => {
        await Await();
    }, [awaiting]);

    const rows = [
        {
            id: "a",
            name: "Load balancer 1",
            status: "Disabled"
        },
        {
            id: "b",
            name: "Load balancer 2",
            status: "Starting"
        },
        {
            id: "c",
            name: "Load balancer 3",
            status: "Active"
        }
    ];

    const headers = [
        {
            key: "name",
            header: "Name"
        },
        {
            key: "status",
            header: "Status"
        }
    ];

    return (
        <>
            {
                (awaiting === false) ?
                    (
                        <Table headers={headers} rows={rows}/>
                    ) : (
                        <Skeleton/>
                    )
            }
        </>
    )
};

export default Component;
