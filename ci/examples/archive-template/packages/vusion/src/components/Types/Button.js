//
//// const Defaults = {
//    /// as: button.propTypes.ref("as"),
//    /// children: button.props.children,
//    /// className: button.props.className,
//    /// dangerDescription: button.props.dangerDescription,
////     disabled: false,
////     hasIconOnly: false,
////     href: button.props.href,
////     iconDescription: button.props.iconDescription,
////     isExpressive: button.props.isExpressive,
////     isSelected: button.props.isSelected,
////     kind: button.props.kind,
////     onBlur: button.props.onBlur,
////     onClick: button.props.onClick,
////     onFocus: button.props.onFocus,
////     onMouseEnter: button.props.onMouseEnter,
////     onMouseLeave: button.props.onMouseLeave,
////     renderIcon: button.props.renderIcon,
////     role: button.props.role,
////     size: button.props.size,
////     tabIndex: button.props.tabIndex,
////     tooltipAlignment: button.props.tooltipAlignment,
////     tooltipPosition: button.props.tooltipPosition,
////     type: button.props.type,
////     keys: button.props.keys,
//// }
//
///***
// *
// * @param as
// * @param children
// * @param className
// * @param dangerDescription
// * @param disabled
// * @param hasIconOnly
// * @param href
// * @param iconDescription
// * @param isExpressive
// * @param isSelected
// * @param kind
// * @param onBlur
// * @param onClick
// * @param onFocus
// * @param onMouseEnter
// * @param onMouseLeave
// * @param renderIcon
// * @param role
// * @param size
// * @param tabIndex
// * @param tooltipAlignment
// * @param tooltipPosition
// * @param type
// *
// * @returns {JSX.Element}
// *
// * @constructor
// *
// */
//
//export const Button = (
//    {
//        as = button.props?.as,
//        children = button.props?.children,
//        className = button.props?.className,
//        dangerDescription = button.props?.dangerDescription,
//        disabled = button.props?.disabled,
//        hasIconOnly = button.props?.hasIconOnly,
//        href = button.props?.href,
//        iconDescription = button.props?.iconDescription,
//        isExpressive = button.props?.isExpressive,
//        isSelected = button.props?.isSelected,
//        kind = button.props?.kind,
//        onBlur = button.props?.onBlur,
//        onClick = button.props?.onClick,
//        onFocus = button.props?.onFocus,
//        onMouseEnter = button.props?.onMouseEnter,
//        onMouseLeave = button.props?.onMouseLeave,
//        renderIcon = button.props?.renderIcon,
//        role = button.props?.role,
//        size = button.props?.size,
//        tabIndex = button.props?.tabIndex,
//        tooltipAlignment = button.props?.tooltipAlignment,
//        tooltipPosition = button.props?.tooltipPosition,
//        type = button.props?.type,
//    }
//) => {
//
//    const Values = {
//        as,
//        children,
//        className,
//        dangerDescription,
//        disabled,
//        hasIconOnly,
//        href,
//        iconDescription,
//        isExpressive,
//        isSelected,
//        kind,
//        onBlur,
//        onClick,
//        onFocus,
//        onMouseEnter,
//        onMouseLeave,
//        renderIcon,
//        role,
//        size,
//        tabIndex,
//        tooltipAlignment,
//        tooltipPosition,
//        type
//    };
//
//    return (
//        <Button {... Values}/>
//    );
//}
//
//Button.propTypes = {
//    /**
//     * Specify how the button itself should be rendered.
//     * Make sure to apply all props to the root node and render children appropriately
//     */
//    as: PropTypes.oneOfType([PropTypes.func, PropTypes.string, PropTypes.elementType]),
//
//    /**
//     * Specify the content of your Button
//     */
//    children: PropTypes.node,
//
//    /**
//     * Specify an optional className to be added to your Button
//     */
//    className: PropTypes.string,
//
//    /**
//     * Specify the message read by screen readers for the danger button variant
//     */
//    dangerDescription: PropTypes.string,
//
//    /**
//     * Specify whether the Button should be disabled, or not
//     */
//    disabled: PropTypes.bool,
//
//    /**
//     * Specify if the button is an icon-only button
//     */
//    hasIconOnly: PropTypes.bool,
//
//    /**
//     * Optionally specify an href for your Button to become an `<a>` element
//     */
//    href: PropTypes.string,
//
//    /**
//     * If specifying the `renderIcon` prop, provide a description for that icon that can
//     * be read by screen readers
//     */
//    iconDescription: function iconDescription(props) {
//        if (props.renderIcon && !props.children && !props.iconDescription) {
//            return new Error("renderIcon property specified without also providing an iconDescription property.");
//        }
//
//        return undefined;
//    },
//
//    /**
//     * Specify whether the Button is expressive, or not
//     */
//    isExpressive: PropTypes.bool,
//
//    /**
//     * Specify whether the Button is currently selected
//     */
//    isSelected: PropTypes.bool,
//
//    /**
//     * Specify the kind of Button you want to create
//     */
//    kind: PropTypes.oneOf(ButtonKinds).isRequired,
//
//    /**
//     * Provide an optional function to be called when the button element
//     * loses focus
//     */
//    onBlur: PropTypes.func,
//
//    /**
//     * Provide an optional function to be called when the button element
//     * is clicked
//     */
//    onClick: PropTypes.func,
//
//    /**
//     * Provide an optional function to be called when the button element
//     * receives focus
//     */
//    onFocus: PropTypes.func,
//
//    /**
//     * Provide an optional function to be called when the mouse
//     * enters the button element
//     */
//    onMouseEnter: PropTypes.func,
//
//    /**
//     * Provide an optional function to be called when the mouse
//     * leaves the button element
//     */
//    onMouseLeave: PropTypes.func,
//
//    /**
//     * Optional prop to allow overriding the icon rendering.
//     * Can be a React component class
//     */
//    renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
//
//    /**
//     * Optional prop to specify the role of the Button
//     */
//    role: PropTypes.string,
//
//    /**
//     * Specify the size of the button, from a list of available sizes.
//     * For `default` buttons, this prop can remain unspecified or use `default`.
//     * In the next major release of Carbon, `default`, `field`, and `small` will be removed
//     */
//    size: PropTypes.oneOf(["default", "field", "small", "sm", "md", "lg", "xl", "2xl"]),
//
//    /**
//     * Optional prop to specify the tabIndex of the Button
//     */
//    tabIndex: PropTypes.number,
//
//    /**
//     * Specify the alignment of the tooltip to the icon-only button.
//     * Can be one of: start, center, or end.
//     */
//    tooltipAlignment: PropTypes.oneOf(["start", "center", "end"]),
//
//    /**
//     * Specify the direction of the tooltip for icon-only buttons.
//     * Can be either top, right, bottom, or left.
//     */
//    tooltipPosition: PropTypes.oneOf(["top", "right", "bottom", "left"]),
//
//    /**
//     * Optional prop to specify the type of the Button
//     */
//    type: PropTypes.oneOf(["button", "reset", "submit"]),
//
//    keys: () => Object.keys(Button.propTypes)
//};
//
//export const Types = {
//    Kind: {
//        primary: "primary",
//        secondary: "secondary",
//        ghost: "ghost",
//        tertiary: "tertiary",
//        danger: {
//            normal: "danger",
//            primary: "danger--primary",
//            ghost: "danger--ghost",
//            tertiary: "danger--tertiary"
//        }
//    },
//    Attributes: {
//        Types: Button.propTypes
//    }
//};
//
//export default Types;