import "./Index.scss";

import React, { useState } from "react";

import {
    Button, Form, FormGroup, TextInput, Toggle, Checkbox, Select, SelectItem, SelectItemGroup
} from "@carbon/react";

///import { APIKeyModal } from "@carbon/ibm-cloud-cognitive";

const Label = ({Text}) => (
    <>
        <p className={"io-api-key-modal-legend-label"}>
            {
                Text
            }
        </p>
    </>
);

const Component = () => {
    const [isOpen, setIsOpen] = useState(false);

    const [isAPIKeyModalLoading, setAPIKeyModalLoading] = useState(false);

    const [apiKeyVisibility, setAPIKeyVisibility] = useState(false);
    const [apiKeyDownloadLink, setAPIKeyDownloadLink] = useState(false);
    const [apiKeyGlobalAccessToggleEnabled, setAPIKeyGlobalAccessToggleEnabled] = useState(false);

    const [applicationName, setApplicationName] = useState("");

    // const [resourceSelectionHelperText, setResourceSelectionHelperText] = useState(false);
    // const [resourceSelectionHelperTextContext, setResourceSelectionHelperTextContext] = useState(null);

    const Key = () => {
        return (
            <>
                <FormGroup
                    className="exp--apikey-modal__permissions"
                    aria-orientation={"vertical"}
                    legendText={(<Label Text={"Provision or Replace an Existing API Key"}/>)}
                >
                    <TextInput
                        autoFocus={true}
                        id={"name-input"}
                        labelText="Optional Key-Name Identifier"
                        hideLabel={true}
                        onChange={
                            (event) => setApplicationName(
                                event.target.value
                            )
                        }
                        value={applicationName}
                        name={"API-Key-Application-Name-Field"}
                        placeholder={"Optional Key-Name Identifier"}
                    />
                </FormGroup>
                <FormGroup
                    className={"io-api-key-modal-scopes-section"}
                    aria-orientation={"vertical"}
                    legendText={(
                        <span style={{fontSize: "0.85rem"}}>
                            Available Scope(s)
                        </span>
                    )}
                >
                    <Checkbox
                        id={"Check-Box-API"}
                        labelText="API"
                        value="API"
                        defaultChecked={false}
                    />
                    <Checkbox
                        id={"Check-Box-Read"}
                        labelText="Read"
                        value="Read"
                        defaultChecked={false}
                    />
                    <Checkbox
                        id={"Check-Box-Write"}
                        labelText="Write"
                        value="Write"
                        defaultChecked={false}
                    />
                    <br/>
                    <Checkbox
                        id={"Check-Box-Global"}
                        labelText="Global"
                        value="Global"
                        defaultChecked={false}
                        disabled={true}
                    />
                </FormGroup>
            </>
        );
    };

    const Access = () => {
        return (
            <>
                <Form onSubmit={(event) => console.debug("[Debug] Event", event)}>
                    <FormGroup className="exp--apikey-modal__resource-toggle"
                               legendText={
                                   (
                                       <>
                                            <p>
                                                Enable Wildcard Access to All Resources
                                                {" "}
                                                <strong>
                                                    (Not Recommended)
                                                </strong>
                                            </p>
                                           <br/>
                                        </>
                                   )
                               }>
                        <Toggle autoFocus={false}
                                id="API-Key-Enable-All-Resource-Access"
                                labelA="Disabled"
                                labelB="Enabled"
                                labelText={"(*) Resource Access"}
                                onChange={
                                    (event) =>
                                        setAPIKeyGlobalAccessToggleEnabled(
                                            event.target.value
                                        )
                                }
                                value={apiKeyGlobalAccessToggleEnabled}
                        />
                    </FormGroup>
                    <Select autoFocus={false}
                            // helperText={
                            //     (resourceSelectionHelperText)
                            //         ? resourceSelectionHelperTextContext
                            //             : null
                            // }
                            id={"API-Key-Enable-All-Resource-Access-Selection"}
                            invalidText={"A valid value is required"}
                            labelText={"API-Key-Enable-All-Resource-Access-Label"}
                            defaultValue={"-"}
                            hideLabel={true}
                            className={"io-api-modal-resource-access-selection"}
                    >
                        <SelectItem text="Select a Resource ..." value="-" disabled={true}/>
                        <SelectItem text="(*) Global" value="*"/>
                        <SelectItemGroup label="Category 1">
                            <SelectItem text="Option 1" value="option-1"/>
                            <SelectItem text="Option 2" value="option-2"/>
                        </SelectItemGroup>
                        <SelectItemGroup label="Category 2">
                            <SelectItem text="Option 3" value="option-3"/>
                            <SelectItem text="Option 4" value="option-4"/>
                        </SelectItemGroup>
                    </Select>
                </Form>
            </>
        );
    };

    return (
        <>
            <APIKeyModal
                id={"API-Key-Modal"}
                className={"io-api-key-modal"}
                modalLabel={"API Key Generator"}
                apiKey=""
                apiKeyLabel="API-Key-Label"
                closeButtonText="Close"
                copyButtonText="Copy"
                copyIconDescription="Copy"
                customSteps={[
                    {
                        title: "Configuration, Scope(s) Setup",
                        content: (<Key/>),
                        valid: true
                    },
                    {
                        title: "Resource & Access Enablement",
                        content: (<Access/>),
                        valid: true
                    }
                ]}
                downloadBodyText="This is your unique API key and is non-recoverable. If you lose this API key, you will have to reset it."
                downloadFileName="apikey"
                downloadFileType="json"
                downloadLinkText="Download as JSON"
                editSuccessTitle="API key successfully saved"
                generateButtonText="Generate"
                generateSuccessBody={(
                    <p>
                        This is your unique API key and is non-recoverable. If you lose this API key, you will have to reset it.
                    </p>
                )}
                generateSuccessTitle="API key successfully created"
                hasAPIKeyVisibilityToggle={apiKeyVisibility}
                hasDownloadLink={apiKeyDownloadLink}
                nameRequired={false}
                nameHelperText={"Name-Helper-Text"}
                hideAPIKeyLabel={"Hide-API-Key-Label"}
                loadingText={"Loading-API-Modal-Text"}
                loading={isAPIKeyModalLoading}
                nextStepButtonText={"Resource Permissions"}
                previousStepButtonText={"Setup"}
                onRequestEdit={() => console.debug("Edit Request")}
                onRequestGenerate={() => console.debug("Generation Request")}
                showAPIKeyLabel={"Show-API-Modal-Key-Label"}
                open={isOpen}
                onClose={() => setIsOpen(false)}
            />
            <Button onClick={() => setIsOpen(true)}>
                API Key Generator
            </Button>
        </>
    );
};

export default Component;