import React, { Suspense, lazy } from "react";

export const Home = () => {
    const Form = lazy(async () => import("./form"));

    return (
        <Suspense fallback={ <span> Loading ... </span> }>
            <Form/>
        </Suspense>
    );
};

export default Home;