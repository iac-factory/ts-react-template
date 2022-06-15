import { ReactComponent as Base } from "./checkbox.svg";

export * from "./indeterminate";
export * from "./checked";

export const Checkbox = () => {
    return (
        <Base fill={"white"}/>
    );
};

export default Checkbox;