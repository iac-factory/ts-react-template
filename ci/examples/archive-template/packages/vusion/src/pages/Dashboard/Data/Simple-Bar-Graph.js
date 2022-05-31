import React, { useState } from "react";

import { SimpleBarChart } from "@carbon/charts-react";
import "./Styles.scss";

class Component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    "group": "Group 1",
                    "value": 0.5
                },
                {
                    "group": "Group 2",
                    "value": 2
                }
            ], options: {
                "title": "Custom ticks (simple bar)",
                "axes": {
                    "left": {
                        "mapsTo": "value",
                        "ticks": {
                            "values": [
                                0,
                                1.2,
                                1.3,
                                2
                            ]
                        }
                    },
                    "bottom": {
                        "mapsTo": "group",
                        "scaleType": "labels"
                    }
                },
                "height": "400px"
            }
        };
    }

    render() {
        return (
            <section className={"io-chart"}>
                <SimpleBarChart
                    data={this.state.data}
                    options={this.state.options}>
                </SimpleBarChart>
            </section>
        );
    };
}

export default Component;
