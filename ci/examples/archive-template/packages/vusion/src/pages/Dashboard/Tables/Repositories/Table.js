// ...

import React, { Fragment } from "react";

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
    TableBatchActions,
    TableBatchAction,
    TableToolbarSearch,
    CodeSnippet,
    Tag,
    Pagination
} from "carbon-components-react";

const URL = ({ url, home }) => {
    return (
        <ul style={{ width: "max-content" }}>
            <li style={{display: "inline"}}>
                <Link href={url} className={"io--underline-text"}>
                    <strong>
                        Repository
                    </strong>
                </Link>
            </li>
            {home && (
                <li style={{display: "inline"}}>
                    <span>&nbsp;|&nbsp;</span>
                    <Link href={home}>Gitlab</Link>
                </li>
            )}
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
    await Handler.Clear().then()
        .catch((error) => console.debug("[DEBUG]", "Error", error))
        .finally(
        () => console.debug("[DEBUG]", "Successfully Removed Session Cache")
    );

    setter(true);
}

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
 * *-* Project Type *-*
 * ====================
 *
 * @type {function({Headers: Array, Data: Map, Page: Number, Offset: Number})};
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

const Component = ({ Headers, Data, State, Pages}) => {
    const Home = "https://gitlab.cloud-technology.io/";

    const Total = (Data) ? Data.length : 0;
    const Projects = new Array(Total);

    const Exclusions = 2;

    Headers = Headers.slice(0, Headers.length - Exclusions);
    (Data) ? Data.forEach((Repository, Index) => {
        Projects[Index] = {
            "id":               String(Index),
            "UID":              String(Repository.id),
            "Name":             String(Repository.name),
            "Visibility":       String(Repository.visibility).toUpperCase(),
            "Activity":         String(Repository.last_activity_at),
            "URL":              String(Repository.web_url)
        };
    }) : Projects[0] = {
        "id":               null,
        "UID":              null,
        "Name":             null,
        "Visibility":       null,
        "Activity":         null,
        "URL":              null
    };

    return (
        <DataTable
            rows={Projects}
            headers={Headers}
            isSortable={false}
            size={"normal"}
            render={
                ({
                     rows,
                     headers,
                     getTableProps,
                     getTableContainerProps,
                     getSelectionProps,
                     getExpandHeaderProps,
                     getHeaderProps,
                     getRowProps,
                     getToolbarProps,
                     getBatchActionProps
                }) => (
                <TableContainer {...getTableContainerProps()}>
                    <Table {...getTableProps()}>
                        <TableHead>
                            <TableRow>
                                <TableExpandHeader enableExpando={true} {...getExpandHeaderProps()}/>
                                    {
                                        Headers.map((Header, Index) => (Header.value === "Name")
                                            ? (
                                                <TableHeader {...getHeaderProps({ header: Header })} colSpan={1}>
                                                    {Header.value}
                                                </TableHeader>
                                            ) : (
                                                <TableHeader {...getHeaderProps({ header: Header })} colSpan={1}>
                                                    {Header.value}
                                                </TableHeader>
                                            ))
                                    }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Projects.map((Row, Index) => (
                                <Fragment key={String(Index) + "-" + "DOM-Table-Fragment" + "-" + Row.UID}>
                                    <TableExpandRow expandIconDescription={"Select to Expand Repository's Description"}{...getRowProps({row: rows[Index]})}>
                                        <TableCell key={rows[Index].cells.shift().id} id={String(Index) + "-" + "ID" + "-" + Row.UID} colSpan={1}>
                                            <CodeSnippet type="inline" className={"io--darkened-code-snippet"} feedback={"Copied"} copyButtonDescription={"Copy Code Snippet Content"} hideCopyButton={false} copyLabel={"Row-ID"}>
                                                {Row.UID}
                                            </CodeSnippet>
                                        </TableCell>
                                        <TableCell key={rows[Index].cells.shift().id} id={String(Index) + "-"  + "Name" + "-" + Row.UID} colSpan={1}>
                                            <strong>
                                                <CodeSnippet type="single" feedback={"Saved to Clipboard"} className={"io--bold-code-snippet io--code-snippet--cursor-pointer"} light>
                                                    {Row.Name}
                                                </CodeSnippet>
                                            </strong>
                                        </TableCell>
                                        <TableCell key={rows[Index].cells.shift().id} id={String(Index) + "-" + "Activity" + "-"} colSpan={1}>
                                            {String(Row.Activity).slice(0, 10)}
                                        </TableCell>
                                        <TableCell key={rows[Index].cells.shift().id} id={String(Index) + "-" + "Visibility" + "-" + Row.UID} colSpan={1}>
                                            {
                                                (Row.Visibility === "PUBLIC") ? (
                                                    <Tag id={"Visibility-Tag" + "-" + String(Index)}
                                                         type="green"
                                                         title="Public-Visibility-Tag"
                                                         onClick={() => window.open(Row.URL)}
                                                    >
                                                        <strong>Public</strong>
                                                    </Tag>)
                                                    : (Row.Visibility === "PRIVATE") ? (
                                                        <Tag id={"Visibility-Tag" + "-" + String(Index)}
                                                             type="red"
                                                             title="Private-Visibility-Tag"
                                                             className={"io--tag--red-non-interactive"}
                                                        >
                                                            <strong>Private</strong>
                                                        </Tag>)
                                                    : (
                                                        <Tag id={"Visibility-Tag" + "-" + String(Index)}
                                                             type="purple"
                                                             title="Internal-Visibility-Tag"
                                                             className={"io--tag--purple-non-interactive"}
                                                        >
                                                            <strong>Internal</strong>
                                                        </Tag>)
                                            }
                                        </TableCell>
                                        <TableCell id={String(Index) + "-" + "URL" + "-" + Row.UID}
                                            key={rows[Index].cells.shift().id}
                                            colSpan={1}
                                        >
                                            <URL url={Row.URL} home={Home} key={"VCS-URL-Link-Key" + "-" + String(Index)} />
                                        </TableCell>
                                    </TableExpandRow>
                                    <TableExpandedRow colSpan={headers.length + 3}>
                                        <p>
                                            <strong>Description</strong>:&nbsp;
                                                {(Data) ? Data[Index].description : "N/A"}
                                        </p>
                                    </TableExpandedRow>
                                </Fragment>
                            ))}
                        </TableBody>
                    </Table>
                    {(Data) ? (
                        <Pagination
                            backwardText="Previous"
                            forwardText="Next"
                            itemsPerPageText="Total Paged Items"
                            pageNumberText="Page Number"
                            pageSize={Pages.Size}
                            pageSizes={Pages.Sizes}
                            totalItems={Pages.Total}
                            page={Pages.Index.Data}
                            onChange={(Data) => Pages.Index.Setter(Data.page)}
                        />
                        ) : (
                            <React.Fragment/>
                        )
                    }
                </TableContainer>
            )}
        />
    );
};

export default Component;