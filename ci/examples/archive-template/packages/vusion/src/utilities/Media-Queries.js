import {
    breakpoints as Breakpoints,
    breakpoint
} from "@carbon/elements";

/**
 * Returns an object containing various media-queries for Carbon breakpoints
 *
 * sm: "@media (min-width: 20rem)"
 *
 * md: "@media (min-width: 42rem)"
 *
 * lg: "@media (min-width: 66rem)"
 *
 * xlg: "@media (min-width: 82rem)"
 *
 * max: "@media (min-width: 99rem)"
 */

const Utility = Object.keys(Breakpoints).reduce((Object, point) => {
    Object[point] = breakpoint(point);
    return Object;
}, {});

export default Utility;
