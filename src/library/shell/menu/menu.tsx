import { Navigator } from ".";
import { Global } from ".";
import { Item } from ".";

export module Component {
    export const Menu = () => {
        return (
            <Navigator>
                <Global prefix={ "Vusion" } title={ "LLC" } reload={ false }/>
                <Item title={ "Settings" } reload={ false }/>
                <Item title={ "Mobile-Preview" } overwrite={ "mobile-preview" } reload={ false }/>
            </Navigator>
        );
    };
}

export default Menu;
export const { Menu } = Component;