import React, { Suspense, lazy as Split } from "react";

type Import = React.LazyExoticComponent<typeof import("./../../components/page").default>;

/*** Code Splitting Page Content + Data Fetching */
const Content: Import = Split(() => import("./../../components/page"));

interface Properties {
    name: string;
}

/**
 *  Page Exportable with Code-Split HTML Content
 *  and Asynchronous Data Fetching
 */

const Page = ( properties: Properties = {name: "Settings"}  ) => {
    return (
        <Suspense fallback={ null }>
            <Content name={ properties.name }/>
        </Suspense>
    )
};

export default Page;

export { Page };