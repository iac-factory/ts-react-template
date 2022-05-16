import React from "react";

/***
 *
 * @param theme: {String("g100" | "g90" | "g10" | "white")}
 *
 */
export const useTheme = ( theme = "g100" ) => {
    type Context = React.Context<string> & { theme: string };

    const Theme: React.Context<string> & { theme: any } = React.createContext(theme) as Context;

    Theme.theme = theme;

    return Theme;
};

export default useTheme;