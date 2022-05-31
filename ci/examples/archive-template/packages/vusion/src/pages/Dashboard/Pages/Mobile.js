import "./../SCSS/Index.scss";
import "./../SCSS/Mobile.scss";

import { useState } from "react";

import { Grid, Row, Column } from "@carbon/react";

import { default as Editor } from "./Mobile-Components/Preview-Editor";
import { default as Frame } from "./Mobile-Components/Frame";

import { default as Shell } from "./../../../components/Dashboard/Index";

const Container = ({ children }) => {
    return (
        <section className={ "io-nexus-mobile-device-container" }>
            {
                children
            }
        </section>
    );
};

const Component = ({ children }) => {
    return (
        <div className="nexus-device iphone-x">
            <div className="notch">
                <div className="camera"/>
                <div className="speaker"/>
            </div>
            <div className="top-bar"/>
            <div className="sleep"/>
            <div className="bottom-bar"/>
            <div className="volume"/>
            <div className="overflow">
                <div className="shadow shadow--tr"/>
                <div className="shadow shadow--tl"/>
                <div className="shadow shadow--br"/>
                <div className="shadow shadow--bl"/>
            </div>
            <div className="inner-shadow"/>
            <div className="screen">
                <section className="iphone-x inner-screen-grid">
                    {
                        // (<Loading active={!state[0]} small={true}/>)
                    }
                    {/*  ...  */ }
                    {
                        children
                    }
                    {/*  ...  */ }
                </section>
            </div>
        </div>
    );
};

const Page = () => {
    const ready = useState(false);

    const Constants = {
        ID: "PREVIEW-ID",
        URL: process.env.REACT_APP_API_ENDPOINT + "/API/AWS/S3/Get-Bucket-Content?Bucket=blog.redirecthosting.com&Object=index.html"
    };

    return (
        <Shell>
            <Grid columns={ 2 }>
                <Row style={ { "justifyContent": "space-evenly" } }>
                    <Column>
                        <Editor state={ ready }/>
                    </Column>
                    <Column style={ { width: "35%" } }>
                        <Container>
                            <Component state={ ready }>
                                <Frame previewID={ Constants.ID } url={ Constants.URL } state={ ready }/>
                            </Component>
                        </Container>
                    </Column>
                </Row>
            </Grid>
        </Shell>
    );
};

export default Page;
