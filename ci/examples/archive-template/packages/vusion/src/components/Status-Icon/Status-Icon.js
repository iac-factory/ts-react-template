import { Checkmark } from "@carbon/icons-react";

import { oneOf, string } from "prop-types";
import React, { Component } from "react";

import Styles from "./SCSS/Index.module.scss";

import Icon from "../Icon";
import { Loading } from "@carbon/react";

const defaultSize = "md";
const SIZE = [ "lg", defaultSize, "sm" ];
const STATUS = [ "complete", "error", "info", "success", "unknown", "warning" ];

/**
 * Status icon component.
 */
class Status extends Component {
    static propTypes = {
        /** @type {string} Class name. */
        className: string,

        /** @type {string} icon aria label. */
        iconDescription: string,

        /** @type {string} Message. */
        message: string,

        /** @type {string} Size. */
        size: oneOf(SIZE),

        /** @type {string} Status. */
        status: oneOf(STATUS)
    };

    static defaultProps = {
        className: null,
        message: null,
        size: defaultSize,
        status: undefined,
        iconDescription: null
    };

    static getDerivedStateFromProps({ status }, state) {
        return status && state.status !== status
            ? {
                status
            }
            : null;
    }

    state = {
        status: this.props.status
    };

    render() {
        const { message, iconDescription } = this.props;
        const { status } = this.state;

        let statusIcon;

        switch (status) {
            case STATUS[0]:
                statusIcon = (
                    <Icon
                        aria-label={
                            iconDescription && iconDescription.length ? iconDescription : null
                        }
                        renderIcon={ Checkmark20 }
                    />
                );
                break;

            case undefined:
                statusIcon = (
                    <Loading
                        aria-label={
                            iconDescription && iconDescription.length ? iconDescription : null
                        }
                        withOverlay={ false }
                    />
                );
                break;

            default:
                statusIcon = (
                    <span
                        aria-label={
                            iconDescription && iconDescription.length ? iconDescription : null
                        }
                        className={ Styles.success }
                    />
                );
        }

        return (
            <div className={ Styles.icon }>
                { statusIcon }
                {
                    message && (
                        <span className={ Styles.message }>
                            {
                                message
                            }
                        </span>
                    )
                }
            </div>
        );
    }
}

export { SIZE, STATUS, Status };

export default Status;