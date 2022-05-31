import PropTypes from "prop-types";
import { useParams, useLocation } from "react-router-dom";

import {
    Grid, Column
} from "@carbon/react";

import React, {
    Suspense, lazy as Import
} from "react";

import { default as Loader } from "./../../../components/Loader";

const Component = (props) => {
    const {
        timeout,
        description,
        ... Properties
    } = props;

    const { id } = useParams();
    console.log(id);
    const Location = useLocation();

    const Search = Location.search;
    const Parameters = new URLSearchParams(
        Search
    );

    const Name = Parameters.get("name");

    const Page = Import(() => import("./Page.js"));

    return (
        <Grid>
            <Column lg={ 16 } md={ 8 } sm={ 4 }>
                <Suspense fallback={ (<Loader description={ description } timeout={ timeout }/>) }>
                    <Loader description={ description } timeout={ timeout }>
                        <Page id={ id } project={ Name }/>
                    </Loader>
                </Suspense>
            </Column>
        </Grid>
    );
};

Component.defaultProps = {
    timeout: 1250
};

Component.propTypes = {
    /**
     * Forced Delay during Transition (Units in ms)
     */

    timeout: PropTypes.number.isRequired,

    /***
     * Loading Screen Context
     */

    description: PropTypes.string.isRequired
};

export default Component;
