import "./SCSS/Grid.scss";

import { Grid } from "@carbon/react";

const Component = ({children}) => (
    <Grid className={"io-dashboard-grid"}>
        {
            children
        }
    </Grid>
);

export default Component;
