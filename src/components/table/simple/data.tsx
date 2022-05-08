import React from "react";

const Component = () => {
    /// Arbitrary Data
    return React.useMemo(
        () => [
            {
                "check": "",
                "column-1": "Hello",
                "column-2": "World"
            },
            {
                "check": "",
                "column-1": "react-table",
                "column-2": "rocks"
            },
            {
                "check": "",
                "column-1": "whatever",
                "column-2": "you want"
            }
        ],
        []
    );
};

export { Component as Data };

export default Component;
