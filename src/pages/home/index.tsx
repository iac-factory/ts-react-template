import React, { Suspense, lazy as Split } from "react";
import { HTMLAttributes } from "react";

type Import = React.LazyExoticComponent<typeof import("./../../components/page").default>;

const Content: Import = Split( () => import("./../../components/page") );

interface Properties {
    name?: string;
}

const Test = () => {
    return (
        <div>
            hello world
        </div>
    )
}

interface FormHTMLAttributes<T> extends HTMLAttributes<T> {
    acceptCharset?: string | undefined;
    action?: string | undefined;
    autoComplete?: string | undefined;
    encType?: string | undefined;
    method?: string | undefined;
    name?: string | undefined;
    noValidate?: boolean | undefined;
    target?: string | undefined;
}

const Form = () => {
    return (
        <form method={"POST"} action={"https://localhost:3443/authentication/login"}>
            <label >Enter your name:
                <input type="text" />
            </label>
        </form>
    )
}

const Page = ( properties: Properties = { name: "Home" } ) => {
    return (
        <Suspense fallback={ null }>
            <Content name={ properties.name }>
                <Form/>
            </Content>
        </Suspense>
    );
};

export default Page;

export { Page as Home };
