import { useEffect } from "react";
import { MDXProvider } from "@mdx-js/react";
import * as Content from "./content.mdx";

const Load = async () => {
    const elements = [ document.getElementsByClassName( "language-js" ), document.getElementsByClassName( "language-json" ), document.getElementsByClassName("language-json5") ];
    elements.forEach((language) => {
        for ( const [ _, block ] of Object.entries( language ) ) {
            const worker = new Worker( [ "", "web-workers", "syntax-highlighting.js" ].join( "/" ) );
            worker.onmessage = function ( event ) {
                block.innerHTML = event.data;
            };

            worker.postMessage( block.textContent );
        }
    });
};

/***
 * The MDX (Markdown) Content + Runtime Injections
 * ---
 *
 * @returns {JSX.Element}
 * @constructor
 */
export const Component = () => {
    useEffect( () => void Load(), []);

    return (
        <MDXProvider components={ {} }>
            <Content.default/>
        </MDXProvider>
    );
};

export default Component;