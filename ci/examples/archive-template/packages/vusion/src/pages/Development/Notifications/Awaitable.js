import { default as Types } from "prop-types";

import React, { useState, useEffect } from "react";

import { SkeletonPlaceholder } from "@carbon/react";

import * as Query from "./Query";

import {ToastNotification} from "carbon-components-react";

import io from "./Index.module.scss";

const Style = () => {
    return Object.values(io).pop();
};

const Component = ({ Evaluation }) => {
    const [awaiting, setAwaiting] = useState(true);

    const Handler = Query.State(setAwaiting);

    useEffect(() => {
        switch (awaiting) {
            case true:
                return () => setAwaiting(false);
            case false:
                return () => setAwaiting(true);
            default:
                return () => setAwaiting(null);
        }
    }, []);

    const Awaitable = () => {
        const Subtitle = () => (
            <span>Subtitle text goes here. <a href="#example">Example link</a></span>
        );

        return (
            <div className={Style()}>
                <ToastNotification
                    caption="00:00:00 AM"
                    iconDescription="Close Button Description"
                    statusIconDescription="Error"
                    subtitle={<span>Subtitle text goes here. <a href="#example">Example link</a></span>}
                    timeout={0}
                    title="Notification Title"
                    lowContrast={true}
                >
                    <p>
                        Content
                    </p>
                </ToastNotification>
            </div>
        );
    };

    return (Handler.Waiter && Handler.Waiter !== false || awaiting === true)
        ? (<SkeletonPlaceholder/>) : (<Awaitable/>);

};

Component.propTypes = {
    Evaluation: Types.any
};

export default Component;
