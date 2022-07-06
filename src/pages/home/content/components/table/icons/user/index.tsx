import { ReactComponent as _Data } from "./user-data.svg";
import { ReactComponent as _Profile } from "./user-profile.svg";

export const Data = (configuration?: Dimensions) => {
    return (
        <_Data fill={"white"} height={configuration.height ?? 24} width={configuration.width ?? 24} className={configuration.className}/>
    );
};

export const Profile = (configuration?: Dimensions) => {
    return (
        <_Profile fill={"white"} height={configuration.height ?? 24} width={configuration.width ?? 24} className={configuration.className}/>
    );
};

type Dimensions = { height?: number, width?: number, className?: string, children? }
