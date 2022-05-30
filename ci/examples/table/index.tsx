import React, { Suspense, lazy } from "react";

import { App } from "./simple";

import "./index.scss";

export const Table = () => {

    return (
        <Suspense fallback={ <span> Loading ... </span> }>
            <App/>
        </Suspense>
    );
};

export default Table;