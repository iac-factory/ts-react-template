import React from "react";
import CXS from "classnames/bind";

const CX = CXS.bind( styles );

import styles from "./pagination.module.scss";

export const Pagination = ( {
                                total,
                                selected
                            }: Component.properties ) => {
    const classes = {
        component: CX( {}, styles.pagination ),
        left: CX( {}, styles.left ),
        right: CX( {}, styles.right ),
        total: CX( {}, styles.total ),
        selected: CX( {
            [ styles.active ]: ( selected > 0 ),
            [ styles.disabled ]: ( !( selected ) || selected === 0 )
        }, styles.selected ),
        number: CX( {
            [ styles.active ]: ( selected > 0 ),
            [ styles.disabled ]: ( !( selected ) || selected === 0 )
        }, styles.number )
    };


    const Total = () => {
        return (
            <>
                <span className={ classes.total }>
                {
                    [ "Total Page Item(s)" + ":" ].join( " " )
                }
                </span>
                <select id={ "total-page-items" } value={ total[ 0 ] } onChange={ ( event ) => {
                    console.debug( "[Debug] [Pagination] Selection Event", event.target.value );

                    total[ 1 ]( parseInt( event.target.value ) );
                } }>
                    <option value={ "10" } /* selected={(total[0] === 10)} */>
                        10
                    </option>
                    <option value={ "20" } /* selected={(total[0] === 20)} */>
                        25
                    </option>
                    <option value={ "50" } /* selected={(total[0] === 50)} */>
                        50
                    </option>
                </select>
                <span className={ classes.selected }>
                    <span className={ classes.number }>
                        {
                            selected
                        }
                    </span>
                    &nbsp;
                    {
                        "Item(s) Selected"
                    }
                </span>
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
        selected: number
    }
}