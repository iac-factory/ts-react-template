import React from "react";

export const Loading = React.createContext({
    loading: false,
    message: null,
    show: () => {},
    hide: () => {}
});

export const Defaults = { Loading: { loading: false, message: "...", show: () => void 0, hide: () => void 0 } };