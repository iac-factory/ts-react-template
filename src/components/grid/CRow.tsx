import React, { forwardRef, HTMLAttributes } from "react";
import CX from "classnames";

export type BPObject = {
    cols?: "auto" | number | string | null;
    gutter?: number | string | null;
    gutterX?: number | string | null;
    gutterY?: number | string | null;
};

export interface Properties extends HTMLAttributes<HTMLDivElement> {
    /**
     * A string of all className you want applied to the base component.
     */
    className: string;
    /**
     * The number of columns/offset/order on extra small devices (<576px).
     *
     * @type {{ cols: "auto" | number | string } | { gutter: number | string } | { gutterX: number | string } | { gutterY: number | string }}
     */
    xs?: BPObject;
    /**
     * The number of columns/offset/order on small devices (<768px).
     *
     * @type {{ cols: "auto" | number | string } | { gutter: number | string } | { gutterX: number | string } | { gutterY: number | string }}
     */
    sm?: BPObject;
    /**
     * The number of columns/offset/order on medium devices (<992px).
     *
     * @type {{ cols: "auto" | number | string } | { gutter: number | string } | { gutterX: number | string } | { gutterY: number | string }}
     */
    md?: BPObject;
    /**
     * The number of columns/offset/order on large devices (<1200px).
     *
     * @type {{ cols: "auto" | number | string } | { gutter: number | string } | { gutterX: number | string } | { gutterY: number | string }}
     */
    lg?: BPObject;
    /**
     * The number of columns/offset/order on X-Large devices (<1400px).
     *
     * @type {{ cols: "auto" | number | string } | { gutter: number | string } | { gutterX: number | string } | { gutterY: number | string }}
     */
    xl?: BPObject;
    /**
     * The number of columns/offset/order on XX-Large devices (≥1400px).
     *
     * @type {{ cols: "auto" | number | string } | { gutter: number | string } | { gutterX: number | string } | { gutterY: number | string }}
     */
    xxl?: BPObject;
}

const BREAKPOINTS = [
    "xxl" as const,
    "xl" as const,
    "lg" as const,
    "md" as const,
    "sm" as const,
    "xs" as const
] as const;

export const CRow = forwardRef<HTMLDivElement, Properties>(
    ( { children, className, ...rest }, ref ) => {
        const responsiveClassNames: string[] = [];

        BREAKPOINTS.forEach( ( bp ) => {
            const breakpoint = rest[ bp ];
            delete rest[ bp ];

            const infix = bp === "xs" ? "" : `-${ bp }`;

            if ( typeof breakpoint === "object" ) {
                if ( breakpoint.cols ) {
                    responsiveClassNames.push( `row-cols${ infix }-${ breakpoint.cols }` );
                }
                if ( typeof breakpoint.gutter === "number" ) {
                    responsiveClassNames.push( `g${ infix }-${ breakpoint.gutter }` );
                }
                if ( typeof breakpoint.gutterX === "number" ) {
                    responsiveClassNames.push( `gx${ infix }-${ breakpoint.gutterX }` );
                }
                if ( typeof breakpoint.gutterY === "number" ) {
                    responsiveClassNames.push( `gy${ infix }-${ breakpoint.gutterY }` );
                }
            }
        } );

        const cx = CX( "row", responsiveClassNames, className );

        return (
            <div className={ cx } ref={ ref }>
                { children }
            </div>
        );
    },
);

CRow.displayName = "CRow";
