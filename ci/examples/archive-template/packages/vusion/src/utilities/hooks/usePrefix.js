import { default as Settings } from "../../settings/Configuration.js";

import React from "react";

export const PrefixContext = React.createContext(Settings.Prefix);

export function usePrefix() {
    return React.useContext(PrefixContext);
}