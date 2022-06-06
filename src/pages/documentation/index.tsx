import React, { Suspense } from "react";

export const Documentation = () => {
    const Page = React.lazy(async () => import("./mdx"));
    
    return (
        <Suspense>
            <Page/>
        </Suspense>
    );
};

export default Documentation;