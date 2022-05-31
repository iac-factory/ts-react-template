import PropTypes from "prop-types";

import { InlineNotification, ToastNotification, ActionableNotification } from "@carbon/react";

import { default as Difference } from "./../../../utilities/Difference.js";

const Delimiter = () => (
    <>
        {
            " "
        }
    </>
);

export const Inline = (props) => {
    const {
        kind,
        lowContrast,
        role,
        title,
        subtitle,
        iconDescription,
        statusIconDescription,
        hideCloseButton,
        closeOnEscape,
        onClose,
        onCloseButtonClick,
        children,
        ... properties
    } = props;

    console.debug("Properties (Inline-Notification)", Difference(props, properties));

    console.debug("Attributes (Inline-Notification)", properties);

    return (
        <InlineNotification
            kind={ kind }
            lowContrast={ lowContrast }
            role={ role }
            title={ title }
            subtitle={ subtitle }
            iconDescription={ iconDescription }
            statusIconDescription={ statusIconDescription }
            hideCloseButton={ hideCloseButton }
            closeOnEscape={ closeOnEscape }
            children={ children }
            onClose={ onClose }

            {
                ... properties
            }

            /// data-properties={
            ///     String(JSON.stringify({
            ///         Properties: JSON.stringify(Difference(props, properties), null, 4),
            ///         Attributes: JSON.stringify(properties, null, 4)
            ///     }, null, 4).valueOf())
            /// }
        >
            <span>
                <strong>
                    { title }
                </strong>
                {
                    " - "
                }
                <Delimiter/>
                { subtitle }
            </span>
            <br/>
        </InlineNotification>
    );
};

Inline.defaultProps = {
    kind: "info",
    lowContrast: true,
    role: "alert",
    title: "[Title Title]",
    subtitle: "[Subtitle Content]",
    iconDescription: "[Icon Descriptive Content]",
    statusIconDescription: "[Status Icon Descriptive Content]",
    hideCloseButton: false,
    closeOnEscape: true,
    children: null,
    properties: null
};

Inline.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.oneOfType([ PropTypes.string, PropTypes.node ]),

    /**
     * Specify the content
     */
    children: PropTypes.node,

    /**
     * Specify an optional className to be applied to the notification box
     */
    className: PropTypes.string,

    /**
     * Specify if pressing the escape key should close notifications
     */
    closeOnEscape: PropTypes.bool,

    /**
     * Specify the close button should be disabled, or not
     */
    hideCloseButton: PropTypes.bool,

    /**
     * Provide a description for "close" icon that can be read by screen readers
     */
    iconDescription: PropTypes.string,

    /**
     * Specify what state the notification represents
     */
    kind: PropTypes.oneOf([ "error", "info", "info-square", "success", "warning", "warning-alt" ]),

    /**
     * Specify whether you are using the low contrast variant of the ToastNotification.
     */
    lowContrast: PropTypes.bool,

    /**
     * Provide a function that is called when menu is closed
     */
    onClose: PropTypes.func,

    /**
     * Provide a function that is called when the close button is clicked
     */
    onCloseButtonClick: PropTypes.func,

    /**
     * By default, this value is "alert". You can also provide an alternate
     * role if it makes sense from the accessibility-side
     */
    role: PropTypes.oneOf([ "alert", "log", "status" ]),

    /**
     * Provide a description for "status" icon that can be read by screen readers
     */
    statusIconDescription: PropTypes.string,

    /**
     * Additional Properties
     */
    properties: PropTypes.any
};

export const Toast = (props) => {
    const {
        kind,
        lowContrast,
        role,
        title,
        subtitle,
        iconDescription,
        statusIconDescription,
        hideCloseButton,
        closeOnEscape,
        timeout,

        ... properties
    } = props;

    console.debug("Properties (Toast-Notification)", Difference(props, properties));

    console.debug("Attributes (Toast-Notification)", properties);

    return (
        <ToastNotification
            kind={ kind }
            lowContrast={ lowContrast }
            role={ role }
            title={ title }
            subtitle={ subtitle }
            iconDescription={ iconDescription }
            statusIconDescription={ statusIconDescription }
            hideCloseButton={ hideCloseButton }
            closeOnEscape={ closeOnEscape }
            timeout={ timeout }

            {
                ... properties
            }

            data-properties={
                String(JSON.stringify({
                    Properties: JSON.stringify(Difference(props, properties), null, 4),
                    Attributes: JSON.stringify(properties, null, 4)
                }, null, 4).valueOf())
            }
        >
            <strong>
                { title }
            </strong>
            <Delimiter/>
            { subtitle }
        </ToastNotification>
    );
};

Toast.propTypes = {
    /**
     * Specify the content
     */
    children: PropTypes.node,

    /**
     * Specify an optional className to be applied to the notification box
     */
    className: PropTypes.string,

    /**
     * Specify if pressing the escape key should close notifications
     */
    closeOnEscape: PropTypes.bool,

    /**
     * Specify the close button should be disabled, or not
     */
    hideCloseButton: PropTypes.bool,

    /**
     * Provide a description for "close" icon that can be read by screen readers
     */
    iconDescription: PropTypes.string,

    /**
     * Specify what state the notification represents
     */
    kind: PropTypes.oneOf([ "error", "info", "info-square", "success", "warning", "warning-alt" ]),

    /**
     * Specify whether you are using the low contrast variant of the ToastNotification.
     */
    lowContrast: PropTypes.bool,

    /**
     * Provide a function that is called when menu is closed
     */
    onClose: PropTypes.func,

    /**
     * Provide a function that is called when the close button is clicked
     */
    onCloseButtonClick: PropTypes.func,

    /**
     * By default, this value is "alert". You can also provide an alternate
     * role if it makes sense from the accessibility-side
     */
    role: PropTypes.oneOf([ "alert", "log", "status" ]),

    /**
     * Provide a description for "status" icon that can be read by screen readers
     */
    statusIconDescription: PropTypes.string,

    /**
     * Specify an optional duration the notification should be closed in
     */
    timeout: PropTypes.number,

    /**
     * Additional Properties
     */
    properties: PropTypes.any
};

Toast.defaultProps = {
    kind: "info",
    lowContrast: true,
    role: "alert",
    title: "[Title Title]",
    subtitle: "[Subtitle Content]",
    iconDescription: "[Icon Descriptive Content]",
    statusIconDescription: "[Status Icon Descriptive Content]",
    hideCloseButton: false,
    closeOnEscape: true,
    timeout: 1000,
    properties: null
};

export const Actionable = (props) => {
    const {
        kind,
        lowContrast,
        role,
        title,
        subtitle,
        iconDescription,
        statusIconDescription,
        hideCloseButton,
        closeOnEscape,
        inline,
        hasFocus,
        actionButtonLabel,
        onActionButtonClick,
        ... properties
    } = props;

    console.debug("Properties (Actionable-Notification)", Difference(props, properties));

    console.debug("Attributes (Actionable-Notification)", properties);

    return (
        <ActionableNotification
            kind={ kind }
            lowContrast={ lowContrast }
            role={ role }
            title={ title }
            subtitle={ subtitle }
            iconDescription={ iconDescription }
            statusIconDescription={ statusIconDescription }
            hideCloseButton={ hideCloseButton }
            closeOnEscape={ closeOnEscape }
            inline={ inline }
            hasFocus={ hasFocus }
            actionButtonLabel={ actionButtonLabel }
            onActionButtonClick={ onActionButtonClick }

            {
                ... properties
            }

            data-properties={
                String(JSON.stringify({
                    Properties: JSON.stringify(Difference(props, properties), null, 4),
                    Attributes: JSON.stringify(properties, null, 4)
                }, null, 4).valueOf())
            }
        >
            <strong>
                { title }
            </strong>
            <Delimiter/>
            { subtitle }
        </ActionableNotification>
    );
};

Actionable.propTypes = {
    /**
     * Pass in the action button label that will be rendered within the ActionableNotification.
     */
    actionButtonLabel: PropTypes.string,

    /**
     * Specify the content
     */
    children: PropTypes.node,

    /**
     * Specify an optional className to be applied to the notification box
     */
    className: PropTypes.string,

    /**
     * Specify if pressing the escape key should close notifications
     */
    closeOnEscape: PropTypes.bool,

    /**
     * Specify if focus should be moved to the component when the notification contains actions
     */
    hasFocus: PropTypes.bool,

    /**
     * Specify the close button should be disabled, or not
     */
    hideCloseButton: PropTypes.bool,

    /**
     * Provide a description for "close" icon that can be read by screen readers
     */
    iconDescription: PropTypes.string,

    /*
     * Specify if the notification should have inline styling applied instead of toast
     */
    inline: PropTypes.bool,

    /**
     * Specify what state the notification represents
     */
    kind: PropTypes.oneOf([ "error", "info", "info-square", "success", "warning", "warning-alt" ]),

    /**
     * Specify whether you are using the low contrast variant of the ActionableNotification.
     */
    lowContrast: PropTypes.bool,

    /**
     * Provide a function that is called when the action is clicked
     */
    onActionButtonClick: PropTypes.func,

    /**
     * Provide a function that is called when menu is closed
     */
    onClose: PropTypes.func,

    /**
     * Provide a function that is called when the close button is clicked
     */
    onCloseButtonClick: PropTypes.func,

    /**
     * By default, this value is "alertdialog". You can also provide an alternate
     * role if it makes sense from the accessibility-side.
     */
    role: PropTypes.string,

    /**
     * Provide a description for "status" icon that can be read by screen readers
     */
    statusIconDescription: PropTypes.string,

    /**
     * Additional Properties
     */
    properties: PropTypes.any
};

Actionable.defaultProps = {
    kind: "info",
    lowContrast: true,
    role: "alert",
    title: "[Title Title]",
    subtitle: "[Subtitle Content]",
    iconDescription: "[Icon Descriptive Content]",
    statusIconDescription: "[Status Icon Descriptive Content]",
    hideCloseButton: false,
    closeOnEscape: true,
    inline: true,
    hasFocus: true,
    actionButtonLabel: "[Button-Label]",
    onActionButtonClick: (event) => console.trace("[Trace]", "Actionable Button Click Event", event)
};
