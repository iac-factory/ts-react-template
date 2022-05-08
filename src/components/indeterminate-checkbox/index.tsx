import React from "react";
import { RefObject } from "react";
import { ForwardedRef } from "react";

const Checkbox = React.forwardRef(
    // @ts-ignore
    ( { indeterminate, ... properties }, forwarder: ForwardedRef<HTMLInputElement> ) => {
        const reference: RefObject<HTMLInputElement> = React.useRef();

        const resolver: RefObject<HTMLInputElement> | typeof forwarder | any = forwarder || reference;

        React.useEffect( () => {
            resolver.current.indeterminate = indeterminate;
        }, [ resolver, indeterminate ] );

        return (
            <>
                <input type="checkbox" ref={ resolver } { ... properties } />
            </>
        );
    }
);

export default Checkbox;

export { Checkbox };
