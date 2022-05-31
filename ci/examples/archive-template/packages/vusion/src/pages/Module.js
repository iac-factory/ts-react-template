import PropTypes from "prop-types";

import {
    Grid, Column
} from "@carbon/react";

import { default as Loader } from "./../components/Loader";

const Component = ({ Page, timeout, description, ... Properties }) => {
    return (
        <Loader description={ description } timeout={ timeout }>
            <Grid { ... Properties }>
                <Column lg={ 16 } md={ 8 } sm={ 4 }>
                    <Page/>
                </Column>
            </Grid>
        </Loader>
    );
};

Component.defaultProps = {
    timeout: 1250
};

Component.propTypes = {
    Page: PropTypes.func.isRequired,

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