import { ReactComponent as Baseline } from "./checkbox-checked.svg";
import { ReactComponent as Fill } from "./checkbox-checked-filled.svg";

export module Checked {
    export const Checkbox = () => {
        return (
            <Baseline fill={"white"} height={32} width={32}/>
        );
    };

    export const Filled = () => {
        return (
            <Fill fill={"white"}/>
        );
    };
}

export default Checked;