import React from "react";

export * from "./form";

export * from "./provider";
export * from "./extractor";
export * from "./handler";

import { Form } from "./form";
export const Login = () => {
    return (<Form/>);
};

export default Login;