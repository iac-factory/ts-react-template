import React, { Suspense, lazy as Split } from "react";

/*** Code Splitting Page Content + Data Fetching */
const Content = Split(() => import("./../../components/page"));

interface Properties {
    name: string;
}

const Page = ( properties: Properties = {name: "Settings"}  ) => {
    return (
        <Suspense fallback={ null }>
            <Content name={ properties.name }/>
        </Suspense>
    )
};

export default { Page };

export { Page as Settings };
