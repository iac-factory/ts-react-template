import React, { useEffect, useState, lazy as Import, Suspense } from "react";

import { Grid, Column, Row } from "@carbon/react";

import { Route, Routes, Navigate, useLocation } from "react-router";

// @Task (See Below) import { default as BTT } from "./components/Back-To-Top";

import { default as Menu } from "./components/Menu";
import { default as Breadcrumbs } from "./components/Breadcrumb";
import { default as Spinner } from "./components/Loader";

import { Authorizer, JWT, Validate } from "./components/Authenticate";

import { default as Home } from "./pages/Home";

import "./Application.scss";

const Application = () => {
    const location = useLocation();
    const Authorization = useState(null);

    useEffect(() => {
        const Token = async (Authorization) => {
            const $ = await JWT();

            const Validation = (
                $ !== null
            ) ? await Validate($) : null;
            Authorization[1](Validation?.Status?.Code === 200);

            console.debug("[Debug]", "Validation", Validation, $);
        };

        Token(Authorization).catch((e) => {
            console.warn("[Warning]", "Authentication (Application) Authorization Error");
            console.warn(e);
            throw e;
            //            throw new Error(JSON.stringify(e, null, 4));
        });
    }, []);

    const Login = Import(() => new Promise(async (resolve) => resolve(await import("./pages/Login"))));
    const GitHub = Import(async () => import("./pages/GitHub"));
    const GitLab = Import(async () => import("./pages/GitLab"));
    const ID = Import(async () => import("./pages/GitLab/Project"));
    const Template = Import(async () => import("./pages/Template"));
    const Pipelines = Import(async () => import("./pages/Pipelines"));
    const Tiles = Import(async () => import("./pages/Development/Tiles"));
    const Awaitable = Import(async () => import("./pages/Development/Awaitable"));
    const List = Import(async () => import("./pages/Development/Selectable-List"));
    const Linklist = Import(async () => import("./pages/Development/Selectable-Link-List"));
    const Table = Import(async () => import("./pages/Development/Test-Table"));
    const Snippet = Import(async () => import("./pages/Development/Code-Snippet-Awaitable"));
    const Card = Import(async () => import("./pages/Development/Card"));

    const Modal = Import(() => import("./pages/Modal"));

    const Error = Import(() => import("./pages/Error/Test.js"));

    const Blog = Import(() => import("./pages/Blog"));
    const Blog2 = Import(() => import("./pages/Blog-2"));
    const Blog3 = Import(() => import("./pages/Blog-3"));

    const Dashboard = {
        Index: Import(() => import("./pages/Dashboard/Pages/Index")),
        Mobile: Import(() => import("./pages/Dashboard/Pages/Mobile"))
    };

    return (
        <React.StrictMode>
            <Menu Authorizer={ Authorization }/>
            <Grid>
                <Column lg={ 16 } md={ 8 } sm={ 4 }>
                    <Row>
                        <Column>
                            <Breadcrumbs Title={ location.pathname }/>
                        </Column>
                    </Row>
                    <Suspense fallback={ null }>
                        <Spinner timeout={ 1000 } description={ "" }>
                            <Routes basename={ "/" }>
                                {/* Base Endpoint(s) */ }

                                <Route path={ "/" } element={ (<Home/>) }/>

                                <Route path={ "/blog" } element={ (<Blog description={ "Loading Blog Article(s) ..." }/>) }/>
                                <Route path={ "/blog/:category" } element={ (<Blog description={ "Loading Blog Article(s) Category ..." }/>) }/>
                                <Route path={ "/blog/:category/:subcategory" } element={ (<Blog description={ "Loading Blog Article(s) Subcategory ..." }/>) }/>
                                <Route path={ "/blog/:category/:subcategory/:article" } element={ (<Blog description={ "Loading Blog Article ..." }/>) }/>

                                <Route path={ "/blog-2" } element={ (<Blog2 description={ "Loading Blog Article(s) ..." }/>) }/>
                                <Route path={ "/blog-3" } element={ (<Blog3 description={ "Loading Blog Article(s) ..." }/>) }/>

                                <Route path={ "/error" } element={ (<Error/>) }/>
                                <Route
                                    element={
                                        <Spinner timeout={ 1250 } description={ "Establishing Secure Context ..." }>
                                            <Login Authorizer={ Authorization }/>
                                        </Spinner>
                                    } path={ "/login" }
                                />

                                { /* Authorized Endpoint(s) */ }

                                <Route
                                    element={ (
                                        <Authorizer
                                            Page={ Template }
                                            Session={ true }
                                            description={ "Loading Template Page ..." }
                                        />
                                    ) } path={ "/template" }
                                />

                                <Route
                                    element={ (
                                        <Authorizer
                                            Page={ Modal }
                                            Session={ true }
                                            description={ "Loading Modal Page ..." }
                                        />
                                    ) } path={ "/modal" }
                                />

                                <Route
                                    element={ (
                                        <Authorizer
                                            Page={ GitLab }
                                            Session={ Authorization[0] }
                                            description={ "Loading VCS Project(s) ..." }
                                        />
                                    ) } path={ "/gitlab" }
                                />

                                <Route
                                    element={ (
                                        <Authorizer
                                            Page={ ID }
                                            Session={ Authorization[0] }
                                            description={ "Loading Test Table ..." }
                                        />
                                    ) } path={ "/gitlab/:id" }
                                />

                                <Route
                                    element={ (
                                        <Authorizer
                                            Page={ GitHub }
                                            Session={ Authorization[0] }
                                            description={ "Loading VCS Organization ..." }
                                        />
                                    ) } path={ "/development/github" }
                                />

                                <Route
                                    element={ (
                                        <Authorizer
                                            Page={ Pipelines }
                                            Session={ Authorization[0] }
                                            description={ "Loading Deployment Pipeline(s) ..." }
                                        />
                                    ) } path={ "/development/pipelines" }
                                />

                                <Route
                                    element={ (
                                        <Authorizer
                                            Page={ Dashboard }
                                            Session={ Authorization[0] }
                                            description={ "Loading Administrative Dashboard ..." }
                                        />
                                    ) } path={ "/development/dashboard" }
                                />

                                <Route
                                    element={ (
                                        <Authorizer
                                            Page={ Template }
                                            Session={ Authorization[0] }
                                            description={ "Loading Template Page ..." }
                                        />
                                    ) } path={ "/development/template" }
                                />

                                <Route
                                    element={ (
                                        <Authorizer
                                            Page={ Awaitable }
                                            Session={ Authorization[0] }
                                            description={ "Loading Awaitable Page ..." }
                                        />
                                    ) } path={ "/development/awaitable" }
                                />

                                { /* Development Component(s) */ }

                                <Route
                                    element={ (
                                        <Authorizer
                                            Page={ Snippet }
                                            Session={ Authorization[0] }
                                            description={ "Loading Code Snippet Component ..." }
                                        />
                                    ) } path={ "/development/snippet" }
                                />

                                <Route
                                    element={ (
                                        <Authorizer
                                            Page={ Tiles }
                                            Session={ Authorization[0] }
                                            description={ "Loading Tile(s) Component ..." }
                                        />
                                    ) } path={ "/development/tiles" }
                                />

                                <Route
                                    element={ (
                                        <Authorizer
                                            Page={ List }
                                            Session={ Authorization[0] }
                                            description={ "Loading List Component ..." }
                                        />
                                    ) } path={ "/development/list" }
                                />

                                <Route
                                    element={ (
                                        <Authorizer
                                            Page={ Linklist }
                                            Session={ Authorization[0] }
                                            description={ "Loading Link-List Component ..." }
                                        />
                                    ) } path={ "/development/link-list" }
                                />

                                <Route
                                    element={ (
                                        <Authorizer
                                            Page={ Card }
                                            Session={ Authorization[0] }
                                            description={ "Loading Card Component ..." }
                                        />
                                    ) } path={ "/development/card" }
                                />

                                <Route
                                    element={ (
                                        <Authorizer
                                            Page={ Table }
                                            Session={ Authorization[0] }
                                            description={ "Loading Test Table ..." }
                                        />
                                    ) } path={ "/development/table" }
                                />

                                { /* Wildcard */ }

                                <Route path={ "/*" } element={ (<Navigate to={ "/" }/>) }/>
                            </Routes>
                        </Spinner>
                    </Suspense>
                </Column>
            </Grid>
            {/* <BTT/> // @Task: Fix Issue(s) with Page Bottom-Margin(s) & Z-Index(es) */ }
        </React.StrictMode>
    );
};

export default Application;
