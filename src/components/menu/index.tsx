import "./index.scss";

import Navigator from "./navigation";
import Global from "./title";
import Item from "./item";

export const Menu = () => {
    return (
        <Navigator>
            <Global prefix={ "Vusion" } title={ "LLC" } reload={false}/>
            <Item title={ "Settings" } reload={false}/>
            <Item title={ "Mobile-Preview" } overwrite={"mobile-preview"} reload={false}/>
        </Navigator>
    );
};

export default Menu;