import React, { Suspense, lazy } from "react";

export const Documentation = () => {
    const Page = lazy(async () => import("./mdx"));
    return (
        <Suspense fallback={ ( null ) }>
            <Page/>
        </Suspense>
    );
};

export default Documentation;