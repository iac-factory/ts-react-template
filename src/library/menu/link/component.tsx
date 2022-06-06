import "./index.scss";
import Styles from "./index.module.scss";

export const Component = ( { input, center } ) => {
    return (
        <span className={ [ Styles.component, ( center ) && Styles.center || null ].join(" ") }>
            {
                input
            }
        </span>
    );
};

export default Component;
