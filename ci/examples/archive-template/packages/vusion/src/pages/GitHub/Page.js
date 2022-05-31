import React, { useState, useMemo, useEffect } from "react";

import { default as Table } from "./Table";

import {
    Link
} from "@carbon/react";

import { default as Pagination } from "./Paginator";

import { default as Skeleton } from "./Skeleton";

const headers = [
    {
        key: "name",
        header: "Name"
    },
    {
        key: "createdAt",
        header: "Created"
    },
    {
        key: "updatedAt",
        header: "Updated"
    },
    {
        key: "issueCount",
        header: "Open Issues"
    },
    {
        key: "stars",
        header: "Stars"
    },
    {
        key: "links",
        header: "Links"
    }
];

const Linker = ({ organization, url }) => (
    <ul style={ { display: "flex" } }>
        { organization && (
            <li>
                <Link href={ organization }>Home</Link>
            </li>
        ) }
        { url && (
            <li>
                <span>&nbsp;|&nbsp;</span>
                <Link href={ url }>URL</Link>
            </li>
        ) }
    </ul>
);

const generateData = () => {
    const repositories = [];

    for (let i = 0; i < 50; i++) {
        repositories[i] = {
            id: String(i),
            name: "Test",
            stargazers: [
                null,
                null,
                null
            ],
            issues: [
                null
            ],
            createdAt: new Date().getDate(),
            updatedAt: new Date().getDate(),
            url: "https://localhost",
            homepageUrl: "https://github.com/cloud-hybrid"
        };
    }

    return repositories;
}


/*****
 *
 * @param rows
 *
 * @returns Array[{*, key, stars, issueCount, createdAt, updatedAt, links}]
 *
 */
const getRowItems = (rows) => {
    return rows.map(
        (row) => ({
            ...row,
            key: row.id,
            stars: row.stargazers.length,
            issueCount: row.issues.length,
            createdAt: new Date(row.createdAt).toLocaleDateString(),
            updatedAt: new Date(row.updatedAt).toLocaleDateString(),
            links: <Linker organization={ "https://github.com/cloud-hybrid" } url={ "https://github.com/cloud-hybrid" } />
        })
    );
};

const Page = () => {
    const [firstRowIndex, setFirstRowIndex] = useState(0);
    const [currentPageSize, setCurrentPageSize] = useState(10);

    const Data = useMemo(() => generateData(), []);

    const [awaiting, setAwaiting] = useState(true);

    useEffect(() => {
        async function Await() {
            console.debug("[Debug]", "Instantiating Waiter ...");

            const Waiter = new Promise((resolve, reject) => setTimeout(
                (_) => {
                    setAwaiting(false);
                    
                    if (awaiting === false ) resolve(awaiting)
                },
                1500
            ));

            await Waiter.then(() => {
                console.debug("[Debug]", "Waiter has Successfully Resolved");

                setAwaiting(null);
            });
        }

        Await().finally();
    }, []);

    if (awaiting === true) return (<Skeleton/>)
    else {
        const rows = getRowItems(Data);
        return (
            <>
                <Table
                    headers={ headers }
                    rows={ rows.slice(firstRowIndex, firstRowIndex + currentPageSize) }
                />
                <Pagination Data={Data} currentPageSize={currentPageSize} setCurrentPageSize={setCurrentPageSize} setFirstRowIndex={setFirstRowIndex}/>
            </>
        );
    }
}

export default Page;
