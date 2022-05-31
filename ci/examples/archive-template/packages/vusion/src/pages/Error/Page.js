import axios from "axios";

import { Inline } from "./../../components/Notifications/Authentication/Informational.js";

import PropTypes from "prop-types";

import React, { useState, useEffect } from "react";

/***
 * @param duration {Number} Total Skeleton Simulated Loading Time (Seconds)
 * @return {JSX.Element}
 * @constructor
 */

export const Page = ({ duration }) => {
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

            finally { setLoading(false); }

        };

        fetchData().finally(() => {
            console.debug("[Debug] Loading Complete");
        });
    }, [ url ]);

    const Awaitable = () => (loading) && (<span>...</span>);

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
        <>
            Complete
        </>
    );

    return (
        <>
            { (<Error/>) }
            { (<Awaitable/>) }
            { (<Data/>) }
        </>
    );
};

Page.defaultProps = {
    duration: 3
};

Page.propTypes = {
    /*** @type {Number} Total Skeleton Simulated Loading Time (Seconds) */
    duration: PropTypes.number.isRequired
};

export default Page;