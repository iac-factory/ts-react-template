import React, { ReactFragment, ReactPortal } from "react";
import ReactDOM from "react-dom";

interface Input {
    type?: "error" | "warning" | "info" | "default" | "successful";
    content?: string;
    theme?: "light" | "dark" | "colored";
    duration?: number | null;
}

type Node = ReactFragment | ReactPortal | boolean | null | undefined;

interface Properties {
    name?: "notification-portal";
    element?: "div";
    children?: Node;
}

export const Portal = ( properties: Properties = {
    name: "notification-portal",
    element: "div",
    children: null
} ) => {
    const Parent = document.getElementById( "Application" );

    const container = React.useRef( document.createElement( properties.element ) );

    React.useEffect( () => {
        const $ = container.current;

        Parent.appendChild( container.current );

        return () => {
            Parent.removeChild( $ );
        };
    }, [ Parent, properties.name ] );

    return ReactDOM.createPortal( null, container.current );
};