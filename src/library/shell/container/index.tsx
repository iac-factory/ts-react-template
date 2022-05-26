import styles from "./index.module.scss";
export module Component {
    export const Container = ( { children } ) => {
        return (
            <main className={ styles.component } children={ children }/>
        );
    };
}

export default Container;
export const { Container } = Component;