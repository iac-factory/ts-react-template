import { Text } from "..";
import React, { useDeferredValue, useEffect, useState } from "react";

export module Button {
    export const Toggle = () => {
        const [ on, setOn ] = React.useState( false );
        const toggle = () => setOn( (value) => !value );
        return <Switch on={ on } onToggle={ toggle }/>;
    };

    interface Input { on, onToggle }

    function Switch(input: Input) {
        return (
            <div>
                <SwitchMessage on={ input.on }/>
                <SwitchButton onToggle={ input.onToggle }/>
            </div>
        );
    }

    function SwitchMessage( { on } ) {
        return <div>The button is { (on) ? 'on' : 'off' }</div>;
    }

    function SwitchButton( { onToggle } ) {
        return <button onClick={ onToggle }>Toggle</button>;
    }

}

const Test = () => {
    const state = useState( {
        loading: true,
        second: 15
    } );

    const deferrer = String(useDeferredValue(state[0]["second"]));

    useEffect( () => {
        const interval = window.setInterval( () => {
            state[ 1 ]( {
                ...state[ 0 ], ...{
                    second: state[ 0 ][ "second" ] + 1
                }
            } );
        }, 1000 );

        const id = window.setTimeout( () => {
            window.clearInterval(interval);
            state[ 1 ]( {
                loading: false,
                second: state[ 0 ][ "second" ] + 1
            } );
        }, 10000 );

        return () => {
            window.clearInterval( interval );
            window.clearTimeout( id );
        };
    }, [ state ] );

    const Second = () => {
        return (
            <>
                {
                    deferrer
                }
            </>
        );
    };

    return (<Second/>);
};

export const Home = () => {
    return (
        <>
            <Text input={ "..." }/>
            <br/>
            <Test/>
            <Button.Toggle/>
        </> );
};

export default Home;