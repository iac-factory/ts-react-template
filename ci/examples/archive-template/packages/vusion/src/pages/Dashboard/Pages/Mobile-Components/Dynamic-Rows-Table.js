import "./SCSS/Table.scss";

import React, { useEffect, useState } from "react";
import { default as ButtonManager } from "./Button-Manager";

import { Unknown, Download, Edit } from "@carbon/icons-react";

import { default as Placeholder } from "./Table-Skeleton";

import {
    Button,
    CodeSnippet,
    DataTable,
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
    TableToolbarContent,
    TableToolbarSearch
} from "@carbon/react";

import { JWT } from "../../../../components/Authenticate.js";

const Editor = () => {
    return (
        <Edit style={ { fill: "white" } }/>
    );
};

//const Cryptography = require("crypto");

const Headers = [
    {
        key: "name",
        header: "Label"
    },
    {
        key: "value",
        header: "URL"
    }
];

const PREVIEW_ID = "PREVIEW-ID";

const Component = ({ state }) => {
    const [ modified, setModified ] = useState(null);
    const [ SelectedRow, setSelectedRow ] = useState(null);
    const [ rows, setRows ] = useState(null);
    const [ isManagerOpen, setIsManagerOpen ] = useState(false);

    useEffect(() => {
        JWT().then((Data) => {
            console.debug("JWT Token", Data);
            const Token = Data.JWT;

            require("axios").get(process.env.REACT_APP_API_ENDPOINT + "/Mongo/URLs/Interfaces", {
                headers: {
                    Authorization: "Bearer" + " " + Token,
                    "Access-Control-Allow-Origin": "*"
                }
            }).then((Response) => {
                console.log("Response (HTML)", Response.data["Content"]);

                // ... Update iFrame if Drift(s)

                setRows(Response.data["Content"]);
            });
        });
    }, []);

    const Save = () => {
        const Await = async () => await new Promise((_) => setTimeout((_) => console.debug("Waiter Complete"), 3000));

        console.debug("Saving ...");
        Await().finally(() => {
            //...
        });
    };

    // Modify ...
    // Delete ...
    const Update = (body) => {
        JWT().then((Data) => {
            console.debug("JWT Token", Data);

            const Token = Data.JWT;

            require("axios").post(process.env.REACT_APP_API_ENDPOINT + "/Mongo/URLs/Interfaces/Update", {
                Content: body
            }, {
                headers: {
                    Authorization: "Bearer" + " " + Token
                }
            }).then((Response) => {
                console.log("Request", {
                    "Content": body
                });
                console.log("Response (HTML)", Response.data["Content"]);

                // ... Update iFrame

                setRows(Response.data["Content"]);
            });
        });
    };

    // const UID = () => Cryptography.randomBytes(256 / 8).toString("hex");

    const Compose = (array, element) => {
        const index = array.length;
        return [ ... array.slice(0, index), element, ... array.slice(index) ];
    };

    function Redirection(Redirect) {
        window.open(Redirect, "_blank");
    }

    const handleOnRowModified = (SelectedRow, Schema, Atlas, Name, Redirect) => {
        const ID = SelectedRow.id;
        const iFrame = document.getElementById(PREVIEW_ID);
        const Content = iFrame.contentWindow || (iFrame.contentDocument.document || iFrame.contentDocument);
        const Button = Content.document.getElementById(ID);

        Button.textContent = Name;
        Button.onclick = () => Redirection(Redirect);

        const Mapping = new Map();

        Atlas.forEach((Key, Index, _) => {
            Mapping.set(Key[0], Key[1]);
        });

        Mapping.forEach((Key, Value) => {
            Button.style[Key] = Value;
        });

        const row = {
            id: Button.id,
            key: [ "Key", String(ID) ].join("-"),
            name: Name,
            value: {
                Name,
                Redirect,
                Button: Button,
                Mapping: Schema,
                Atlas: Atlas
            }
        };

        const Items = rows.filter((item) => item.id !== row.id);

        Items.push(row);

        console.debug("Rows (Modified)", Items);

        // ... Create Modify (Different Function of basically `Update`) Handler where inside that callable `setRows` is applied.

        setRows(Items);
    };

    const handleOnRowAdd = (Schema, Atlas, Name, Redirect) => {
        const ID = Number(rows.length);
        const iFrame = document.getElementById(PREVIEW_ID);
        const Content = (iFrame) ? iFrame?.contentWindow || (iFrame?.contentDocument.document || iFrame?.contentDocument) : null;
        const Button = document.createElement("button");

        Button.className = "io-ghost";
        Button.textContent = Name;
        Button.onclick = () => Redirection(Redirect);
        // Button.id = [ "Button", "ID", String(ID), UID() ].join("-");
        Button.id = [ "Button", "ID", String(ID) ].join("-");
        Button.dataset.row = String(ID);

        const Mapping = new Map();

        Atlas.forEach((Key, Index, _) => {
            Mapping.set(Key[0], Key[1]);
        });

        Mapping.forEach((Key, Value) => {
            Button.style[Key] = Value;
        });

        Content?.document.getElementsByTagName("div").item(0)
            .append(Button);

        const row = {
            id: Button.id,
            key: [ "Key", String(ID) ].join("-"),
            name: Name,
            value: {
                Name,
                Redirect,
                Button: Button,
                Mapping: Schema,
                Atlas: Atlas
            }
        };

        const composition = Compose(rows, row);

        console.debug("Rows (Added)", composition);

        console.debug("Mutating ...");

        Update(composition);
    };

    const handleOnRowRemove = (selectedRows) => {
        const Targets = {
            Array: []
        };

        selectedRows.forEach((element) => {
            const Row = rows.filter((e) => e.id === element.id);

            Targets.Array.push(Row[0]);

            const ID = Row[0].id;

            const iFrame = document.getElementById(PREVIEW_ID);

            const Content = iFrame.contentWindow || (iFrame.contentDocument.document || iFrame.contentDocument);

            const Button = Content.document.getElementById(ID);

            Content.document.getElementsByTagName("div")
                .item(0).removeChild(Button);
        });

        const Items = rows.filter((item) => !Targets.Array.includes(item));

        console.debug("Modified Rows (Deleted)", Items);

        // ... Create Delete (Different Function of basically `Update`) Handler where inside that callable `setRows` is applied.

        setRows(Items);
    };

    return (
        <>
            <ButtonManager
                isOpen={ isManagerOpen }
                setIsOpen={ setIsManagerOpen }
                rowAdd={ handleOnRowAdd }
                rowModify={ handleOnRowModified }
                modifiable={ modified }
                setModifiable={ setModified }
                selectedRow={ SelectedRow }
            />
            {
                (rows !== [] && rows !== null) ? (
                    <DataTable
                        rows={ rows }
                        headers={ Headers }
                        isSortable={ true }
                        render={ ({
                            rows,
                            headers,
                            onInputChange,
                            selectedRows,
                            getExpandHeaderProps,
                            getRowProps,
                            getSelectionProps,
                            getToolbarProps,
                            getBatchActionProps,
                            getTableContainerProps,
                            getTableProps
                        }) => (
                            <TableContainer
                                className={ "io-data-table" }
                                title="Button Template Editor"
                                description="Use this button editor to manage your page."
                                { ... getTableContainerProps() }>
                                <TableToolbar { ... getToolbarProps() }>
                                    <TableBatchActions { ... getBatchActionProps() }>
                                        <TableBatchAction
                                            tabIndex={ getBatchActionProps().shouldShowBatchActions ? 0 : -1 }
                                            renderIcon={ Unknown }
                                            children={ "Delete" }
                                            disabled={ (rows.length <= 0) }
                                            onClick={ () => handleOnRowRemove(selectedRows) }
                                        />
                                    </TableBatchActions>
                                    <TableToolbarContent>
                                        <TableToolbarSearch
                                            persistent={ false }
                                            labelText={ "Table-Search-Filter" }
                                            placeholder={ "Search" }
                                            disabled={ false }
                                            tabIndex={ getBatchActionProps().shouldShowBatchActions ? -1 : 0 }
                                            onChange={ onInputChange }
                                        />
                                        <Button
                                            kind="primary"
                                            size="field"
                                            onClick={ () => {
                                                setIsManagerOpen(true);
                                            } } renderIcon={ Download }
                                            disabled={ !state[0] }
                                            children={ "Add Button" }
                                        />
                                        <Button
                                            kind="danger"
                                            size="field"
                                            onClick={ Save } renderIcon={ Download }
                                            disabled={ !state[0] }
                                            children={ "Save" }
                                        />
                                    </TableToolbarContent>
                                </TableToolbar>
                                <Table { ... getTableProps() }>
                                    <TableHead>
                                        <TableRow>
                                            <TableExpandHeader
                                                enableExpando={ true } { ... getExpandHeaderProps() }
                                                expandIconDescription={ (rows.length === 0 || !rows) ? "Disabled: Row Data Unavailable" : "Select to Expand Row Data" }
                                                hidden={ (rows.length === 0 || !rows) }
                                                colSpan={ 1 }
                                            />
                                            <TableSelectAll { ... getSelectionProps() }
                                                disabled={ (rows.length === 0 || !rows) }
                                            />
                                            <TableHeader colSpan={ 1 }>
                                                { Headers[0].header }
                                            </TableHeader>
                                            <TableHeader colSpan={ 1 }>
                                                { Headers[1].header }
                                            </TableHeader>
                                            <TableHeader
                                                key={ "Table-Action-Row-Header" } id={ "Table-Row-Header" }
                                                style={ { width: "50px" } }
                                            />
                                        </TableRow>
                                    </TableHead>
                                    <TableBody data-total={ rows.length }>
                                        { rows.map((row, index) => (
                                            <React.Fragment key={ row.id }>
                                                <TableExpandRow
                                                    expandIconDescription={ "Select to Expand" } { ... getRowProps({ row }) }>
                                                    <TableSelectRow { ... getSelectionProps({ row }) }/>
                                                    <TableCell
                                                        key={ String(row.id) + "Key-Name" }
                                                        id={ String(index) + "-" + "Label" + "-" + row.id }
                                                        colSpan={ 1 }
                                                    >
                                                        { row.cells[0].value }
                                                    </TableCell>
                                                    <TableCell
                                                        key={ String(row.id) + "Key-Name-Redirect" }
                                                        id={ String(index) + "-" + "URL" + "-" + row.id }
                                                        colSpan={ 1 }
                                                    >
                                                        { row.cells[1].value.Redirect }
                                                    </TableCell>
                                                    <TableCell
                                                        key={ "Table-Row-Action" + "-" + String(index) }
                                                        id={ "Table-Row-Action" }
                                                    >
                                                        {
                                                            (
                                                                <>
                                                                    <Button
                                                                        className={ "io-inline-table-column-button-item io-hidden-assistive-text" }
                                                                        size={ "sm" }
                                                                        tooltipAlignment={ "center" }
                                                                        renderIcon={ () => (<Editor/>) }
                                                                        tooltipPosition={ "right" }
                                                                        iconDescription={ "..." }
                                                                        tabIndex={ 0 }
                                                                        isExpressive={ false }
                                                                        kind={ "secondary" }
                                                                        hasIconOnly={ true }
                                                                        onClick={ () => {
                                                                            if (rows !== null) {
                                                                                console.debug("Editor Open", "Field Pre-Population :=", true);
                                                                            } else {
                                                                                console.debug("Editor Open", "Field Pre-Population", false);
                                                                            }

                                                                            setSelectedRow(rows[index]);
                                                                            setModified(true);
                                                                            setIsManagerOpen(true);
                                                                        } }
                                                                    />
                                                                </>
                                                            )
                                                        }
                                                    </TableCell>
                                                </TableExpandRow>
                                                <TableExpandedRow
                                                    id={ "Expanded-Row-ID" + "-" + String(index) }
                                                    colSpan={ headers.length + 3 }
                                                >
                                                    <CodeSnippet
                                                        type={ "single" }
                                                        className={ "io-code-snippet-fluid-height" }
                                                        feedback={ "Copied" }
                                                        copyButtonDescription={ "Copy JSON Data" }
                                                        copyLabel={ "Row-ID" }
                                                        style={ {
                                                            background: "rgba(11, 11, 15, 0.875)",
                                                            color: "white",
                                                            borderRadius: "0.75rem"
                                                        } }
                                                        children={ String(JSON.stringify(row, null, 4)) }
                                                    />
                                                </TableExpandedRow>
                                            </React.Fragment>
                                        )) }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        ) }
                    />
                ) : (
                    (<Placeholder Headers={ 4 } Rows={ 5 } className={ "io-dashboard-control-primary-content" }/>)
                )
            }
        </>
    );
};

export default Component;