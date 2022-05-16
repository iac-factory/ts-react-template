import Styles from "./index.module.scss";

export const Container = ( { children } ) => {
    return (
        <main className={ Styles.component } children={ children }/>
    );
};

export default Container;