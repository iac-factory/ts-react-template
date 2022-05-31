import "./SCSS/Button-Manager.scss";

import {Modal, TextInput} from "@carbon/react";
import React, {useState} from "react";


const Properties = {
    ButtonName: {
        ID: "Button-Name-ID",
        HelperText: null,
        LabelText: "Button name",
        Placeholder: "url-service.com",
        InvalidText: "Invalid button name",
        WarnText: "Button name is invalid"
    },
    Redirect: {
        ID: "Button-RedirectURL-ID",
        HelperText: null,
        LabelText: "Redirect URL",
        Placeholder: "url-service.com",
        InvalidText: "Invalid Redirect URL",
        WarnText: "Redirect URL is invalid"
    }
};

const Component = ({isOpen, setIsOpen, rowAdd, rowModify, selectedRow, modifiable, setModifiable}) => {
    const [isButtonInputValid, setIsButtonInputValid] = useState(null);
    const [isRedirectInputValid, setIsRedirectInputValid] = useState(null);

    const InputValidation = (ID, SetState) => {
        const Element = document.getElementById(ID);
        const Value = Element.value;
        SetState((Value !== ""));
    };

    const Schema = {
        Styles: {
            display: "block",
            margin: "auto",
            marginBottom: "1.0rem",
            fontSize: "16px",
            color: "rgb(145, 145, 145)",
            background: "white",
            borderStyle: "solid",
            borderWidth: "0.15rem",
            borderRadius: "0.25rem",
            borderColor: "rgb(145, 145, 145)"
        }
    };

    const Atlas = [
        [Schema.Styles.display, "display",           {Key: "display", Value: Schema.Styles.display}],
        [Schema.Styles.margin, "margin",             {Key: "margin", Value: Schema.Styles.margin}],
        [Schema.Styles.marginBottom, "marginBottom", {Key: "marginBottom", Value: Schema.Styles.marginBottom}],
        [Schema.Styles.fontSize, "fontSize",         {Key: "fontSize", Value: Schema.Styles.fontSize}],
        [Schema.Styles.color, "color",               {Key: "color", Value: Schema.Styles.color}],
        [Schema.Styles.background, "background",     {Key: "background", Value: Schema.Styles.background}],
        [Schema.Styles.borderStyle, "borderStyle",   {Key: "borderStyle", Value: Schema.Styles.borderStyle}],
        [Schema.Styles.borderWidth, "borderWidth",   {Key: "borderWidth", Value: Schema.Styles.borderWidth}],
        [Schema.Styles.borderRadius, "borderRadius", {Key: "borderRadius", Value: Schema.Styles.borderRadius}],
        [Schema.Styles.borderColor, "borderColor",   {Key: "borderColor", Value: Schema.Styles.borderColor}]
    ];

    return (
        <Modal
            className={"button-editor-modal"}
            open = {isOpen}
            modalHeading="Add a custom button"
            modalLabel="Button Editor"
            primaryButtonText="Save"
            secondaryButtonText="Cancel"
            onRequestClose={() => {
                setModifiable(false);
                setIsOpen(false);
            }}
            onRequestSubmit={() => {
                if (modifiable) {
                    console.debug("Button-Manager", "Request Submission", "Modifiable :=", true);
                    const Name = document.getElementById("Button-Name-ID").value;
                    const Redirect = document.getElementById("Button-RedirectURL-ID").value;
                    rowModify(selectedRow, Schema, Atlas, Name, Redirect);
                    setModifiable(false);
                    setIsOpen(false);
                }
                else{
                    console.debug("Button-Manager", "Request Submission", "Modifiable :=", false);
                    if (isButtonInputValid && isRedirectInputValid){
                        const Name = document.getElementById("Button-Name-ID").value;
                        const Redirect = document.getElementById("Button-RedirectURL-ID").value;
                        rowAdd(Schema, Atlas, Name, Redirect);
                        setIsOpen(false);
                    }
                }
        }}
            >
            <TextInput
                data-modal-primary-focus={true}
                id={Properties.ButtonName.ID}
                labelText={Properties.ButtonName.LabelText}
                placeholder={Properties.ButtonName.Placeholder}
                invalidText={Properties.ButtonName.InvalidText}
                warnText={Properties.ButtonName.WarnText}
                helperText={Properties.ButtonName.HelperText}
                warn={(isButtonInputValid === null) ? null : !isButtonInputValid}
                onChange={(event) => {
                    InputValidation(Properties.ButtonName.ID, setIsButtonInputValid);
                }}
            />
            <TextInput
                data-modal-primary-focus={true}
                id={Properties.Redirect.ID}
                labelText={Properties.Redirect.LabelText}
                placeholder={Properties.Redirect.Placeholder}
                invalidText={Properties.Redirect.InvalidText}
                warnText={Properties.Redirect.WarnText}
                helperText={Properties.Redirect.HelperText}
                warn={(isRedirectInputValid === null) ? null : !isRedirectInputValid}
                onChange={(event) => {
                    InputValidation(Properties.Redirect.ID, setIsRedirectInputValid);
                }}
            />
        </Modal>
    );
};

export default Component;
