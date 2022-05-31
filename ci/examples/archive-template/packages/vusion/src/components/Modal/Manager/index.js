import "./SCSS/index.scss";

import PropTypes from "prop-types";

import React from "react";

import { Modal, ModalBody, ModalFooter, ModalHeader, ComposedModal } from "@carbon/react";

const Version = process.env.REACT_APP_VERSION;

export const Header = ({ State }) => {
    return (
        <ModalHeader
            buttonOnClick={ () => console.log("...") }
            closeClassName={ "close-button" }
            closeIconClassName={ "..." }
            closeModal={ () => State[1](false) }
            iconDescription={ "Description" }
            label={ "Label" }
            labelClassName={ "label-css-class-name" }
            title={ "Title" }
            titleClassName={ "title-css-class-name" }
        />
    );
};

Header.defaultProps = {};
Header.propTypes = {
    buttonOnClick: PropTypes.any,
    closeClassName: PropTypes.any,
    closeIconClassName: PropTypes.any,
    closeModal: PropTypes.any,
    iconDescription: PropTypes.any,
    label: PropTypes.any,
    labelClassName: PropTypes.any,
    title: PropTypes.any,
    titleClassName: PropTypes.any,

    State: PropTypes.any
};

export const Body = ({}) => {
    return (
        <ModalBody>
            <h3>
                Hello World
            </h3>

        </ModalBody>
    );
};

Body.defaultProps = {
    hasForm: false,
    hasScrollingContent: false
};

Body.propTypes = {
    hasForm: PropTypes.any,
    hasScrollingContent: PropTypes.any
};

export const Footer = ({ ... Properties }) => {
    return (
        <ModalFooter { ... Properties }>
            {
                /// Version
            }
        </ModalFooter>
    );
};

Footer.defaultProps = {
    // closeModal: () => console.debug("[Event]", "Close Modal (Footer)"),
    closeModal: null,
    // onRequestSubmit: () => console.debug("[Event]", "Modal Form Submission (Footer)"),
    onRequestSubmit: null,
    // onRequestClose: () => console.debug("[Event]", "Modal Form Request Closure (Footer)")
    onRequestClose: null
};

Footer.propTypes = {
    closeModal: PropTypes.func,
    danger: PropTypes.any,
    inputref: PropTypes.any,
    primaryClassName: PropTypes.any,
    primaryButtonText: PropTypes.any,
    primaryButtonDisabled: PropTypes.any,
    secondaryClassName: PropTypes.any,
    secondaryButtonText: PropTypes.any,
    secondaryButtons: PropTypes.any,
    onRequestClose: PropTypes.any,
    onRequestSubmit: PropTypes.any
};

const Component = ({ State, Content, buttonText }) => {
    //    const State = ({ renderLauncher: LauncherContent, children: Content }) => {
    //        const [ open, setOpen ] = useState(false);
    //        return (
    //            <>
    //                { !Content || typeof document === "undefined"
    //                    ? null
    //                    : ReactDOM.createPortal(
    //                        <Content open={ open } setOpen={ setOpen }/>, document.body
    //                    ) }
    //                { LauncherContent && <LauncherContent open={ open } setOpen={ setOpen }/> }
    //            </>
    //        );
    //    };

    return (
        //        <State
        //            renderLauncher={ ({ setOpen }) => (
        //                <Button onClick={ () => setOpen(true) }>
        //                    {
        //                        buttonText
        //                    }
        //                </Button>
        //            ) }>
        //            { ({ open, setOpen }) => (
        <Modal
            modalHeading={ (
                <Header State={ State }/>
            ) }
            modalLabel="Account resources"
            primaryButtonText="Add"
            secondaryButtonText="Cancel"
            passiveModal={ true }
            open={ State[0] }
            onRequestClose={ () => State[1](false) }
        >
            <Body/>
            <Footer/>
            {/*<p style={ { marginBottom: "1.0rem" } }>*/ }
            {/*    Custom domains direct requests for your apps in this Cloud Foundry*/ }
            {/*    organization to a URL that you own. A custom domain can be a shared*/ }
            {/*    domain, a shared subdomain, or a shared domain and host.*/ }
            {/*</p>*/ }
            {/*<TextInput*/ }
            {/*    data-modal-primary-focus*/ }
            {/*    id="text-input-1"*/ }
            {/*    labelText="Domain name"*/ }
            {/*    placeholder="e.g. github.com"*/ }
            {/*    style={ { marginBottom: "1rem" } }*/ }
            {/*/>*/ }
            {/*<Select id="select-1" defaultValue="us-south" labelText="Region">*/ }
            {/*    <SelectItem value="us-south" text="US South"/>*/ }
            {/*    <SelectItem value="us-east" text="US East"/>*/ }
            {/*</Select>*/ }
        </Modal>
        //            ) }
        //        </State>
    );
};

Component.defaultProps = {
    buttonText: "Launch Modal",
    onRequestClose: function onRequestClose() {},
    onRequestSubmit: function onRequestSubmit() {},
    primaryButtonDisabled: false,
    onKeyDown: function onKeyDown() {},
    passiveModal: false,
    modalHeading: "",
    modalLabel: "",
    preventCloseOnClickOutside: false,
    selectorPrimaryFocus: "[data-modal-primary-focus]",
    hasScrollingContent: false
};

Component.propTypes = {
    hasForm: PropTypes.any,
    hasScrollingContent: PropTypes.any,
    iconDescription: PropTypes.any,
    modalAriaLabel: PropTypes.any,
    modalHeading: PropTypes.any,
    modalLabel: PropTypes.any,
    open: PropTypes.any,
    onClick: PropTypes.any,
    buttonText: PropTypes.string,
    onRequestClose: PropTypes.any,
    onRequestSubmit: PropTypes.any,
    onSecondarySubmit: PropTypes.any,
    passiveModal: PropTypes.any,
    preventCloseOnClickOutside: PropTypes.any,
    primaryButtonDisabled: PropTypes.any,
    primaryButtonText: PropTypes.any,
    secondaryButtons: PropTypes.any,
    secondaryButtonText: PropTypes.any,
    selectorPrimaryFocus: PropTypes.any,
    selectorsFloatingMenus: PropTypes.any,
    size: PropTypes.any,
    shouldSubmitOnEnter: PropTypes.any
};

export default Component;