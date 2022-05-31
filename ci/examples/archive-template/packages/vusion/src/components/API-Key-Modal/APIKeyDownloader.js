import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { default as settings } from "./../../settings/Configuration.js";

const componentName = "APIKeyDownloader";

export const APIKeyDownloader = ({
                                     apiKey,
                                     body,
                                     fileName,
                                     fileType,
                                     linkText
                                 }) => {
    const [ linkProps, setLinkProps ] = useState({});

    useEffect(() => {
        const generateLinkProps = async () => {
            const data = fileType === "txt" ? apiKey : JSON.stringify({ apiKey });
            const blob = new Blob([ data ], {
                type: fileType === "txt" ? "text/plain" : "application/json"
            });
            const href = await URL.createObjectURL(blob);
            const download = `${ fileName || "apikey" }.${ fileType }`;
            const props = {
                href,
                download
            };
            setLinkProps(props);
        };

        generateLinkProps();
    }, [ apiKey, fileName, fileType ]);

    return (
        <div className={ `${ settings.prefix }-apikey-modal__download-container` }>
            <p className={ `${ settings.prefix }-apikey-modal__messaging-text` }>
                { body }{ " " }
                <a
                    { ... linkProps }
                    className={ `${ settings.prefix }-apikey-modal__download-link` }
                >
                    { linkText }
                </a>
            </p>
        </div>
    );
};

APIKeyDownloader.displayName = componentName;
APIKeyDownloader.propTypes = {
    /**
     * the api key that's displayed to the user when a request to create is fulfilled.
     */
    apiKey: PropTypes.string.isRequired,
    /**
     * body content for the downloader
     */
    body: PropTypes.string.isRequired,
    /**
     * designates the name of downloadable json file with the key. if not specified will default to 'apikey'
     */
    fileName: PropTypes.string.isRequired,
    /**
     * designates the file type for the downloadable key
     */
    fileType: PropTypes.oneOf([ "txt", "json" ]).isRequired,
    /**
     * anchor text for the download link
     */
    linkText: PropTypes.string.isRequired
};
