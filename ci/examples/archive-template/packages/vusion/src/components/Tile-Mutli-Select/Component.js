import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import Styles from "./SCSS/Index.module.scss";

import {
    Button,
    Modal,
    Column,
    Row,
    SelectableTile,
    TextInput
} from "@carbon/react";

import { useState, useCallback } from "react";

/***
 *
 * @param props
 *
 * @returns {JSX.Element}
 *
 * @constructor
 *
 */

export const Selectable = ({ props }) => {
    const [ selected, setSelected ] = useState(false);

    return (
        <SelectableTile
            id={ props?.ID }
            name={ props?.Name }
            value={ props?.value }
            selected={ props?.selected }
            disabled={ props?.disabled }
            children={ props?.Children }

            onClick={ () => setSelected(!selected) }
        />
    );
};

Selectable.propTypes = {
    /***
     *
     */

    id: PropTypes.string,

    /***
     *
     */

    name: PropTypes.string,

    /***
     *
     */

    value: PropTypes.string,

    /***
     *
     */

    selected: PropTypes.string,

    /***
     *
     */

    onClick: PropTypes.func,

    /***
     *
     */

    disabled: PropTypes.bool,

    /***
     *
     */

    children: PropTypes.element
};

Selectable.defaultProps = {
    ID: "",
    Name: "Tiles"
};

/*****
 *
 * @param Children
 *
 * @returns {*}
 *
 * @constructor
 *
 */

export const Selectables = ({ Children = [ Properties() ] }) => {
    const Components = [];

    Children.forEach(
        (Component, Index) => {
            Components.push(Selectable(... Component));
        }
    );

    return Components;
};

/***
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */

const Component = (props) => {
    const {
        width
    } = props;

    /// useCallback(fn, deps)
    const Prefix = "tile";

    const A = useState({
        id: [ Prefix, "1" ].join("-"),
        name: [ Prefix, "selectable", "1" ].join("-"),
        selected: false,
        value: "",
        disabled: false,
        className: Styles.selectable
    });

    const B = useState({
        id: [ Prefix, "2" ].join("-"),
        name: [ Prefix, "selectable", "2" ].join("-"),
        selected: false,
        value: "",
        disabled: false,
        className: Styles.selectable
    });

    const C = useState({
        id: [ Prefix, "3" ].join("-"),
        name: [ Prefix, "selectable", "3" ].join("-"),
        selected: false,
        value: "",
        disabled: false,
        className: Styles.selectable
    });

    return (
        <div role="group" aria-label="selectable tiles" className={ (width) ? Styles.full : null }>
            <SelectableTile
                { ... A[0] }
                onClick={ () => A[1]({ ... A[0], ... A[0]["selected"] }) }
            >
                Option-1
            </SelectableTile>
            <SelectableTile
                { ... B[0] }
                onClick={ () => B[1]({ ... B[0], ... B[0]["selected"] }) }
            >
                Option-2
            </SelectableTile>
            <SelectableTile
                { ... C[0] }
                onClick={ () => C[1]({ ... C[0], ... C[0]["selected"] }) }
            >
                Option-3
            </SelectableTile>
        </div>
    );
};

export const Opener = ({ open, setOpen }) => {
    const ModalStateManager = ({
        renderLauncher: LauncherContent,
        children: ModalContent
    }) => {
        return (
            <>
                { !ModalContent || typeof document === "undefined"
                    ? null
                    : ReactDOM.createPortal(
                        <ModalContent open={ open } setOpen={ setOpen }/>,
                        document.body
                    ) }
                { LauncherContent && <LauncherContent open={ open } setOpen={ setOpen }/> }
            </>
        );
    };

    return (
        <ModalStateManager
            renderLauncher={ ({ setOpen }) => (
                <Button onClick={ () => setOpen(true) }>Launch modal</Button>
            ) }
        >
            { ({ open, setOpen }) => (
                <Modal
                    modalHeading="Add a custom domain"
                    modalLabel="Account resources"
                    primaryButtonText="Add"
                    secondaryButtonText="Cancel"
                    open={ open }
                    onRequestClose={ () => setOpen(false) }
                >
                    <p style={ { marginBottom: "1rem" } }>
                        Custom domains direct requests for your apps in this Cloud Foundry
                        organization to a URL that you own. A custom domain can be a shared
                        domain, a shared subdomain, or a shared domain and host.
                    </p>
                    <TextInput
                        data-modal-primary-focus
                        id="text-input-1"
                        labelText="Domain name"
                        placeholder="e.g. github.com"
                        style={ { marginBottom: "1rem" } }
                    />
                    <Component/>
                </Modal>
            ) }
        </ModalStateManager>
    );
};

Component.defaultProps = {
    width: "full"
};

Component.propTypes = {
    width: PropTypes.oneOf([ "full", "normal", null ])
};

export default Component;
