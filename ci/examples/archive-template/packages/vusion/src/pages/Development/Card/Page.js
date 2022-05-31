import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { default as Icon } from "./../../../components/Status-Icon";
import { Card, Placeholder as Skeleton } from "./../../../components/Card";

import { Inline } from "./../../../components/Notifications/Informational.js";

import axios from "axios";

import Styles from "./SCSS/Index.module.scss";

const Status = () => {
    return (<Icon message={ "Online" } status={ "success" } iconDescription="200" size={ "sm" }/>);
};

/***
 * @param duration {Number} Total Skeleton Simulated Loading Time (Seconds)
 * @return {JSX.Element}
 * @constructor
 */

const Component = ({ duration }) => {
    const url = process.env.REACT_APP_API_ENDPOINT + [ "/v1/utility/awaitable?duration", duration ].join("=");

    const [ data, setData ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const $ = await axios(url);

                setData($);

                setError(false);
            } catch ( error ) {
                console.warn(error);
                setError({
                    column: error?.column,
                    line: error?.line,
                    message: error?.message,
                    stack: error?.stack
                });
            }
            finally {
                setLoading(false);
            }
        };

        fetchData().finally(() => {
            console.debug("[Debug] Loading Complete");
        });
    }, [ url ]);

    const Awaitable = () => (loading) && (<Skeleton/>);

    const Error = () => (error && !loading) && (
        <div style={ { marginBottom: "1.0rem" } }>
            <Inline
                kind={ "error" }
                lowContrast={ true }
                role={ "alert" }
                statusIconDescription={ "Status-Icon" }
                iconDescription={ "Close Error Message" }
                title={ "Error" }
                subtitle={ error?.message }
                hideCloseButton={ true }
            />
        </div>
    );

    const Data = () => (data && !loading) && (
        <Card body={ { children: null, text: "Description" } } footer={ { children: (<Status/>) } } header={ {
            tag: "Subtitle",
            image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+ICA8cGF0aCBmaWxsPSIjZmZmIiBkPSJNMTYgMThINmEyIDIgMCAwIDEtMi0yVjZhMiAyIDAgMCAxIDItMmgxMGEyIDIgMCAwIDEgMiAydjEwYTIgMiAwIDAgMS0yIDJ6TTYgNnYxMGgxMFY2em0yMCA2djRoLTR2LTRoNG0wLTJoLTRhMiAyIDAgMCAwLTIgMnY0YTIgMiAwIDAgMCAyIDJoNGEyIDIgMCAwIDAgMi0ydi00YTIgMiAwIDAgMC0yLTJ6bTAgMTJ2NGgtNHYtNGg0bTAtMmgtNGEyIDIgMCAwIDAtMiAydjRhMiAyIDAgMCAwIDIgMmg0YTIgMiAwIDAgMCAyLTJ2LTRhMiAyIDAgMCAwLTItMnptLTEwIDJ2NGgtNHYtNGg0bTAtMmgtNGEyIDIgMCAwIDAtMiAydjRhMiAyIDAgMCAwIDIgMmg0YTIgMiAwIDAgMCAyLTJ2LTRhMiAyIDAgMCAwLTItMnoiLz48L3N2Zz4=",
            title: "Title"
        } } label="Label-Text" link={ null } className={ Styles.component }/>
    );

    return (
        <>
            { (<Error/>) }
            { (<Awaitable/>) }
            { (<Data/>) }
        </>
    );
};

Component.defaultProps = {
    duration: 3
};

Component.propTypes = {
    /*** @type {Number} Total Skeleton Simulated Loading Time (Seconds) */
    duration: PropTypes.number.isRequired
};

export default Component;