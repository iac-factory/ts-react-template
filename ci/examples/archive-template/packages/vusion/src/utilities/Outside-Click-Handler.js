import { useEffect } from "react";

let passiveListenerSupported;

try {
    const Options = Object.defineProperty({}, "passive", {
        get() { passiveListenerSupported = true; },
    });

    window.addEventListener("testPassive", null, Options);
    window.removeEventListener("testPassive", null, Options);
} catch (e) {
    passiveListenerSupported = false;
}

function useOnClickOutside(ref, handler) {
    useEffect(() => {
        const listener = (event) => {
            if ( ! ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler(event);
        };

        document.addEventListener(
            "mousedown",
            listener,
            passiveListenerSupported ? { passive: true }: false
        );
        document.addEventListener(
            "touchstart",
            listener,
            passiveListenerSupported ? { passive: true }: false
        );

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);
}

export default useOnClickOutside;
