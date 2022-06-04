import Highlighter from "react-syntax-highlighter";
import { Container } from "react-grid-system";
import Styles from "./index.module.scss";

import { Suspense } from "react";

import { NPM } from "./npm";

/***
 * Abstract Functional Component for Nested Directories (MDX) related Usage
 * ---
 *
 * See * exports for Child MDX Module(s)
 *
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
const Content = ( { children } ) => {
    return (
        <Suspense fallback={ ( null ) }>
            <div className={ Styles.content }>
                { children }
            </div>
        </Suspense>
    );
};

/***
 * Code Syntax Highlighting
 * ---
 *
 * Note the `children` reference; such cannot be found defaulted in the `properties`
 * catch-all
 *
 * @param className
 * @param children
 * @param properties
 *
 * @returns {JSX.Element}
 */
const code = ( {
                   className,
                   children,
                   ...properties
               } ) => {
    /***
     * CSS Overwrite(s) + Syntax Highlighting
     *
     * @type {{"hljs-name": {color: string}, "hljs-selector-pseudo": {color: string}, "hljs-attribute": {color: string}, "hljs-meta": {color: string}, "hljs-subst": {color: string}, "hljs-variable": {color: string}, "hljs-selector-attr": {color: string}, "hljs-comment": {color: string, fontStyle: string}, "hljs-built_in": {color: string}, "hljs-meta-string": {color: string}, "hljs-title": {color: string}, "hljs-formula": {color: string}, "hljs-regexp": {color: string}, "hljs-quote": {color: string, fontStyle: string}, "hljs-doctag": {color: string}, "hljs-symbol": {color: string}, "hljs-selector-tag": {color: string}, "hljs-template-variable": {color: string}, "hljs-literal": {color: string}, "hljs-class .hljs-title": {color: string}, "hljs-link": {color: string, textDecoration: string}, "hljs-deletion": {color: string}, "hljs-section": {color: string}, "hljs-attr": {color: string}, "hljs-type": {color: string}, "hljs-selector-class": {color: string}, "hljs-strong": {fontWeight: string}, "hljs-bullet": {color: string}, "hljs-addition": {color: string}, "hljs-number": {color: string}, "hljs-emphasis": {fontStyle: string}, "hljs-selector-id": {color: string}, hljs: {padding: string, overflowX: string, color: string, display: string}, "hljs-keyword": {color: string}, "hljs-string": {color: string}}}
     */
    const css = {
        "hljs": {
            display: "block",
            overflowX: "auto",
            padding: "0.5em",
            color: "#FFFFFF"
        },
        "hljs-comment": {
            color: "#5C6370",
            fontStyle: "italic"
        },
        "hljs-quote": {
            color: "#FFFFFF",
            fontStyle: "italic"
        },
        "hljs-doctag": {
            color: "#F39DE8"
        },
        "hljs-keyword": {
            color: "#F39DE8"
        },
        "hljs-formula": {
            color: "#F39DE8"
        },
        "hljs-section": {
            color: "#F39D9D"
        },
        "hljs-name": {
            color: "#F39D9D"
        },
        "hljs-selector-tag": {
            color: "#F39D9D"
        },
        "hljs-deletion": {
            color: "#F39D9D"
        },
        "hljs-subst": {
            color: "#F39D9D"
        },
        "hljs-literal": {
            color: "#F39D9D"
        },
        "hljs-string": {
            color: "#9DF3B8"
        },
        "hljs-regexp": {
            color: "#9DF3B8"
        },
        "hljs-addition": {
            color: "#9DF3B8"
        },
        "hljs-attribute": {
            color: "#9DF3B8"
        },
        "hljs-meta-string": {
            color: "#9DF3B8"
        },
        "hljs-built_in": {
            color: "#9DD9F3"
        },
        "hljs-class .hljs-title": {
            color: "#9DD9F3"
        },
        "hljs-attr": {
            color: "#BA9DF3"
        },
        "hljs-variable": {
            color: "#BA9DF3"
        },
        "hljs-template-variable": {
            color: "#BA9DF3"
        },
        "hljs-type": {
            color: "#BA9DF3"
        },
        "hljs-selector-class": {
            color: "#BA9DF3"
        },
        "hljs-selector-attr": {
            color: "#BA9DF3"
        },
        "hljs-selector-pseudo": {
            color: "#BA9DF3"
        },
        "hljs-number": {
            color: "#BA9DF3"
        },
        "hljs-symbol": {
            color: "#618EEE"
        },
        "hljs-bullet": {
            color: "#618EEE"
        },
        "hljs-link": {
            color: "#618EEE",
            textDecoration: "underline"
        },
        "hljs-meta": {
            color: "#618EEE"
        },
        "hljs-selector-id": {
            color: "#618EEE"
        },
        "hljs-title": {
            color: "#618EEE"
        },
        "hljs-emphasis": {
            fontStyle: "italic"
        },
        "hljs-strong": {
            fontWeight: "bold"
        }
    };

    const match = /language-(\w+)/.exec( className || "" );

    /// We conditionally return here not to lose our default `<code/>` inline reference(s)
    return ( match?.[ 1 ] ) ? (
        <Highlighter
            children={ String( children ).replace( /\n$/, "" ) }
            /// @ts-ignore
            style={ css }
            language={ match[ 1 ] ?? null }
            PreTag="div"
            { ...properties }
        />
    ) : (
        <code>
            { children }
        </code>
    );
};

/***
 * Abstract Functional Component for Nested Directories (MDX) related Usage
 * ---
 * @type {{code: (function({className: *, children: *, [p: string]: *}): JSX.Element)}}
 */
const Mutators = {
    code
};

export { Content };
export { Mutators };

export const Page = () => {
    return (
        <NPM.Configuration/>
    );
};

export default Page;