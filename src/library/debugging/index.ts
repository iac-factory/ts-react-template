export module Mode {
    const reference = process.env[ "NODE_ENV" ] || "development";

    export const Development = ( reference === "development" );
    export const Production = ( reference === "production" );
    export const Debug = ( reference === "development" );
}

export module Debugger {
    export interface Logger {
        name: "FCP" | "CLS" | "LCP" | "TTFB" | "FID";
    }

    export const enable = Mode.Debug;

    export const Logger = ( $: Logger ) => {
        switch ($.name) {
            case "FCP":
                console.debug("[Debug] (Web-Vitals)", "First-Contentful-Paint", { ...$, ...{ description: "First-Contentful-Paint" } });
                return { ...$, ...{ description: "First-Contentful-Paint" } };
            case "CLS":
                console.debug("[Debug] (Web-Vitals)", "Cumulative-Layout-Shift", { ...$, ...{ description: "Cumulative-Layout-Shift" } });
                return { ...$, ...{ description: "Cumulative-Layout-Shift" } };
            case "LCP":
                console.debug("[Debug] (Web-Vitals)", "Largest-Contentful-Paint", { ...$, ...{ description: "Largest-Contentful-Paint" } });
                return { ...$, ...{ description: "Largest-Contentful-Paint" } };
            case "TTFB":
                console.debug("[Debug] (Web-Vitals)", "Time-to-First-Byte", { ...$, ...{ description: "Time-to-First-Byte" } });
                return { ...$, ...{ description: "Time-to-First-Byte" } };
            case "FID":
                console.debug("[Debug] (Web-Vitals)", "First-Input-Delay", { ...$, ...{ description: "First-Input-Delay" } });
                return { ...$, ...{ description: "First-Input-Delay" } };
        }
    };

    export const Vitals = () => {
        (Mode.Debug) && console.info("[Important]", "Current mode is set to \"Development\". If React's Strict-Mode is Enabled, API Render(s) & Awaitable State(s) Will Invoke Twice -- Re-Invocation is Not A Client-Side Bug. Flickering Should be Expected. Please see https://reactjs.org/docs/strict-mode.html for more details.")
        try {
            return ( Mode.Debug ) ? import("web-vitals").then(
                ( { getCLS, getFID, getFCP, getLCP, getTTFB } ) => {
                    return {
                        "First-Contentful-Paint": getFCP(Logger, true),
                        "Cumulative-Layout-Shift": getCLS(Logger, true),
                        "Largest-Contentful-Paint": getLCP(Logger, true),
                        "First-Input-Delay": getFID(Logger, true),
                        "Time-to-First-Byte": getTTFB(Logger)
                    };
                }
            ) : null
        } catch (error) {
            console.debug("[Debug] Error" + ":", error);
            return null;
        }
    };
}

export type Logger = Debugger.Logger;

export const { Logger } = Debugger;
export const { Vitals } = Debugger;

export const { Debug } = Mode;

export default Mode;