import "./SCSS/Modal.scss";

import { useEffect } from "react";

import { createPortal } from "react-dom";

import cx from "classnames";

const Component = ({ID = "modal-portal-id", State}) => {
    useEffect(() => {
        (State[0] === true) && setImmediate(() => {
            document.getElementById(ID).classList.toggle("modal-active", true);
        }, 1000);
    }, [State[0]]);

    const Classification = cx("modal", {
        "modal-inactive": !(State[0] === true)
    });

    return createPortal(
        (
            <div id={ ID } className={Classification}>
                <div className={"modal-content"}>
                    Hello
                </div>
            </div>
        ), document.body
    );
};

export default Component