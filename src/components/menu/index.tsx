import "./index.scss";

import { Navigator } from "./navigation";
import { Global } from "./title";
import { Item } from "./item";

const Component = () => {
    return (
        <Navigator>
            <Global prefix={ "Vusion" } title={ "LLC" }/>
            <Item title={ "Settings" }/>
            <Item title={ "Mobile-Preview" } overwrite={"mobile-preview"}/>
        </Navigator>
    );
};

export default Component;

export { Component as Menu };
