import "./SCSS/Field-Set.scss";

import Styles from "./SCSS/Index.module.scss";

import React, { useEffect, useState } from "react";

import { Button, Form, FormGroup, InlineLoading, TextInput } from "@carbon/react";

import { useNavigate } from "react-router-dom";

import { default as Types } from "./../../components/Types";

import { Authenticate, Cancellation } from "./Authentication";

const Component = ({ Authorizer }) => {
    const navigate = useNavigate();

    const [ awaiting, setAwaiting ] = useState(false);

    const [ validUsername, setValidUsername ] = useState(true);
    const [ validPassword, setValidPassword ] = useState(true);

    useEffect(() => {
        const addEventListeners = () => {
            const Username = document.getElementById("username-field");
            const Submit = document.getElementById("submit-button");

            // --> Page Load
            Username.autofocus = true;

            Username.focus();
            Username.click();

            document.getElementById("login-form")?.addEventListener("submit", (event) => {
                event.preventDefault();

                console.trace("[Trace]", "Trusted Event", event.isTrusted);
                console.trace("[Trace]", "Phase #", event.eventPhase);
                console.trace("[Trace]", "Composed Event Path(s)", event.composedPath());
                console.trace("[Trace]", "Event Time-Stamp", event.timeStamp);
            });

            document.getElementById("username-field")?.addEventListener("keydown", (event) => {
                if (event.key === "Enter") {
                    console.trace("[Trace]", "Username", "Return Key Event");
                    Submit.click();
                }
            });

            document.getElementById("password-field")?.addEventListener("keydown", (event) => {
                if (event.key === "Enter") {
                    console.trace("[Trace]", "Password", "Return Key Event");
                    Submit.click();
                }
            });

            console.debug("[Debug]", "Event Listeners", "Successfully Loaded Page Listeners");
        };

        addEventListeners();
    }, []);

    const handlePasswordFieldChanges = (event) => {
        const Validation = {
            Username: false,
            Password: false,
            Error: {
                Username: document.getElementById("username-field-error-msg") || false,
                Password: document.getElementById("password-field-error-msg") || false
            }
        };

        const Username = document.getElementById("username-field");
        const Password = document.getElementById("password-field");
        const Submit = document.getElementById("submit-button");

        Validation.Username = (String(Username?.value).length >= 6) && true;
        Validation.Password = (String(Password?.value).length >= 8) && true;

        (Validation.Password) && Username.classList.toggle("cds--text-input--invalid", false);
        (Validation.Password) && Username.removeAttribute("data-invalid");
        (Validation.Password) && Username.removeAttribute("aria-invalid");
        (Validation.Password) && Username.removeAttribute("aria-describedby");
        (Validation.Password) && document.getElementById("password-field-error-msg")?.remove();

        (Validation.Username && Validation.Password) && Submit.removeAttribute("disabled");
        (Validation.Username && Validation.Password) && Submit.classList.toggle("cds--btn--disabled", false);

        const Message = document.getElementsByClassName("cds--form__requirements").item(0);

        Message && ((Validation.Username || Validation.Username === null) || (Validation.Password || Validation.Password === null)) && Message.remove();
    };

    const handleUsernameFieldChanges = (event) => {
        const Validation = {
            Username: false,
            Password: false,
            Error: {
                Username: document.getElementById("username-field-error-msg") || false,
                Password: document.getElementById("password-field-error-msg") || false
            }
        };

        const Username = document.getElementById("username-field");
        const Password = document.getElementById("password-field");
        const Submit = document.getElementById("submit-button");

        Validation.Username = (String(Username?.value).length >= 6) && true;
        Validation.Password = (String(Password?.value).length >= 8) && true;

        (Validation.Username) && Username.classList.toggle("cds--text-input--invalid", false);
        (Validation.Username) && Username.removeAttribute("data-invalid");
        (Validation.Username) && Username.removeAttribute("aria-invalid");
        (Validation.Username) && Username.removeAttribute("aria-describedby");
        (Validation.Username) && document.getElementById("username-field-error-msg")?.remove();

        (Validation.Username && Validation.Password) && Submit.removeAttribute("disabled");
        (Validation.Username && Validation.Password) && Submit.classList.toggle("cds--btn--disabled", false);

        const Message = document.getElementsByClassName("cds--form__requirements").item(0);

        Message && ((Validation.Username || Validation.Username === null) || (Validation.Password || Validation.Password === null)) && Message.remove();
    };

    const Awaitable = () => {
        return (
            <Form
                id={ "login-form" }
                className={ Styles.form }
                onSubmit={
                    (event) => {
                        setValidUsername(null);
                        setValidPassword(null);

                        /// Disable Ability to Modify Field(s) & Style Components
                        const Username = document.getElementById("username-field");
                        const Password = document.getElementById("password-field");
                        const Submit = document.getElementById("submit-button");

                        Username.toggleAttribute("readonly", true);
                        Password.toggleAttribute("readonly", true);
                        Submit.toggleAttribute("disabled", true);

                        Username.contentEditable = "false";
                        Password.contentEditable = "false";

                        const Handler = async () => {
                            setAwaiting(true);
                            const Response = await Authenticate(
                                {
                                    Username: Username?.value,
                                    Password: Password?.value
                                }, Cancellation()
                            );

                            console.debug("[Debug] Validating Authentication Attempt ...", Response);

                            if (Response.Status.Code === -1) {
                                console.warn("@Task: Implement Race-Condition Notification");
                                console.warn(Response);

                                return true;
                            } else if (Response.Status.Code === 200) {
                                console.log("@Task: Implement Successful Notification");

                                return true;
                            } else if (Response.Status.Code >= 300 && Response.Status.Code < 500) {
                                console.error("@Task: Implement Error Notification");
                                console.warn(Response);

                                return false;
                            } else if (Response.Status.Code >= 500) {
                                console.warn("@Task: Implement Internal Server Error Notification");
                                console.warn(Response);

                                return false;
                            } else {
                                console.error("@Task: !!! Handle Unknown Error");
                                console.error(Response);

                                return false;
                            }
                        };

                        Handler().then((Response) => {
                            console.debug("[Debug]", "Validation Outcome", Response);

                            try {
                                if (Response === true) {
                                    setAwaiting(false);
                                    Authorizer[1](true);
                                    // navigate(-1);

                                    navigate("...", { replace: true });
                                } else {
                                    const e = JSON.stringify(Response, null, 4);
                                    console.error("[Error]", JSON.stringify({ Response, Error: e }, null, 4));
                                    throw new Error(JSON.stringify({ Response, Error: e }, null, 4));
                                }
                            } catch (e) {
                                console.warn("[Warning]", "Caught Exception", e);
                                throw new Error(e);
                            }
                        }).catch((error) => {
                            console.warn("[Warning]", error);

                            Username.removeAttribute("readonly");
                            Password.removeAttribute("readonly");

                            Username.contentEditable = "true";
                            Password.contentEditable = "true";

                            Username.focus();
                            Username.click();

                            setValidUsername(false);
                            setValidPassword(false);

                            setAwaiting(false);

                            console.log("[Log]", "Form Submission Attempt Complete");
                        });
                    }
                }
            >
                <FormGroup
                    legendText={ "" }
                    className={ Styles.fields }
                >
                    <TextInput
                        id={ "username-field" }
                        className={ [ Styles.field, Styles.normalized ].join(" ") }
                        invalid={ validUsername === false }
                        inline={ false }
                        type={ Types.Input.text }
                        invalidText={ "Username must contain 6 or more characters" }
                        labelText={ "Account" }
                        autoComplete={ "false" }
                        hideLabel={ false }
                        onChange={ handleUsernameFieldChanges }
                    />
                    <TextInput
                        id={ "password-field" }
                        className={ Styles.field }
                        inline={ false }
                        invalid={ validPassword === false }
                        type={ Types.Input.password }
                        invalidText={
                            "Password must contain a minimum of 8 characters, "
                            + "at least one number, and include uppercase & lowercase"
                            + " letter(s)"
                        }
                        labelText={ "Password" }
                        autoComplete={ "false" }
                        hideLabel={ false }
                        onChange={ handlePasswordFieldChanges }
                    />
                </FormGroup>
                <Button
                    id={ "submit-button" }
                    className={ Styles.button }
                    kind={ "tertiary" }
                    tabIndex={ 0 }
                    disabled={ true }
                    type={ Types.Input.submit }
                    tooltipAlignment={ "center" }
                    tooltipPosition={ "right" }
                    name={ "submit" }
                    onClick={ () => {
                        setAwaiting(true);
                        console.debug("[Debug]", "Submit Button Event", "Submitting ...");
                        const Form = document.getElementById("login-form");

                        Form?.submit();
                    } }
                    children={
                        (awaiting === true) ? (
                            <InlineLoading description="Loading..."/>
                        ) : (
                            <>
                                Submit
                            </>
                        )
                    }
                />
            </Form>
        );
    };

    return (<Awaitable/>);
};

export default Component;