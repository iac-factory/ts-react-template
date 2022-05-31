import PropTypes from "prop-types";

import React, { useState, useEffect } from "react";

import { CodeSnippet, CodeSnippetSkeleton } from "@carbon/react";

import { Inline } from "./../../../components/Notifications/Authentication/Informational.js";

import axios from "axios";

import "./SCSS/Snippet.scss";
import Styles from "./SCSS/Snippet.module.scss";

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

            } catch (error) {
                console.warn(error);
                setError({
                    column: error?.column,
                    line: error?.line,
                    message: error?.message,
                    stack: error?.stack
                });
            } finally {
                setLoading(false);
            }
        };

        fetchData().finally(() => {
            console.debug("[Debug] Loading Complete");
        });
    }, [ url ]);

    const Awaitable = () => (loading) && (<CodeSnippetSkeleton type={ "multi" }/>);

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
        <CodeSnippet
            type={ "multi" }
            className={ Styles.snippet }
            children={
                JSON.stringify(data, null, 4)
            }
            showMoreText={ "Expand" }
            showLessText={ "Collapse" }
            maxCollapsedNumberOfRows={ 15 }
            wrapText={ false }
        />
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

export const Requestable = ({ url, headers }) => {
    const [ data, setData ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const $ = await axios(url, { headers });

                setData($.data);
                setError(false);

            } catch (error) {
                console.warn(error);
                setError({
                    column: error?.column,
                    line: error?.line,
                    message: error?.message,
                    stack: error?.stack
                });
            } finally {
                setLoading(false);
            }
        };

        fetchData().finally(() => {
            console.debug("[Debug] Loading Complete");
        });
    }, [ url ]);

    const Awaitable = () => (loading) && (<CodeSnippetSkeleton type={ "multi" }/>);

    const Error = () => (error && !loading) && (
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
    );

    const Data = () => (data && !loading) && (
        <CodeSnippet
            type={ "multi" }
            className={ Styles.snippet }
            children={
                JSON.stringify(data, null, 4)
            }
            showMoreText={ "Expand" }
            showLessText={ "Collapse" } hideCopyButton={ true }
            maxCollapsedNumberOfRows={ 15 }
            wrapText={ false }
        />
    );

    return (
        <>
            { (<Error/>) }
            { (<Awaitable/>) }
            { (<Data/>) }
        </>
    );
};

Requestable.propTypes = {
    url: PropTypes.string
};
