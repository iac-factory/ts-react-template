import styles from "./index.module.scss";
export module Component {
    export const Container = ( properties: Properties ) => {
        return (
            <main className={ styles.component }>
                { properties.children }
            </main>
        );
    };
}

export interface Properties {
    children: JSX.Element;
}

export default Container;
export const { Container } = Component;