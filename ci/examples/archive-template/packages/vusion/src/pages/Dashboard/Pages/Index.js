import { default as Shell } from "./../../../components/Dashboard/Index";

import { default as Data } from "./../Demo/Example-1";

import { default as Divider } from "./../../../components/Divider/Index";

import { default as Table } from "./../Tables/Repositories/Index";

import { default as APIKeyExample } from "./../../../components/Modal/API-Key/Example";

import { default as ContentManager } from "./../../../components/Tearsheet/Content";

import { default as Importer } from "./../../../components/Modal/Import/Component";

const Page = () => {
    return (
        <Shell>
            <Table/>

            <Divider/>

            <Data.One/>
            <Data.Two/>
            <Data.Three/>
            <Data.Four/>
            <Data.Five/>

            <Divider/>

            <APIKeyExample/>

            <Divider/>

            <ContentManager/>

            <Divider/>

            <Importer Type={ "Import" }/>
        </Shell>
    );
};

export default Page;
