import "./Styles.scss";

import { TreemapChart } from "@carbon/charts";

import { default as Data } from "./Complex-Tree-Map.Data";
import { default as Options } from "./Complex-Tree-Map.Options";

const Component = () => {
    return (
        <TreemapChart options={Options} data={Data}/>
    );
};

export default Component;
