import Styles from "./index.module.scss";

export const Dropdown = ( { title }: { title: string } ) => {
    return (
        <button className={Styles.auxiliary}>
            <span>
                {
                    title
                }
            </span>
        </button>
    );
};

export default Dropdown;