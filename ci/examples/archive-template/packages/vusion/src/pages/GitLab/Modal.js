import ReactDOM from "react-dom";

import React, { useState } from "react";

import { Theme, Button, ComposedModal } from "@carbon/react";
import { Launch, Settings, Credentials, User, UserAccess, CloudServiceManagement } from "@carbon/icons-react";

import { Variables } from "./Actions.js";

const Environment = ({id}) => {
    const [ open, setOpen ] = useState(false);

    return (
        <>
            {
                typeof document === "undefined"
                    ? null
                    : ReactDOM.createPortal(
                        <ComposedModal open={ open } onClose={ () => setOpen(false) }>
                            {
                                (open === true) ? (<Variables id={id} state={open}/>) : null
                            }
                        </ComposedModal>, document.body
                    )
            }
            {/*<Button hasIconOnly={ true } size="sm" type="button" kind={ "secondary" } onClick={ () => setOpen(true) } isExpressive={false} onMouseEnter={(event) => event.preventDefault()} onFocus={(event) => event.preventDefault()}>*/}
            <Theme theme={"white"}>
                <Button hasIconOnly={ true } size="sm" type="button" kind={ "secondary" } onClick={ () => setOpen(true) } children={(<CloudServiceManagement/>)} iconDescription={"Environment Variables"} tooltipAlignment="center" tooltipPosition="top"/>
            </Theme>
        </>
    );
}

const Modify = ({id}) => {
    const [ open, setOpen ] = useState(false);

    return (
        <>
            {
                typeof document === "undefined"
                    ? null
                    : ReactDOM.createPortal(
                        <ComposedModal open={ open } onClose={ () => setOpen(false) }>
                            {
                                (open === true) ? (<Variables id={id} state={open}/>) : null
                            }
                        </ComposedModal>, document.body
                    )
            }
            {/*<Button hasIconOnly={ true } size="sm" type="button" kind={ "secondary" } onClick={ () => setOpen(true) } isExpressive={false} onMouseEnter={(event) => event.preventDefault()} onFocus={(event) => event.preventDefault()}>*/}
            <Theme theme={"white"}>
                <Button hasIconOnly={ true } size="sm" type="button" kind={ "secondary" } onClick={ () => setOpen(true) } children={(<Settings/>)} iconDescription={"Edit Settings"} tooltipAlignment="center" tooltipPosition="top"/>
            </Theme>
        </>
    );
}

const Trigger = ({id}) => {
    const [ open, setOpen ] = useState(false);

    return (
        <>
            {
                typeof document === "undefined"
                    ? null
                    : ReactDOM.createPortal(
                        <ComposedModal open={ open } onClose={ () => setOpen(false) }>
                            {
                                (open === true) ? (<Variables id={id} state={open}/>) : null
                            }
                        </ComposedModal>, document.body
                    )
            }
            {/*<Button hasIconOnly={ true } size="sm" type="button" kind={ "secondary" } onClick={ () => setOpen(true) } isExpressive={false} onMouseEnter={(event) => event.preventDefault()} onFocus={(event) => event.preventDefault()}>*/}
            <Theme theme={"white"}>
                <Button hasIconOnly={ true } size="sm" type="button" kind={ "secondary" } onClick={ () => setOpen(true) } children={(<Launch/>)} iconDescription={"Manage"} tooltipAlignment="end" tooltipPosition="top"/>
            </Theme>
        </>
    );
}

export default {
    Environment, Modify, Trigger
}