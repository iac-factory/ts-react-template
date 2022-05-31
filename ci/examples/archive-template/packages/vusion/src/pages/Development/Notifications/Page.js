import React, { lazy as Import, Suspense } from "react";

const Page = () => {
    const Awaitable = Import(() => import("./Awaitable").then((Module) => Module));

    return (
        <Suspense fallback={<></>}>
            <Awaitable Evaluation={"Content"}/>
        </Suspense>
    );
};

export default Page;
