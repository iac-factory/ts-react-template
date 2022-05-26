import React, { forwardRef } from "react";

import CX from "classnames";

import type CSS from "csstype";

type Reference = React.ForwardRefExoticComponent<HTMLDivElement> | React.ForwardedRef<HTMLDivElement>;

type Span = "auto" | number | string | boolean | null;

type BPObject = {
    span?: Span;
    offset?: number | string | null;
    order?: "first" | "last" | number | string | null;
}

type Col = Span | BPObject

export interface Properties extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * A string of all className you want applied to the base component.
     */
    className?: string;
    /**
     * The number of columns/offset/order on extra small devices (<576px).
     *
     * @type { "auto" | number | string | boolean | { span: "auto" | number | string | boolean } | { offset: number | string } | { order: "first" | "last" | number | string }}
     */
    xs?: Col;
    /**
     * The number of columns/offset/order on small devices (<768px).
     *
     * @type { "auto" | number | string | boolean | { span: "auto" | number | string | boolean } | { offset: number | string } | { order: "first" | "last" | number | string }}
     */
    sm?: Col;
    /**
     * The number of columns/offset/order on medium devices (<992px).
     *
     * @type { "auto" | number | string | boolean | { span: "auto" | number | string | boolean } | { offset: number | string } | { order: "first" | "last" | number | string }}
     */
    md?: Col;
    /**
     * The number of columns/offset/order on large devices (<1200px).
     *
     * @type { "auto" | number | string | boolean | { span: "auto" | number | string | boolean } | { offset: number | string } | { order: "first" | "last" | number | string }}
     */
    lg?: Col;
    /**
     * The number of columns/offset/order on X-Large devices (<1400px).
     *
     * @type { "auto" | number | string | boolean | { span: "auto" | number | string | boolean } | { offset: number | string } | { order: "first" | "last" | number | string }}
     */
    xl?: Col;
    /**
     * The number of columns/offset/order on XX-Large devices (≥1400px).
     *
     * @type { "auto" | number | string | boolean | { span: "auto" | number | string | boolean } | { offset: number | string } | { order: "first" | "last" | number | string }}
     */
    xxl?: Col;
}

const BREAKPOINTS = [
    "xxl" as const,
    "xl" as const,
    "lg" as const,
    "md" as const,
    "sm" as const,
    "xs" as const
] as const;

export const CCol = forwardRef<HTMLDivElement, Properties>( ( { children, className, ...rest }, reference: Reference ) => {
        const responseClassNames: string[] = [];

        BREAKPOINTS.forEach( ( bp ) => {
            const breakpoint = rest[ bp ];
            delete rest[ bp ];

            const infix = bp === "xs" ? "" : `-${ bp }`;

            if ( typeof breakpoint === "number" || typeof breakpoint === "string" ) {
                responseClassNames.push( `col${ infix }-${ breakpoint }` );
            }

            if ( typeof breakpoint === "boolean" ) {
                responseClassNames.push( `col${ infix }` );
            }

            if ( breakpoint && typeof breakpoint === "object" ) {
                if ( typeof breakpoint.span === "number" || typeof breakpoint.span === "string" ) {
                    responseClassNames.push( `col${ infix }-${ breakpoint.span }` );
                }

                if ( typeof breakpoint.span === "boolean" ) {
                    responseClassNames.push( `col${ infix }` );
                }

                if ( typeof breakpoint.order === "number" || typeof breakpoint.order === "string" ) {
                    responseClassNames.push( `order${ infix }-${ breakpoint.order }` );
                }

                if ( typeof breakpoint.offset === "number" ) {
                    responseClassNames.push( `offset${ infix }-${ breakpoint.offset }` );
                }
            }
        } );

        const _className = CX(
            responseClassNames.length ? responseClassNames : "col",
            className
        );

        return (
            <div className={ _className } ref={ reference } { ...rest }>
                { children }
            </div>
        );
    }
);

CCol.displayName = "CCol";

