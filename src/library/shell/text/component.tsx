import "./index.scss";
import Styles from "./index.module.scss";

export const Component = ( { input, theme, center } ) => {
    const Theme = ( theme === "light" ) ? Styles.light : Styles.dark;

    return (
        <span className={ [ Styles.component, Theme, ( center ) && Styles.center || null ].join(" ") }>
            {
                input
            }
        </span>
    );
};

export default Component;
