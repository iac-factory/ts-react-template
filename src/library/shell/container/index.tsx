import { Grid } from "./grid";

import styles from "./index.module.scss";
export module Component {
    export const Container = ( { children } ) => {
        return (
            <main className={ styles.component }>
                <Grid lg={ true } md={ true } sm={ true }>
                    { children }
                </Grid>
            </main>
        );
    };
}

export default Container;
export const { Container } = Component;