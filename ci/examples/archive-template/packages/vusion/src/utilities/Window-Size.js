import {
    useState,
    useEffect
} from "react";

import _throttle from "lodash.throttle";

const Window = () => {
    if (typeof window !== "undefined") {
        return {
            innerHeight: window.innerHeight,
            innerWidth: window.innerWidth,
            outerHeight: window.outerHeight,
            outerWidth: window.outerWidth,
        };
    }
    return {
        innerWidth: null,
        innerHeight: null,
        outerWidth: null,
        outerHeight: null,
    };
};

const Size = () => {
    const [size, setSize] = useState(Window());

    // run on mount
    useEffect(() => {
        setSize(Window());
    }, []);

    // set resize handler once on mount and clean before unmount
    useEffect(() => {
        const handleResize = _throttle(() => {
            setSize(Window());
        }, 100);
        window.addEventListener("resize", handleResize);

        return () => {
            handleResize.cancel();
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return size;
}

export default Size;
