import { Navigator } from ".";
import { Global } from ".";
import { Panel } from ".";
import { Item } from ".";

export module Component {
    export const Menu = () => {

        return (
            <Navigator>
                <Global prefix={ "Vusion" } title={ "LLC" } reload={ false }/>
                <Item title={ "Settings" } reload={ false }/>
                <Panel title={ "Test-Relative" }/>
                <Panel title={ "Test-Full" }>
                    <section style={{
                        position: "fixed",
                        width: "100vw",
                        top: "calc(var(--global-navigation-menu-height) - 1px)",
                        left: "0",
                        right: "0",
                        minHeight: "300px",
                        justifyContent: "flex-start",
                        backgroundColor: "var(--global-background)",
                        borderTop: "var(--global-border-subtle-00)",
                        borderTopWidth: "1px",
                        borderTopStyle: "solid",
                        borderBottom: "var(--global-border-subtle-00)",
                        borderBottomWidth: "1px",
                        borderBottomStyle: "solid",
                        display: "flex",
                        boxShadow: "0 3px 5px rgba(185, 185, 185, 0.075)",
                        zIndex: "1000",
                        flexDirection: "row",
                        padding: "2rem",
                    }}>
                        hello world
                    </section>
                </Panel>
                <Item title={ "Mobile-Preview" } overwrite={ "mobile-preview" } reload={ false }/>
                <Item title={ "Documentation" } reload={ false }/>
            </Navigator>
        );
    };
}

export default Menu;
export const { Menu } = Component;