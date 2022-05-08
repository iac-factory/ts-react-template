import React, { Suspense, lazy as Split } from "react";

type Import = React.LazyExoticComponent<typeof import("./../../components/page").default>;

const Content: Import = Split( () => import("./../../components/page") );

interface Properties {
    name?: string;
}

const Page = ( properties: Properties = { name: "settings" } ) => {
    return (
        <Suspense fallback={ null }>
            <Content name={properties.name}/>
        </Suspense>
    );
};

export default Page;

export { Page as Settings };
