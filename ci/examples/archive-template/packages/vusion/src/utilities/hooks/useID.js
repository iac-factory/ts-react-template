import { useEffect, useLayoutEffect, useState } from "react";
import { canUseDOM } from "./../environment";
import { default as useInstanceID } from "./useInstanceID.js";

const getId = useInstanceID();
const useIsomorphicLayoutEffect = canUseDOM ? useLayoutEffect : useEffect;

let serverHandoffCompleted = false;

/**
 * Generate a unique ID with an optional prefix prepended to it
 * @param {string} [prefix]
 * @returns {string}
 */
export function useId(prefix = "id") {
    const [ id, setId ] = useState(() => {
        if ( serverHandoffCompleted ) {
            return `${ prefix }-${ getId() }`;
        }
        return null;
    });

    useIsomorphicLayoutEffect(() => {
        if ( id === null ) {
            setId(`${ prefix }-${ getId() }`);
        }
    }, [ getId ]);

    useEffect(() => {
        if ( serverHandoffCompleted === false ) {
            serverHandoffCompleted = true;
        }
    }, []);

    return id;
}

/**
 * Generate a unique id if a given `id` is not provided
 * @param {string} id
 * @returns {string}
 */
export function useFallbackId(id) {
    const fallback = useId();
    return id ?? fallback;
}