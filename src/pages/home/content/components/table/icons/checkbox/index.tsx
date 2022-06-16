import { ReactComponent as Baseline } from "./checkbox.svg";

export * from "./indeterminate";
export * from "./checked";

export const Checkbox = () => {
    return (
        <Baseline fill={"white"} height={24} width={24}/>
    );
};

export default Checkbox;