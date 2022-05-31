import "./SCSS/Content.scss";

import { Content } from "@carbon/react";

const Component = ({children}) => (
    <Content className={"io-dashboard-control-primary-content"}>
        {
            children
        }
    </Content>
);

export default Component;
