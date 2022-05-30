import("@mdx-js/loader");
import { MDXProvider } from "@mdx-js/react";
import DOM from "react-dom";
import Content from "./content.mdx";

export const Documentation = () => {
    console.log(Content);
    // const Page = lazy(async () => import("./mdx"));

    return (
        <MDXProvider>
            {/*<Content/>*/}
            {
                null
            }
        </MDXProvider>
    );
};

export default Documentation;