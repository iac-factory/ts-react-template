import React, { lazy, Suspense } from "react";
export const Home = ( properties?: { name?: string } ) => {
    const Text = lazy( () => import("./../../components/text") );

    return (
        <Suspense fallback={ null }>
            <Text input={ properties.name ?? "Home" }/>
        </Suspense>
    );
};

export default Home;