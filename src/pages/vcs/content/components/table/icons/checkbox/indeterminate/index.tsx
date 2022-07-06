import { ReactComponent as Baseline } from "./checkbox-indeterminate.svg";
import { ReactComponent as Fill } from "./checkbox-indeterminate-filled.svg";

export module Indeterminate {
    export const Checkbox = () => {
        return (
            <Baseline fill={"white"}/>
        );
    };

    export const Filled = () => {
        return (
            <Fill fill={"white"}/>
        );
    };
}

export default Indeterminate;