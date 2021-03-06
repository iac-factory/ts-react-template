import("@mdx-js/loader");
import { MDXProvider } from "@mdx-js/react";
import { lazy } from "react";

export const Documentation = () => {
    const Page = lazy(async () => import("./mdx"));

    return (
        <MDXProvider>
            <Page/>
        </MDXProvider>
    );
};

export default Documentation;