import React, { Fragment, useMemo } from "react";

import {
    Button,
    CodeSnippet,
    DataTable,
    Link,
    Table,
    TableBatchAction,
    TableBatchActions,
    TableBody,
    TableCell,
    TableContainer,
    TableExpandedRow,
    TableExpandHeader,
    TableExpandRow,
    TableHead,
    TableHeader,
    TableRow,
    TableSelectAll,
    TableSelectRow,
    TableToolbar,
    TableToolbarContent
    //    TableToolbarSearch
} from "@carbon/react";

import { Data } from "@carbon/icons-react";
import { ChartCombo } from "@carbon/icons-react";
import { CrossTab } from "@carbon/icons-react";
import { Renew } from "@carbon/icons-react";

import "./SCSS/Overflow.scss";

import Light from "./SCSS/Light.module.scss";
import Bold from "./SCSS/Bold.module.scss";
import Activity from "./SCSS/Activity.module.scss";
import Tag from "./SCSS/Tag.module.scss";
import Code from "./SCSS/Code.module.scss";

import { Store, STORE } from "./Query";

import { default as Pagination } from "./Paginator";

import { Tag as Visibility } from "carbon-components-react";

//import { OverflowMenuVertical, Launch } from "@carbon/icons-react";

import { default as Modal } from "./Modal.js";

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
                    <span>
                        {
                            " " + "|" + " "
                        }
                    </span>
                    <Link href={ home }>
                        Gitlab
                    </Link>
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

const Refresh = async (setter) => {
    await Store.removeItem(STORE, (error) => {
        (
            error
        ) ? console.error(
            "[Error", "Unable to Clear Cache", error
        ) : console.debug(
            "[DEBUG]", "Successfully Removed Session Cache"
        );

        setter(true);
    });
};

const Component = ({ Data, Headers, State }) => {
    const Home = "https://gitlab.cloud-technology.io/";

    const Projects = [];

    const Total = (
        Data
    ) ? Data?.length : 0;

    Data.forEach((Repository, Index) => React.useMemo(() => {
        Projects[Index] = {
            id: String(Index),
            disabled: false,
            isExpanded: false,
            isSelected: false,
            cells: Object.values({ Repository }),
            UID: (Repository.id !== null) ? String(Repository.id) : 0,
            Name: (Repository.name !== null) ? String(Repository.name) : "N/A",
            Visibility: (Repository.visibility !== null) ? String(Repository.visibility).toUpperCase() : "Internal",
            Activity: (Repository.last_activity_at !== null) ? String(Repository.last_activity_at) : "N/A",
            URL: (Repository.web_url !== null) ? String(Repository.web_url) : "N/A",
            Data: Repository
        };
    }, [ Data ]));

    return (
        <DataTable
            rows={ Projects }
            headers={ Headers }
            isSortable={ false }
            size={ "normal" }
            stickyHeader={ false }
            useStaticWidth={ false }
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
                    <TableContainer title={ "Cloud-Technology" } description="Cloud-Technology's GitHub Repositories" { ... getTableContainerProps() }>
                        <TableToolbar { ... getToolbarProps() } className={ "io-table-toolbar" }>
                            <TableBatchActions { ... getBatchActionProps() }>
                                <TableBatchAction
                                    id="Development-Table-JSON-Trigger-Button"
                                    renderIcon={ DICO }
                                    onClick={ batchActionClick }
                                >
                                    JSON
                                </TableBatchAction>
                                <TableBatchAction
                                    id="Development-Table-Metrics-Trigger-Button"
                                    renderIcon={ Metrics }
                                    onClick={ batchActionClick }
                                >
                                    Metrics
                                </TableBatchAction>
                                <TableBatchAction
                                    id="Development-Table-Download-Trigger-Button"
                                    renderIcon={ CSV }
                                    onClick={ batchActionClick }
                                >
                                    Download
                                </TableBatchAction>
                            </TableBatchActions>
                            <TableToolbarContent>
                                {
                                    // <TableToolbarSearch
                                    //     persistent={ true }
                                    //     defaultExpanded={ true }
                                    //     searchContainerClass={ Search.search }
                                    //     placeholder={ " " }
                                    //     onExpand={
                                    //         (event) => {
                                    //             const Element = document.getElementsByClassName(Search.search).item(0);
                                    //             const Input = document.getElementsByClassName("cds--search-input").item(0);
                                    //
                                    //             (event.type === "blur")
                                    //                 ? console.debug("[Debug]", "Search Collapse Event")
                                    //                 : console.debug("[Debug]", "Search Expand Event");
                                    //
                                    //             if ( event.type === "focus" ) {
                                    //                 Input.style.outline = "0";
                                    //                 Input.style.paddingLeft = "3.0rem";
                                    //                 Input.style.paddingRight = "3.0rem";
                                    //
                                    //                 Element.setAttribute("expanded", "true");
                                    //             } else {
                                    //                 Input.style.outline = "0";
                                    //                 Input.style.paddingLeft = "0.0rem";
                                    //                 Input.style.paddingRight = "0.0rem";
                                    //
                                    //                 Element.removeAttribute("expanded");
                                    //             }
                                    //         }
                                    //     }
                                    //     labelText={ "Test-Label-Text" }
                                    //     expanded={ false }
                                    //     tabIndex={ 0 }
                                    // />
                                }
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
                                        Headers.map(
                                            (Header) => (Header.value === "Name")
                                                ? (
                                                    <TableHeader { ... getHeaderProps({ header: Header }) } colSpan={ 1 }>
                                                        { Header.value }
                                                    </TableHeader>
                                                ) : (
                                                    <TableHeader { ... getHeaderProps({ header: Header }) } colSpan={ 1 }>
                                                        { Header.value }
                                                    </TableHeader>
                                                )
                                        )
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    Projects.map(
                                        (Row, Index) => {
                                            Row = { ... Row, ... rows[Index] };

                                            const Data = Row.Data;

                                            const Snippet = () => {
                                                return (
                                                    <CodeSnippet
                                                        type={ "multi" }
                                                        wrapText={ false }
                                                        copyButtonDescription={ "Copy Repository Data to Clipboard" }
                                                        feedback={ "Copied" }
                                                        maxCollapsedNumberOfRows={ 100 }
                                                        className={ Code.code }
                                                    >
                                                        {
                                                            JSON.stringify(Row.Data, null, 4)
                                                        }
                                                    </CodeSnippet>
                                                );
                                            };

                                            return (
                                                <Fragment key={ String(Index) }>
                                                    <TableExpandRow
                                                        expandIconDescription={ "Select to Expand Repository's Description" } { ... getRowProps({ row: Row }) }>
                                                        <TableSelectRow { ... getSelectionProps({ row: Row }) } />
                                                        <TableCell
                                                            key={ String(Index) + "-" + "ID" + "-" + Row.UID }
                                                            name={ String(Index) + "-" + "ID" + "-" + Row.UID }
                                                        >
                                                            <CodeSnippet
                                                                type="single"
                                                                feedback={ "Copied" }
                                                                copyButtonDescription={ "Copy Code Snippet Content" }
                                                                hideCopyButton={ false }
                                                                copyLabel={ "Row-ID" }
                                                                className={ Light.light }
                                                            >
                                                                {
                                                                    String(Row.UID)
                                                                }
                                                            </CodeSnippet>
                                                        </TableCell>
                                                        <TableCell
                                                            key={ String(Index) + "-" + "Name" + "-" + Row.UID }
                                                            name={ String(Index) + "-" + "Name" + "-" + Row.UID }
                                                        >
                                                            <CodeSnippet type={ "single" } feedback={ "Saved to Clipboard" } className={ Bold.bold }>
                                                                { Row.Name }
                                                            </CodeSnippet>
                                                        </TableCell>
                                                        <TableCell
                                                            className={ Activity.activity } key={ String(Index) + "-" + "Activity" }
                                                            name={ String(Index) + "-" + "Activity" }
                                                        >
                                                            <p className={ Activity.paragraph }>
                                                                {
                                                                    String(Row.Activity).slice(0, 10)
                                                                }
                                                            </p>
                                                        </TableCell>
                                                        <TableCell
                                                            key={ String(Index) + "-" + "Visibility" + "-" + Row.UID }
                                                            id={ String(Index) + "-" + "Visibility" + "-" + Row.UID }
                                                        >
                                                            {
                                                                (Row.Visibility === "PUBLIC") ? (
                                                                    <Visibility
                                                                        id={ "Visibility-Tag" + "-" + String(Index) }
                                                                        className={ Tag.tag }
                                                                        type="green"
                                                                        title="Public-Visibility-Tag"
                                                                        children={ (
                                                                            <strong>Public</strong>
                                                                        ) }
                                                                        onClick={ () => window.open(Row.URL) }
                                                                    />
                                                                ) : (
                                                                    Row.Visibility === "PRIVATE"
                                                                ) ? (
                                                                    <Visibility
                                                                        id={ "Visibility-Tag" + "-" + String(Index) }
                                                                        className={ Tag.tag }
                                                                        type="red"
                                                                        title="Private-Visibility-Tag"
                                                                        children={ (
                                                                            <strong>Private</strong>
                                                                        ) }
                                                                        onClick={ () => window.open(Row.URL) }
                                                                    />
                                                                ) : (
                                                                    <Visibility
                                                                        id={ "Visibility-Tag" + "-" + String(Index) }
                                                                        className={ Tag.tag }
                                                                        type="purple"
                                                                        title="Internal-Visibility-Tag"
                                                                        children={ (
                                                                            <strong>Internal</strong>
                                                                        ) }
                                                                        onClick={ () => window.open(Row.URL) }
                                                                    />
                                                                )
                                                            }
                                                        </TableCell>
                                                        <TableCell
                                                            id={ String(Index) + "-" + "URL" + "-" + Row.UID }
                                                            key={ String(Index) + "-" + "URL" + "-" + Row.UID }
                                                        >
                                                            <URL url={ Row.URL } home={ Home } key={ "VCS-URL-Link-Key" + "-" + String(Index) }/>
                                                        </TableCell>
                                                        <TableCell
                                                            id={ String(Index) + "-" + "Overflow" + "-" + Row.UID }
                                                            key={ String(Index) + "-" + "Overflow" + "-" + Row.UID }
                                                        >
                                                            <div style={ {
                                                                display: "flex",
                                                                justifyContent: "space-between"
                                                            } }
                                                            >
                                                                <Modal.Environment id={ Row.UID }/>
                                                                <Modal.Modify id={ Row.UID }/>
                                                                <Modal.Trigger id={ Row.UID }/>
                                                            </div>
                                                        </TableCell>
                                                    </TableExpandRow>
                                                    <TableExpandedRow colSpan={ headers.length + 2 }>
                                                        <br/>
                                                        <p>
                                                            <strong>
                                                                Description
                                                            </strong>
                                                            - { " " }
                                                            {
                                                                (Data[Index]?.description)
                                                                    ? Data[Index].description
                                                                    : "N/A"
                                                            }
                                                        </p>
                                                        <hr style={ { marginBottom: "1.25rem" } }/>
                                                        <Snippet/>
                                                        <br/>
                                                    </TableExpandedRow>
                                                </Fragment>
                                            );
                                        })
                                }
                            </TableBody>
                        </Table>
                        {/*{*/ }
                        {/*    (Data) ? (<Pagination Pages={ Pages }/>) : (<></>)*/ }
                        {/*}*/ }
                    </TableContainer>
                ) }
        />
    );
};

export default Component;

//import React, { Fragment, useMemo } from "react";
//
//import {
//    Button,
//    CodeSnippet,
//    DataTable,
//    Link,
//    Table,
//    TableBatchAction,
//    TableBatchActions,
//    TableBody,
//    TableCell,
//    TableContainer,
//    TableExpandedRow,
//    TableExpandHeader,
//    TableExpandRow,
//    TableHead,
//    TableHeader,
//    TableRow,
//    TableSelectAll,
//    TableSelectRow,
//    TableToolbar,
//    TableToolbarContent
//    //    TableToolbarSearch
//} from "@carbon/react";
//
//import { Data_132 as DICO } from "@carbon/icons-react/lib/__generated__/bucket-7";
//import { ChartCombo32 as Metrics } from "@carbon/icons-react/lib/__generated__/bucket-3";
//import { CrossTab32 as CSV } from "@carbon/icons-react/lib/__generated__/bucket-6";
//import { Renew32 as Reload } from "@carbon/icons-react/lib/__generated__/bucket-20";
//
//import "./SCSS/Overflow.scss";
//
//import * as Light from "./SCSS/Light.module.scss";
//import * as Bold from "./SCSS/Bold.module.scss";
//import * as Activity from "./SCSS/Activity.module.scss";
//import * as Tag from "./SCSS/Tag.module.scss";
//import * as Code from "./SCSS/Code.module.scss";
//
//import { Store, STORE } from "./Query";
//
//import { default as Pagination } from "./Paginator";
//
//import { Tag as Visibility } from "carbon-components-react";
//
////import { OverflowMenuVertical, Launch } from "@carbon/icons-react";
////
//import { default as Modal } from "./Modal.js";
//
//const URL = ({ url, home }) => {
//    return (
//        <ul style={ { width: "max-content" } }>
//            <li style={ { display: "inline" } }>
//                <Link href={ url } className={ "io--underline-text" }>
//                    <strong>
//                        Repository
//                    </strong>
//                </Link>
//            </li>
//            { home && (
//                <li style={ { display: "inline" } }>
//                    <span>
//                        {
//                            " " + "|" + " "
//                        }
//                    </span>
//                    <Link href={ home }>
//                        Gitlab
//                    </Link>
//                </li>
//            ) }
//        </ul>
//    );
//};
//
//function batchActionClick(event, rows = null) {
//    if ( event ) console.debug("Batch-Action-Click", event.target.id);
//    if ( event.target.getAttribute("dataset-target-row") !== null ) {
//        console.log(JSON.parse(event.target.getAttribute("dataset-target-data")));
//    }
//}
//
//async function Refresh(setter) {
//    await Store.removeItem(STORE, (error) => {
//        (
//            error
//        ) ? console.error(
//            "[Error", "Unable to Clear Cache", error
//        ) : console.debug(
//            "[DEBUG]", "Successfully Removed Session Cache"
//        );
//
//        setter(true);
//    });
//}
//
//const Compute = (Data, Projects) => Data.forEach((Repository, Index) => {
//    useMemo(() => {
//        Projects[Index] = {
//            id: String(Index),
//            disabled: false,
//            isExpanded: false,
//            isSelected: false,
//            cells: Object.values({ Repository }),
//            UID: (Repository.id !== null) ? String(Repository.id) : 0,
//            Name: (Repository.name !== null) ? String(Repository.name) : "N/A",
//            Visibility: (Repository.visibility !== null) ? String(Repository.visibility).toUpperCase() : "Internal",
//            Activity: (Repository.last_activity_at !== null) ? String(Repository.last_activity_at) : "N/A",
//            URL: (
//                Repository.web_url !== null
//            ) ? String(Repository.web_url) : "N/A",
//            Data: Repository
//        };
//    }, []);
//});
//
//const Component = ({ Data, Headers, State, Pages }) => {
//    const Home = "https://gitlab.cloud-technology.io/";
//
//    const Total = (
//        Data
//    ) ? Data?.length : 0;
//    const Projects = new Array(Total);
//
//    Data.forEach((Repository, Index) => {
//        Projects[Index] = React.useMemo(() => {
//            return {
//                id: String(Index),
//                disabled: false,
//                isExpanded: false,
//                isSelected: false,
//                cells: Object.values({ Repository }),
//                UID: (Repository.id !== null) ? String(Repository.id) : 0,
//                Name: (Repository.name !== null) ? String(Repository.name) : "N/A",
//                Visibility: (Repository.visibility !== null) ? String(Repository.visibility).toUpperCase() : "Internal",
//                Activity: (Repository.last_activity_at !== null) ? String(Repository.last_activity_at) : "N/A",
//                URL: (Repository.web_url !== null) ? String(Repository.web_url) : "N/A",
//                Data: Repository
//            };
//        }, []);
//    });
//
//    return (
//        <DataTable
//            rows={ Projects }
//            headers={ Headers }
//            isSortable={ false }
//            size={ "normal" }
//            stickyHeader={ false }
//            useStaticWidth={ false }
//            render={
//                ({
//                     rows,
//                     headers,
//                     getTableProps,
//                     getTableContainerProps,
//                     getSelectionProps,
//                     getExpandHeaderProps,
//                     getHeaderProps,
//                     getRowProps,
//                     getToolbarProps,
//                     getBatchActionProps
//                 }) => (
//                    <TableContainer title={ "Cloud-Technology" } description="Cloud-Technology's GitHub Repositories" { ... getTableContainerProps() }>
//                        <TableToolbar { ... getToolbarProps() } className={ "io-table-toolbar" }>
//                            <TableBatchActions { ... getBatchActionProps() }>
//                                <TableBatchAction
//                                    id="Development-Table-JSON-Trigger-Button"
//                                    renderIcon={ DICO }
//                                    onClick={ batchActionClick }
//                                >
//                                    JSON
//                                </TableBatchAction>
//                                <TableBatchAction
//                                    id="Development-Table-Metrics-Trigger-Button"
//                                    renderIcon={ Metrics }
//                                    onClick={ batchActionClick }
//                                >
//                                    Metrics
//                                </TableBatchAction>
//                                <TableBatchAction
//                                    id="Development-Table-Download-Trigger-Button"
//                                    renderIcon={ CSV }
//                                    onClick={ batchActionClick }
//                                >
//                                    Download
//                                </TableBatchAction>
//                            </TableBatchActions>
//                            <TableToolbarContent>
//                                {
//                                    // <TableToolbarSearch
//                                    //     persistent={ true }
//                                    //     defaultExpanded={ true }
//                                    //     searchContainerClass={ Search.search }
//                                    //     placeholder={ " " }
//                                    //     onExpand={
//                                    //         (event) => {
//                                    //             const Element = document.getElementsByClassName(Search.search).item(0);
//                                    //             const Input = document.getElementsByClassName("cds--search-input").item(0);
//                                    //
//                                    //             (event.type === "blur")
//                                    //                 ? console.debug("[Debug]", "Search Collapse Event")
//                                    //                 : console.debug("[Debug]", "Search Expand Event");
//                                    //
//                                    //             if ( event.type === "focus" ) {
//                                    //                 Input.style.outline = "0";
//                                    //                 Input.style.paddingLeft = "3.0rem";
//                                    //                 Input.style.paddingRight = "3.0rem";
//                                    //
//                                    //                 Element.setAttribute("expanded", "true");
//                                    //             } else {
//                                    //                 Input.style.outline = "0";
//                                    //                 Input.style.paddingLeft = "0.0rem";
//                                    //                 Input.style.paddingRight = "0.0rem";
//                                    //
//                                    //                 Element.removeAttribute("expanded");
//                                    //             }
//                                    //         }
//                                    //     }
//                                    //     labelText={ "Test-Label-Text" }
//                                    //     expanded={ false }
//                                    //     tabIndex={ 0 }
//                                    // />
//                                }
//                                <Button
//                                    kind="ghost"
//                                    size="default"
//                                    hasIconOnly={ true }
//                                    onClick={ async () => await Refresh(State) }
//                                    renderIcon={ Reload }
//                                    tabIndex={ 0 }
//                                    iconDescription={ "Reload Table & Clear Cache" }
//                                    tooltipAlignment={ "center" }
//                                    tooltipPosition={ "left" }
//                                    type={ "button" }
//                                />
//                            </TableToolbarContent>
//                        </TableToolbar>
//                        <Table { ... getTableProps() }>
//                            <TableHead>
//                                <TableRow>
//                                    <TableExpandHeader enableToggle={ true } { ... getExpandHeaderProps() } />
//                                    <TableSelectAll { ... getSelectionProps() } />
//                                    {
//                                        Headers.map(
//                                            (Header) => (Header.value === "Name")
//                                                ? (
//                                                    <TableHeader { ... getHeaderProps({ header: Header }) } colSpan={ 1 }>
//                                                        { Header.value }
//                                                    </TableHeader>
//                                                ) : (
//                                                    <TableHeader { ... getHeaderProps({ header: Header }) } colSpan={ 1 }>
//                                                        { Header.value }
//                                                    </TableHeader>
//                                                )
//                                        )
//                                    }
//                                </TableRow>
//                            </TableHead>
//                            <TableBody>
//                                {
//                                    Projects.map(
//                                        (Row, Index) => {
//                                            Row = { ... Row, ... rows[Index] };
//
//                                            const Data = Row.Data;
//
//                                            const Snippet = () => {
//                                                return (
//                                                    <CodeSnippet
//                                                        type={ "multi" }
//                                                        wrapText={ false }
//                                                        copyButtonDescription={ "Copy Repository Data to Clipboard" }
//                                                        feedback={ "Copied" }
//                                                        maxCollapsedNumberOfRows={ 100 }
//                                                        className={ Code.code }
//                                                    >
//                                                        {
//                                                            JSON.stringify(Row.Data, null, 4)
//                                                        }
//                                                    </CodeSnippet>
//                                                );
//                                            };
//
//                                            return (
//                                                <Fragment key={ String(Index) }>
//                                                    <TableExpandRow
//                                                        expandIconDescription={ "Select to Expand Repository's Description" } { ... getRowProps({ row: Row }) }>
//                                                        <TableSelectRow { ... getSelectionProps({ row: Row }) } />
//                                                        <TableCell
//                                                            key={ String(Index) + "-" + "ID" + "-" + Row.UID }
//                                                            name={ String(Index) + "-" + "ID" + "-" + Row.UID }
//                                                        >
//                                                            <CodeSnippet
//                                                                type="single"
//                                                                feedback={ "Copied" }
//                                                                copyButtonDescription={ "Copy Code Snippet Content" }
//                                                                hideCopyButton={ false }
//                                                                copyLabel={ "Row-ID" }
//                                                                className={ Light.light }
//                                                            >
//                                                                {
//                                                                    String(Row.UID)
//                                                                }
//                                                            </CodeSnippet>
//                                                        </TableCell>
//                                                        <TableCell
//                                                            key={ String(Index) + "-" + "Name" + "-" + Row.UID }
//                                                            name={ String(Index) + "-" + "Name" + "-" + Row.UID }
//                                                        >
//                                                            <CodeSnippet type={ "single" } feedback={ "Saved to Clipboard" } className={ Bold.bold }>
//                                                                { Row.Name }
//                                                            </CodeSnippet>
//                                                        </TableCell>
//                                                        <TableCell
//                                                            className={ Activity.activity } key={ String(Index) + "-" + "Activity" }
//                                                            name={ String(Index) + "-" + "Activity" }
//                                                        >
//                                                            <p className={ Activity.paragraph }>
//                                                                {
//                                                                    String(Row.Activity).slice(0, 10)
//                                                                }
//                                                            </p>
//                                                        </TableCell>
//                                                        <TableCell
//                                                            key={ String(Index) + "-" + "Visibility" + "-" + Row.UID }
//                                                            id={ String(Index) + "-" + "Visibility" + "-" + Row.UID }
//                                                        >
//                                                            {
//                                                                (Row.Visibility === "PUBLIC") ? (
//                                                                    <Visibility
//                                                                        id={ "Visibility-Tag" + "-" + String(Index) }
//                                                                        className={ Tag.tag }
//                                                                        type="green"
//                                                                        title="Public-Visibility-Tag"
//                                                                        children={ (
//                                                                            <strong>Public</strong>
//                                                                        ) }
//                                                                        onClick={ () => window.open(Row.URL) }
//                                                                    />
//                                                                ) : (
//                                                                    Row.Visibility === "PRIVATE"
//                                                                ) ? (
//                                                                    <Visibility
//                                                                        id={ "Visibility-Tag" + "-" + String(Index) }
//                                                                        className={ Tag.tag }
//                                                                        type="red"
//                                                                        title="Private-Visibility-Tag"
//                                                                        children={ (
//                                                                            <strong>Private</strong>
//                                                                        ) }
//                                                                        onClick={ () => window.open(Row.URL) }
//                                                                    />
//                                                                ) : (
//                                                                    <Visibility
//                                                                        id={ "Visibility-Tag" + "-" + String(Index) }
//                                                                        className={ Tag.tag }
//                                                                        type="purple"
//                                                                        title="Internal-Visibility-Tag"
//                                                                        children={ (
//                                                                            <strong>Internal</strong>
//                                                                        ) }
//                                                                        onClick={ () => window.open(Row.URL) }
//                                                                    />
//                                                                )
//                                                            }
//                                                        </TableCell>
//                                                        <TableCell
//                                                            id={ String(Index) + "-" + "URL" + "-" + Row.UID }
//                                                            key={ String(Index) + "-" + "URL" + "-" + Row.UID }
//                                                        >
//                                                            <URL url={ Row.URL } home={ Home } key={ "VCS-URL-Link-Key" + "-" + String(Index) }/>
//                                                        </TableCell>
//                                                        <TableCell
//                                                            id={ String(Index) + "-" + "Overflow" + "-" + Row.UID }
//                                                            key={ String(Index) + "-" + "Overflow" + "-" + Row.UID }
//                                                        >
//                                                            <div style={ {
//                                                                display: "flex",
//                                                                justifyContent: "space-between"
//                                                            } }>
//                                                                <Modal.Environment id={ Row.UID }/>
//                                                                <Modal.Modify id={ Row.UID }/>
//                                                                <Modal.Trigger id={ Row.UID }/>
//                                                            </div>
//                                                        </TableCell>
//                                                    </TableExpandRow>
//                                                    <TableExpandedRow colSpan={ headers.length + 2 }>
//                                                        <br/>
//                                                        <p>
//                                                            <strong>
//                                                                Description
//                                                            </strong> - { " " }
//                                                            {
//                                                                (Data[Index]?.description)
//                                                                    ? Data[Index].description
//                                                                    : "N/A"
//                                                            }
//                                                        </p>
//                                                        <hr style={ { marginBottom: "1.25rem" } }/>
//                                                        <Snippet/>
//                                                        <br/>
//                                                    </TableExpandedRow>
//                                                </Fragment>
//                                            );
//                                        })
//                                }
//                            </TableBody>
//                        </Table>
//                        {
//                            (Data) ? (<Pagination Pages={ Pages }/>) : (<></>)
//                        }
//                    </TableContainer>
//                ) }
//        />
//    );
//};
//
//export default Component;