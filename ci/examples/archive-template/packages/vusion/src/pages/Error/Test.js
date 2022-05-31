/**
 * @file Error view component.
 * @copyright IBM Security 2019, 2021
 */

import classnames from "classnames";

import PropTypes from "prop-types";
import React from "react";

import { Link } from "./../../components/Link";

const namespace = "cds";

const backgroundImage = "/Images/entitlement@2x.png";

const labels = {
    // DataDecorator
    /** @type {string} the primary button label for the DataDecorator's PanelContainer */
    DATA_DECORATOR_PRIMARY_BUTTON: "",
    /** @type {string} the secondary button label for the DataDecorator's PanelContainer */
    DATA_DECORATOR_SECONDARY_BUTTON: "",
    /** @type {string} the close button aria label for the DataDecorator's PanelContainer */
    DATA_DECORATOR_CLOSE_BUTTON: "Close",

    // FilterPanel
    /** @type {string} Label for truncated filters list to expand */
    FILTER_PANEL_CATEGORY_EXPAND_LABEL: "",
    /** @type {string} Label for expanded filters list to collapse */
    FILTER_PANEL_CATEGORY_COLLAPSE_LABEL: "",
    /** @type {string} Label for filter search input */
    FILTER_PANEL_SEARCH_LABEL: "",
    /** @type {string} Label for filter search when no filters are found */
    FILTER_PANEL_SEARCH_NO_RESULTS_LABEL: "",
    /** @type {string} The default aria label for the Search input clear button */
    FILTER_PANEL_SEARCH_CLOSE_BUTTON: "Clear search",

    // Panel
    /** @type {string} The PanelContainer's primary button label */
    PANEL_CONTAINER_PRIMARY_BUTTON: "",
    /** @type {string} The PanelContainer's secondary button label */
    PANEL_CONTAINER_SECONDARY_BUTTON: "",
    /** @type {string} The PanelContainer's close button aria label */
    PANEL_CONTAINER_CLOSE_BUTTON: "Close",

    // Search
    /** @type {string} aria label for the Search activate btn and input */
    SEARCH_LABEL: "",
    /** @type {string} Placeholder text to be displayed in the search input. */
    SEARCH_PLACEHOLDER_LABEL: "",
    /** @type {string} An aria label for the search input clear button. */
    SEARCH_CLOSE_BUTTON: "Clear search",

    // `Tag`
    /** @type {string} Label for the button used to remove the tag. */
    TAG_REMOVE_BUTTON: "Remove",

    // `TagWall`
    /** @type {string} Label. */
    TAG_WALL_LABEL: "",

    /** @type {string} Tag wall 'add' button. */
    TAG_WALL_ADD_BUTTON: "",

    /** @type {string} Tag 'remove' button. */
    TAG_WALL_REMOVE_BUTTON: "",

    // Tearsheet
    /** @type {string} label for the tearsheet primary button */
    TEARSHEET_PRIMARY_BUTTON: "Okay",
    /** @type {string} label for the tearsheet secondary button */
    TEARSHEET_SECONDARY_BUTTON: "Cancel",
    /** @type {string} label for the tearsheet delete button */
    TEARSHEET_DELETE_BUTTON: "Delete",
    /** @type {string} aria label for the tearsheet close button */
    TEARSHEET_CLOSE_BUTTON: "Close",
    /** @type {string} Text for the tearsheet cancel setup button */
    TEARSHEET_TERTIARY_BUTTON: "Cancel setup",
    /** @type {string} Secondary text for the tearsheet cancel setup button */
    TEARSHEET_TERTIARY_SECONDARY_TEXT: "Information will not be saved upon exit",

    // TearsheetSmall
    /** @type {string} label for the tearsheet primary button */
    TEARSHEET_SMALL_PRIMARY_BUTTON: "Save",
    /** @type {string} label for the tearsheet secondary button */
    TEARSHEET_SMALL_SECONDARY_BUTTON: "Cancel",
    /** @type {string} aria label for the tearsheet close button */
    TEARSHEET_SMALL_CLOSE_BUTTON: "Close",

    // Wizard.
    /** @type {string} The finish button label for the Wizard component's Tearsheet */
    WIZARD_FINISH_BUTTON: "Finish",
    /** @type {string} The next button label for the Wizard component's Tearsheet */
    WIZARD_NEXT_BUTTON: "Next",
    /** @type {string} The cancel button label for the Wizard component's Tearsheet */
    WIZARD_CANCEL_BUTTON: "Cancel",
    /** @type {string} The back button label for the Wizard component's Tearsheet */
    WIZARD_BACK_BUTTON: "Back",
    /** @type {string} The cancel setup button for the Wizard component's Tearsheet */
    WIZARD_TERTIARY_BUTTON: "Cancel",
    /** @type {string} Secondary text for the Wizard component Tearsheet cancel setup button */
    WIZARD_TERTIARY_SECONDARY_TEXT: "Information will not be saved upon exit",
    /** @type {string} The delete button label for the Wizard component's Tearsheet */
    WIZARD_TEARSHEET_DELETE_BUTTON: "Delete connection",

    // ErrorPage
    /** @type {object} List of Error objects */
    ERRORS: {
        404: {
            TITLE: "404",
            ERRORNAME: "Page not found",
            ERRORMESSAGE:
                "We could not find the page you were looking for, but here are some helpful places to start from:"
        },
        403: {
            TITLE: "403",
            ERRORNAME: "Access denied",
            ERRORMESSAGE:
                "You do not have the correct subscription to access this content. Please contact your administrator."
        },
        500: {
            TITLE: "500",
            ERRORNAME: "Internal server error",
            ERRORMESSAGE:
                "An internal server error occurred when trying to access this content."
        },
        default: {
            TITLE: "UnknownError"
        }
    }
};

export const forbidden = {
    backgroundImage,
    backgroundSize: "574px 300px",
    backgroundPosition: "701px 233px",
    minHeight: "701px"
};

const errorIllustrations = {
    403: {
        ... forbidden,
        backgroundImage: `url("/Images/entitlement@2x.png") })`
    },
    default: {
        backgroundImage: `url("/Images/entitlement@2x.png") })`,
        backgroundSize: "275px 322px",
        backgroundPosition: "814px 222px",
        minHeight: "814px"
    }
};

/**
 * Error view component.
 */
const ErrorPage = ({
                       backgroundImage,
                       className,
                       title,
                       statusCode,
                       errorName,
                       errorMessage,
                       links,
                       ... other
                   }) => {
    const classes = classnames(className, namespace);

    const errorLabels = labels.ERRORS[statusCode];
    if ( !title ) {
        title = errorLabels ? errorLabels.TITLE : labels.ERRORS.default.TITLE;
    }
    errorName = !errorName && errorLabels ? errorLabels.ERRORNAME : errorName;
    errorMessage =
        !errorMessage && errorLabels ? errorLabels.ERRORMESSAGE : errorMessage;

    let formattedBackgroundImage;

    if ( !backgroundImage ) {
        formattedBackgroundImage = errorIllustrations[statusCode]
            ? { ... errorIllustrations[statusCode] }
            : { ... errorIllustrations.default };
    } else {
        formattedBackgroundImage = { backgroundImage };
    }

    return (
        <section className={ classes } style={ formattedBackgroundImage } { ... other }>
            <div className={ `${ namespace }__content-wrapper` }>
                <div className={ `${ namespace }__content` }>
                    <h2 className={ `${ namespace }__title` }>{ title }</h2>
                    <h3 className={ `${ namespace }__sub-title` }>{ errorName }</h3>
                    { errorMessage && (
                        <p className={ `${ namespace }__description` }>{ errorMessage }</p>
                    ) }
                    { links.length > 0 &&
                    links.map(({ external = false, id, text, href, icon }) => (
                        <Link
                            id={ id }
                            key={ id }
                            href={ href }
                            target={ external ? "_blank" : "_parent" }
                            rel="noopener noreferrer"
                            className={ `${ namespace }__link` }
                        >
                            { icon !== undefined && (
                                <img
                                    alt={ text }
                                    className={ `${ namespace }__link__icon` }
                                    src={ icon }
                                />
                            ) }
                            { text }
                        </Link>
                    )) }
                </div>
            </div>
        </section>
    );
};

const link = {
    /** @type {node} Provide the identifier for the <a> node */
    id: PropTypes.string.isRequired,

    /** @type {node} Provide the text for the Link. */
    text: PropTypes.string.isRequired,

    /** @type {string} Provide the `href` attribute for the <a> node */
    href: PropTypes.string.isRequired,

    /** @type {string} Provide the `src` attribute for an icon */
    icon: PropTypes.string
};

export default ErrorPage;