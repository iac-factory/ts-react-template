import { lazy as Loader, Suspense } from "react";

export const Home = () => {
    const Content = Loader( async () => import("./content") );

    return (
        <Suspense fallback={ (<></>) }>
            <Content/>
        </Suspense>
    );
};

export default Home;