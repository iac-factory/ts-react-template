import React, { forwardRef, HTMLAttributes } from "react";
import CX from "classnames";

export interface Properties extends HTMLAttributes<HTMLDivElement> {
    /**
     * A string of all className you want applied to the base component.
     */
    className?: string;
    /**
     * Set container 100% wide until small breakpoint.
     */
    sm?: boolean;
    /**
     * Set container 100% wide until medium breakpoint.
     */
    md?: boolean;
    /**
     * Set container 100% wide until large breakpoint.
     */
    lg?: boolean;
    /**
     * Set container 100% wide until X-large breakpoint.
     */
    xl?: boolean;
    /**
     * Set container 100% wide until XX-large breakpoint.
     */
    xxl?: boolean;
    /**
     * Set container 100% wide, spanning the entire width of the viewport.
     */
    fluid?: boolean;
}

const BREAKPOINTS = [
    "xxl" as const,
    "xl" as const,
    "lg" as const,
    "md" as const,
    "sm" as const,
    "fluid" as const
] as const;

export const CContainer = forwardRef<HTMLDivElement, Properties>(
    ({ children, className, ...rest }, ref) => {
        const repsonsiveClassNames: string[] = [];

        BREAKPOINTS.forEach((bp) => {
            const breakpoint = rest[bp];
            delete rest[bp];

            breakpoint && repsonsiveClassNames.push(`container-${bp}`);
        });

        const _className = CX(
            repsonsiveClassNames.length ? repsonsiveClassNames : "container",
            className,
        );

        return (
            <div className={_className} {...rest} ref={ref}>
                {children}
            </div>
        );
    },
);

CContainer.displayName = "CContainer";
