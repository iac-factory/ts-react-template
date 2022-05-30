import React, { useRef, useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
export function useOutsideAlerter(reference, trigger, state) {
    useEffect(() => {
        /*** Handler for Click(s) Outside of Element(s) */
        function handler(event) {
            const referrer = reference.current && !reference.current.contains(event.target);
            const origin = trigger.current && !trigger.current.contains(event.target);

            /*** A click has occurred both outside of the trigger and the wrapper context */
            (referrer && (origin)) && state[1](false);
            (referrer && (origin)) && console.debug("[Debug]", "External Context Click");

            /*** A click has occurred on the trigger context; therefore, it's assumed the client is already handling a state change */
            (referrer && !(origin)) && console.debug("[Debug]", "Trigger Context Click");

            // if (reference.current && !reference.current.contains(event.target)) {
            //     if (trigger.current && !trigger.current.contains(event.target)) {
            //         /*** A click has occurred both outside of the trigger and the wrapper context */
            //         console.log("External Context");
            //
            //         state[1](false);
            //     } else {
            //         /*** A click has occurred on the trigger context */
            //         console.log("Trigger Context");
            //     }
            // }
        }

        // Bind the Event Listener
        document.addEventListener("mousedown", handler);
        return () => {
            // Unbind the Event Listener on Clean-Up
            document.removeEventListener("mousedown", handler);
        };
    }, [reference, trigger, state]);
}