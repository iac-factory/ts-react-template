import React, {
    Fragment,
    useState,
    useEffect
} from "react";

import "./SCSS/Cell.scss";

import { dataElement } from "./SCSS/Index.module.scss";

import * as Query from "./Query";

import Skeleton from "./Skeleton";

import {
    DataTable,
    Table,
    TableHead,
    TableRow,
    TableHeader,
    TableBody,
    TableCell,
    TableContainer,
    TableSelectRow,
    TableToolbarContent,
    TableExpandHeader,
    TableToolbar,
    TableExpandRow,
    TableExpandedRow,
    TableSelectAll,
    Link,
    Button,
    TableBatchActions,
    TableBatchAction,
    TableToolbarSearch,
    CodeSnippet,
    Tag
} from "@carbon/react";

import {
    Scan as Reload,
    DataAccessor as DICO,
    DataAccessor as CSV,
    DataAccessor as Metrics
} from "@carbon/icons-react";

/// ... import { default as Breadcrumb } from "./Breadcrumb/Index";

import { default as Pagination } from "./Paginator";

const URL = ({ url, home }) => {
    return (
        <ul style={ { width: "max-content" } }>
            <li style={ { display: "inline" } }>
                <Link href={ url } className={ "io--underline-text" }>
                    <strong>
                        Repository
                    </strong>
                </Link>
            </li>
            { home && (
                <li style={ { display: "inline" } }>
                    <span>&nbsp;|&nbsp;</span>
                    <Link href={ home }>Gitlab</Link>
                </li>
            ) }
        </ul>
    );
};

function batchActionClick(event, rows = null) {
    if (event) console.debug("Batch-Action-Click", event.target.id);
    if (event.target.getAttribute("dataset-target-row") !== null) {
        console.log(JSON.parse(event.target.getAttribute("dataset-target-data")));
    }
}

async function Refresh(setter) {
    console.debug("[DEBUG]", "Importing Event-Handler");
    const Query = () => require("./Query").AIO;
    console.debug("[DEBUG]", "Instantiating Query Object");
    const Handler = Query();
    console.debug("[DEBUG]", "Removing Session Cache");
    await Handler.Clear().then().catch((error) => console.debug("[DEBUG]", "Error", error)).finally(
        () => console.debug("[DEBUG]", "Successfully Removed Session Cache")
    );

    setter(true);
}

const Schema = [{
    id: null,
    name: null,
    visibility: null,
    last_activity_at: null,
    web_url: null
}];

/***
 *
 * Rows consist of the datasets -- or tabulars -- that make up
 * the majority content of a given data-table. Headers define
 * the Key-Value look-ups + labels for accessing a given row's
 * indexed objects.
 *
 * @returns {JSX.Element}
 * @constructor
 */

/***
 *
 * @param Headers {Array}
 * @param Data {Map}
 * @param Page {Number}
 * @param Offset {Number}
 * @returns {JSX.Element}
 * @constructor { () =? () }
 *
 *  *-* Project Type *-*
 * ======================
 *
 * @type {function(Number)};
 *
 * >>> const Project = {
 * ...     "id":               String(Index),
 * ...     "ID":               String(Repository.id),
 * ...     "Name":             String(Repository.name),
 * ...     "Default-Branch":   String(Repository.visibility).toUpperCase(),
 * ...     "Last-Activity":    String(Repository.default_branch),
 * ...     "Visibility":       String(Repository.last_activity_at),
 * ...     "Web-URL":          String(Repository.web_url),
 * ... };
 *
 */

const Tabluar = ({ Data = Schema, Headers, State, Pages, Handler }) => {
    const Home = "https://gitlab.cloud-technology.io/";

    const Total = (Data) ? Data.length: 0;
    const Projects = new Array(Total);

    const Exclusions = 2;

    Headers = Headers.slice(0, Headers.length - Exclusions);
    Data.forEach((Repository, Index) => {
        Projects[Index] = {
            id: String(Index),
            disabled: false,
            isExpanded: false,
            isSelected: false,
            cells: Object.values({ Repository }),
            UID: (Repository.id !== null) ? String(Repository.id): 0,
            Name: (Repository.name !== null) ? String(Repository.name): "N/A",
            Visibility: (Repository.visibility !== null) ? String(Repository.visibility).toUpperCase(): "Internal",
            Activity: (Repository.last_activity_at !== null) ? String(Repository.last_activity_at): "N/A",
            URL: (Repository.web_url !== null) ? String(Repository.web_url): "N/A"
        };
    });

    return (
        <DataTable
            rows={ Projects }
            headers={ Headers }
            isSortable={ false }
            render={
                ({
                    rows,
                    headers,
                    getTableProps,
                    getTableContainerProps,
                    getSelectionProps,
                    getExpandHeaderProps,
                    overflowMenuOnHover,
                    getHeaderProps,
                    getRowProps,
                    getToolbarProps,
                    getBatchActionProps
                }) => (
                    <TableContainer title={ "Cloud-Technology" } description="Cloud-Technology's GitHub Repositories" { ... getTableContainerProps() }>
                        <TableToolbar { ... getToolbarProps() }>
                            <TableBatchActions { ... getBatchActionProps() }>
                                <TableBatchAction
                                    id="Development-Table-JSON-Trigger-Button"
                                    tabIndex={ getBatchActionProps().shouldShowBatchActions ? 0: -1 }
                                    renderIcon={ DICO }
                                    onClick={ batchActionClick }
                                >
                                    JSON
                                </TableBatchAction>
                                <TableBatchAction
                                    id="Development-Table-Metrics-Trigger-Button"
                                    tabIndex={ getBatchActionProps().shouldShowBatchActions ? 0: -1 }
                                    renderIcon={ Metrics }
                                    onClick={ batchActionClick }
                                >
                                    Metrics
                                </TableBatchAction>
                                <TableBatchAction
                                    id="Development-Table-Download-Trigger-Button"
                                    tabIndex={ getBatchActionProps().shouldShowBatchActions ? 0: -1 }
                                    renderIcon={ CSV }
                                    onClick={ batchActionClick }
                                >
                                    Download
                                </TableBatchAction>
                            </TableBatchActions>
                            <TableToolbarContent>
                                <TableToolbarSearch
                                    persistent={ false }
                                    labelText={ "Test-Label-Text" }
                                    placeholder={ "Test-Place-Holder-Text" }
                                    tabIndex={ getBatchActionProps().shouldShowBatchActions ? -1: 0 }
                                    //                                 onChange={ (event) => console.debug(event) }
                                />
                                <Button
                                    kind="ghost"
                                    size="default"
                                    hasIconOnly={ true }
                                    onClick={ async () => await Refresh(State) }
                                    renderIcon={ Reload }
                                    tabIndex={ 0 }
                                    iconDescription={ "Reload Table & Clear Cache" }
                                    tooltipAlignment={ "center" }
                                    tooltipPosition={ "left" }
                                    type={ "button" }
                                />
                            </TableToolbarContent>
                        </TableToolbar>
                        <Table { ... getTableProps() }>
                            <TableHead>
                                <TableRow>
                                    <TableExpandHeader enableToggle={ true } { ... getExpandHeaderProps() } />
                                    <TableSelectAll { ... getSelectionProps() } />
                                    {
                                        Headers.map((Header, Index) => (Header.value === "Name")
                                            ? (
                                                <TableHeader { ... getHeaderProps({ header: Header }) } colSpan={ 1 }>
                                                    { Header.value }
                                                </TableHeader>
                                            ): (
                                                <TableHeader { ... getHeaderProps({ header: Header }) } colSpan={ 1 }>
                                                    { Header.value }
                                                </TableHeader>
                                            ))
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { Projects.map((Row, Index) => {
                                    Row = { ... Row, ... rows[Index] };
                                    return (
                                        <Fragment key={ String(Index) }>
                                            <TableExpandRow
                                                expandIconDescription={ "Select to Expand Repository's Description" } {
                                                ... getRowProps({ row: Row })
                                            } >
                                                <TableSelectRow { ... getSelectionProps({ row: Row }) } />
                                                <TableCell
                                                    key={ String(Index) + "-" + "ID" + "-" + Row.UID } name={ String(
                                                    Index) + "-" + "ID" + "-" + Row.UID }
                                                >
                                                    <CodeSnippet type="single" feedback={ "Copied" } copyButtonDescription={ "Copy Code Snippet Content" } hideCopyButton={ false } copyLabel={ "Row-ID" }>
                                                        { String(Row.UID) }
                                                    </CodeSnippet>
                                                </TableCell>
                                                <TableCell
                                                    key={ String(Index) + "-" + "Name" + "-" + Row.UID } name={ String(
                                                    Index) + "-" + "Name" + "-" + Row.UID }
                                                >
                                                    <strong>
                                                        <CodeSnippet type={ "single" } feedback={ "Saved to Clipboard" }>
                                                            { Row.Name }
                                                        </CodeSnippet>
                                                    </strong>
                                                </TableCell>
                                                <TableCell key={ String(Index) + "-" + "Activity" } name={ String(Index) + "-" + "Activity" }>
                                                    { String(Row.Activity).slice(0, 10) }
                                                </TableCell>
                                                <TableCell
                                                    key={ String(Index) + "-" + "Visibility" + "-" + Row.UID } id={ String(
                                                    Index) + "-" + "Visibility" + "-" + Row.UID }
                                                >
                                                    {
                                                        (Row.Visibility === "PUBLIC") ? (
                                                                <Tag
                                                                    id={ "Visibility-Tag" + "-" + String(Index) }
                                                                    type="green"
                                                                    title="Public-Visibility-Tag"
                                                                    onClick={ () => window.open(Row.URL) }
                                                                >
                                                                    <strong>Public</strong>
                                                                </Tag>)
                                                            : (Row.Visibility === "PRIVATE") ? (
                                                                    <Tag
                                                                        id={ "Visibility-Tag" + "-" + String(Index) }
                                                                        type="red"
                                                                        title="Private-Visibility-Tag"
                                                                        // className={ "io--tag--red-non-interactive" }
                                                                    >
                                                                        <strong>Private</strong>
                                                                    </Tag>)
                                                                : (
                                                                    <Tag
                                                                        id={ "Visibility-Tag" + "-" + String(Index) }
                                                                        type="purple"
                                                                        title="Internal-Visibility-Tag"
                                                                    >
                                                                        <strong>Internal</strong>
                                                                    </Tag>)
                                                    }
                                                </TableCell>
                                                <TableCell
                                                    id={ String(Index) + "-" + "URL" + "-" + Row.UID }
                                                    key={ String(Index) + "-" + "URL" + "-" + Row.UID }
                                                >
                                                    <URL
                                                        url={ Row.URL } home={ Home } key={ "VCS-URL-Link-Key" + "-" + String(
                                                        Index) }
                                                    />
                                                </TableCell>
                                            </TableExpandRow>
                                            <TableExpandedRow colSpan={ headers.length + 2 }>
                                                <p>
                                                    <strong>Description</strong>:&nbsp;
                                                    { (Data) ? Data[Index].description: "N/A" }
                                                </p>
                                            </TableExpandedRow>
                                        </Fragment>
                                    )
                                }) }
                            </TableBody>
                        </Table>
                        { (Data) ? (
                            <Pagination Pages={ Pages }/>
                        ): (
                            <></>
                        ) }
                    </TableContainer>
                ) }
            size={ "normal" }
        />
    );
};

const Component = () => {
    const [rows, setRows] = useState(20);
    const [page, setPage] = useState(1);
    const [awaiting, setAwaiting] = useState(true);

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

        Await().then((_) => {
            setAwaiting(false);
        });

        /// return async () => await setAwaiting(false);
    }, []);

    const Handler = Query.default.Awaitable();

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
        }, Total: (Handler.Total > rows) ? Handler.Total - rows: rows,
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

        const Data = (Handler && Handler.Response && Handler.Response[page] !== null) ? new Array(
                Handler.Response[page])
            : new Array(0);

        return (<Tabluar Headers={ Headers } Data={ Data.pop() } State={ setAwaiting } Pages={ Pages } Handler={Handler}/>);
    };

    return (Handler.Waiter === false) ? (<Awaitable/>): (<Skeleton/>);
};

export default Component;