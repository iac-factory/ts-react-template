import { lazy } from "react";
import { Suspense } from "react";

const Form = () => {
    return (
        <form method={ "POST" } action={ "https://localhost:3443/authentication/login" }>
            <label>Enter your name:
                <input type="text"/>
            </label>
        </form>
    );
};

export const Home = ( properties?: { name?: string } ) => {
    const Text = lazy( () => import("./../../components/text") );

    return (
        <Suspense fallback={ null }>
            <Text input={ properties.name ?? "Home" }/>
            <Form/>
        </Suspense>
    );
};

export default Home;