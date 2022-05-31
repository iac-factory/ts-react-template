import { default as Form } from "./Form";

const Page = ({Authorizer}) => {
    /// const Awaitable = Import(() => import("./Form").then((Module) => Module));

    return (
        <Form Authorizer={Authorizer}/>
    );
};

export default Page;
