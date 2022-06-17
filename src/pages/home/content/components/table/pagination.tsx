import styles from "./pagination.module.scss";
import CXS from "classnames/bind";

import React, { FormEvent } from "react";

const CX = CXS.bind( styles );

import { Down } from "./icons";

const Form = (initial: number) => {
    const Select = document.createElement("select");
    Select.id = "total-page-items";

    const options = [
        10, 20, 50, 200
    ];

    options.forEach((option) => {
        const Option = document.createElement("option");

        Option.value = String(option);
        Option.selected = ( parseInt( Option.value ) === initial );

        Select.appendChild(Option);
    });

    return Select;
};

export const Pagination = ( { total }: Component.properties ) => {
    const classes = {
        component: CX( {}, styles.pagination ),
        left: CX( {}, styles.left ),
        right: CX( {}, styles.right ),
        total: CX( {}, styles.total )
    };

    const Total = () => {
        return (
            <>
                <span className={ classes.total }>
                {
                    [ "Total Page Item(s)" + ":" ].join( " " )
                }
                </span>
                <select id={ "total-page-items" } value={total[0]} onChange={ (event) => {
                    console.log(event.target.value);
                    total[1](parseInt(event.target.value));
                }}>
                    <option value={"10"} /* selected={(total[0] === 10)} */>
                        10
                    </option>
                    <option value={"20"} /* selected={(total[0] === 20)} */>
                        25
                    </option>
                    <option value={"50"} /* selected={(total[0] === 50)} */>
                        50
                    </option>
                </select>
            </>
        );
    };

    return (
        <div className={ classes.component }>
            <div className={ classes.left }>
                <Total/>
            </div>
            <div className={ classes.right }>
                {
                    "Right"
                }
            </div>
        </div>
    );
};

module Component {
    interface Element extends React.HTMLAttributes<HTMLTableElement> {
        /*** [Attributes] */
    }

    export type properties = JSX.IntrinsicAttributes & React.HTMLAttributes<{}> & Element & {
        total: [ 10 | 25 | 50 | 250 | number, React.Dispatch<number> ]
    }
}