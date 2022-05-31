import { useEffect, useRef } from "react";

export function useEvent(element, eventName, callback) {
    const savedCallback = useRef(null);

    useEffect(() => {
        savedCallback.current = callback;
    });

    useEffect(() => {
        function handler(event) {
            if ( savedCallback.current ) {
                savedCallback.current(event);
            }
        }

        element.addEventListener(eventName, handler);

        return () => {
            element.removeEventListener(eventName, handler);
        };
    }, [ element, eventName ]);
}
