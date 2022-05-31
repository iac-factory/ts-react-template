import React from "react";

export const Context = React.createContext({});

export default function App() {
    return (
        <Context.Provider value={ "reed" }>
            <User/>
        </Context.Provider>
    );
}

function User() {
    return (
        <Context.Consumer>
            { value => <h1>{ value }</h1> }
        </Context.Consumer>
    );
}
