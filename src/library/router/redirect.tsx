import React from "react";

import { Router } from ".";

export module Redirection {
    export const Home = () => {
        return ( <Router.Navigate replace to={"/"}/> );
    };

    export const Redirect = ( properties: Properties ) => {
        const { location, replacement } = properties;

        const overwrite = (replacement) ? replacement : true;

        return ( <Router.Navigate to={location} replace={overwrite}/> );
    };

    export interface Properties {
        location: string;
        replacement?: boolean;
    }
}

export const { Home } = Redirection;
export const { Redirect } = Redirection;

export default Redirection;
