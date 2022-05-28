import React from "react";

import { Provider } from ".";
import { Handler } from ".";

/***
 * The Login-Form
 * ---
 *
 * @constructor
 *
 */
export const Form = () => {
    const location = Provider.useSession();
    const navigate = Provider.useNavigator();
    const authorization = Provider.useAuthorization();

    const session = { location, navigate, authorization };

    return (
        <form id={ "login-form" } onSubmit={(event) => Handler(event, session)}>
            <input name={ "username" } type={ "text" } placeholder={ "username" } id={"username"}/>
            <input name={ "password" } type={ "password" } id={"password"}/>
            <input type="submit" hidden={ true }/>
        </form>
    );
};

export type Event = React.FormEvent<HTMLFormElement>;

export default Form;