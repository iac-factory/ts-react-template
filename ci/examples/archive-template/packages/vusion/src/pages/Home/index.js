import "./SCSS/index.scss";

import Styles from "./SCSS/Index.module.scss";

import {
    Grid, Column
} from "@carbon/react";

import { default as Page } from "./Page";

const Default = () => (
    <Grid className={ [ Styles.home, Styles.component ].join(" ") }>
        <Column lg={ 16 } md={ 8 } sm={ 4 } className={ Styles.home }>
            <Page/>
        </Column>
    </Grid>
);

export default Default;
