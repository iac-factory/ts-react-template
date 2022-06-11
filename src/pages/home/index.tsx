import { lazy as Loader, Suspense } from "react";

export const Home = () => {
    const Content = Loader( () => import("./content") );

    return (
        <Suspense fallback={ null }>
            <Content/>
        </Suspense>
    );
};

export default Home;