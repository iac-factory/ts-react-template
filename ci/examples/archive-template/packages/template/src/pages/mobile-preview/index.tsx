import React, { Suspense, lazy as Split } from "react";

type Import = React.LazyExoticComponent<typeof import("./../../components/page").default>;

/*** Code Splitting Page Content + Data Fetching */
const Content: Import = Split(() => import("./../../components/page"));

const Mobile = Split(() => import("./../../components/mobile-device"));
const Text = Split(() => import("./../../components/text"));

interface Properties {
    name?: string;
    children?: any;
}

const Page = ( properties: Properties = { name: "Mobile-Preview"} ) => {
    return (
        <Suspense fallback={ null }>
            <Content name={ properties.name }>
                <Mobile>
                    <Text input={ properties.name } center={ true }/>
                </Mobile>
            </Content>
        </Suspense>
    )
};

export default Page;

export { Page as Mobile };
