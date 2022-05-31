import { func, number, object, oneOfType, string } from "prop-types";
import React, { cloneElement } from "react";

const sizeDefaultProp = 20;
const sizePropType = oneOfType([ number, string ]);

const renderIconDefaultProp = null;
const renderIconPropType = oneOfType([ func, object ]);

// TODO: `2.x` - Remove deprecated props `height` and `width`.

/**
 * Icon component.
 */
const Icon = ({
                  className,
                  height,
                  path,
                  renderIcon: RenderIcon,
                  size,
                  title,
                  viewBox,
                  width,
                  ... other
              }) => {
    const iconProps = {
        "aria-hidden": "true",
        focusable: false,
        preserveAspectRatio: "xMidYMid meet",
        style: {
            willChange: "transform"
        },
        ... other
    };

    const iconSize = size || height || width;

    if ( path ) {
        return (
            <svg { ... iconProps } height={ iconSize } width={ iconSize } viewBox={ viewBox }>
                { title && <title>{ title }</title> }
                <path d={ path }/>
            </svg>
        );
    }

    return RenderIcon ? cloneElement(<RenderIcon/>, iconProps) : RenderIcon;
};

Icon.defaultProps = {
    className: "",
    height: null,
    path: null,
    renderIcon: renderIconDefaultProp,
    size: sizeDefaultProp,
    title: undefined,
    viewBox: "0 0 32 32",
    width: null
};

Icon.propTypes = {
    /** @type {string} Extra classes to add. */
    className: string,

    /** @type {string} Path. */
    path: string,

    /** @type {Function|object} Icon to render. */
    renderIcon: renderIconPropType,

    /** @type {number|string} Size. */
    size: sizePropType,

    /** @type {string} Title. */
    title: string,

    /** @type {string} The SVG viewBox property. */
    viewBox: string
};

export default Icon;

export {
    renderIconDefaultProp,
    renderIconPropType,
    sizeDefaultProp,
    sizePropType
};
