import React, { useState } from "react";

import { BubbleChart } from "@carbon/charts-react";

class Component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    "group": "AWS",
                    "Archive File(s)": 10000,
                    "Bandwidth": 32100,
                    "HTTP Request(s)": 50000
                },
                {
                    "group": "AWS",
                    "Archive File(s)": 12000,
                    "Bandwidth": 23500,
                    "HTTP Request(s)": 34000
                },
                {
                    "group": "AWS",
                    "Archive File(s)": 14000,
                    "Bandwidth": 53100,
                    "HTTP Request(s)": 63000
                },
                {
                    "group": "AWS",
                    "Archive File(s)": 15000,
                    "Bandwidth": 42300,
                    "HTTP Request(s)": 43000
                },
                {
                    "group": "AWS",
                    "Archive File(s)": 16000,
                    "Bandwidth": 12300,
                    "HTTP Request(s)": 55000
                },
                {
                    "group": "AWS",
                    "Archive File(s)": 11000,
                    "Bandwidth": 12400,
                    "HTTP Request(s)": 25000
                },
                {
                    "group": "AWS",
                    "Archive File(s)": 13000,
                    "Bandwidth": 34500,
                    "HTTP Request(s)": 35000
                },
                {
                    "group": "AWS",
                    "Archive File(s)": 13500,
                    "Bandwidth": 23100,
                    "HTTP Request(s)": 55000
                },
                {
                    "group": "AWS",
                    "Archive File(s)": 15500,
                    "Bandwidth": 63200,
                    "HTTP Request(s)": 35000
                },
                {
                    "group": "AWS",
                    "Archive File(s)": 15750,
                    "Bandwidth": 24300,
                    "HTTP Request(s)": 64000
                },

                /// .....

                {
                    "group": "Microsoft",
                    "Archive File(s)": 10500,
                    "Bandwidth": 22400,
                    "HTTP Request(s)": 50000
                },
                {
                    "group": "Microsoft",
                    "Archive File(s)": 12000,
                    "Bandwidth": 23500,
                    "HTTP Request(s)": 34000
                },
                {
                    "group": "Microsoft",
                    "Archive File(s)": 14000,
                    "Bandwidth": 53100,
                    "HTTP Request(s)": 63000
                },
                {
                    "group": "Microsoft",
                    "Archive File(s)": 15000,
                    "Bandwidth": 42300,
                    "HTTP Request(s)": 43000
                },
                {
                    "group": "Microsoft",
                    "Archive File(s)": 16000,
                    "Bandwidth": 12300,
                    "HTTP Request(s)": 55000
                },
                {
                    "group": "Microsoft",
                    "Archive File(s)": 11000,
                    "Bandwidth": 12400,
                    "HTTP Request(s)": 25000
                },
                {
                    "group": "Microsoft",
                    "Archive File(s)": 13000,
                    "Bandwidth": 34500,
                    "HTTP Request(s)": 35000
                },
                {
                    "group": "Microsoft",
                    "Archive File(s)": 13500,
                    "Bandwidth": 23100,
                    "HTTP Request(s)": 55000
                },
                {
                    "group": "Microsoft",
                    "Archive File(s)": 15500,
                    "Bandwidth": 63200,
                    "HTTP Request(s)": 35000
                },
                {
                    "group": "Microsoft",
                    "Archive File(s)": 15750,
                    "Bandwidth": 24300,
                    "HTTP Request(s)": 64000
                }
            ],
            options: {
                "title": "Bubble (linear)",
                "axes": {
                    "bottom": {
                        "title": "Network Usage (TBs/Month)",
                        "mapsTo": "Bandwidth",
                        "includeZero": false
                    },
                    "left": {
                        "title": "Archive File(s)",
                        "mapsTo": "Archive File(s)",
                        "includeZero": false
                    }
                },
                "bubble": {
                    "radiusMapsTo": "HTTP Request(s)",
                    "radiusLabel": "HTTP Request(s)"
                },
                "legend": {
                    "additionalItems": [
                        {
                            "type": "radius",
                            "name": "HTTP Request(s)"
                        }
                    ]
                },
                "height": "400px"
            }
        };
    }

    attachShadow(host) {
        if (host == null) {
            return;
        }

        host.attachShadow({mode: "open"});
        host.shadowRoot.innerHTML = host.innerHTML;
    }

    render() {

        return (
            <span ref={this.attachShadow}>
                {
                    (
                        <section className={"io-chart"}>
                            <BubbleChart
                                tooltip={false}
                                loading={true}
                                data={this.state.data}
                                options={this.state.options}
                            >
                            </BubbleChart>
                        </section>
                    )
                }
            </span>
        );
    };
}

//
// // Create web component with target div inside it.
// const container = document.createElement("Chart");
// document.body.appendChild(container);
//
// // Add shadow root to component.
// const shadow = document.querySelector("Chart").attachShadow({mode: "open"});
//
// // Select the web component, then the shadowRoot.
// const target = document.querySelector("Chart").shadowRoot;
//
// target.styleSheets = require("@carbon/charts/styles-g100.min.css");
//
// ReactDOM.render(<Component/>, target);

export default Component;
