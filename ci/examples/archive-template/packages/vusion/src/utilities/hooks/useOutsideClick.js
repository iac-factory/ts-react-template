import { useEffect, useRef } from "react";
import { useEvent } from "./useEvent.js";
import { canUseDOM } from "./../environment.js";

export function useOutsideClick(ref, callback) {
    const savedCallback = useRef(callback);

    useEffect(() => {
        savedCallback.current = callback;
    });

    // We conditionally guard the `useEvent` hook for SSR. `canUseDOM` can be
    // treated as a constant as it will be false when executed in a Node.js
    // environment and true when executed in the browser
    if ( canUseDOM ) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEvent(window, "click", (event) => {
            if ( ref.current && !ref.current.contains(event.target) ) {
                savedCallback.current(event);
            }
        });
    }
}
