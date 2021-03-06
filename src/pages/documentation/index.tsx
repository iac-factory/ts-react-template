import React, { Suspense } from "react";

import "highlight.js/scss/github-dark.scss";

export const Documentation = () => {
    const Page = React.lazy(async () => import("./mdx"));
    
    return (
        <Suspense fallback={ (<></>) }>
            <Page/>
        </Suspense>
    );
};

export default Documentation;