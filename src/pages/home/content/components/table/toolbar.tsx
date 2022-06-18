import React from "react";

import * as Icons from "./icons";

import CXS from "classnames/bind";
const CX = CXS.bind( styles );

import styles from "./index.module.scss";
import tool from "./toolbar.module.scss";

type Input = { active: [ { count: number; }, React.Dispatch<boolean> ], caption?: string };
export const Toolbar = ( properties: Input ) => {
    const classes = CX( {
        [ styles.toolbar ]: true
    }, ( properties.active[ 0 ].count === 0 ) ? styles.active : styles.hidden );

    const button = CX( {
        [ tool.right ]: true,
        [ tool.icon ]: true
    }, ( properties.active[ 0 ].count === 0 ) ? tool.active : tool.disabled );

    return (
        <>
            <span className={ ( styles.active ) }>{ properties.caption }</span>
            <div className={ classes }>
                <div className={ tool.toolbar }>
                    <button className={ button } disabled={ !( properties.active[ 0 ].count === 0 ) }>
                        <Icons.Data className={ tool.icon } height={ 24 } width={ 24 }/> &nbsp;
                    </button>
                </div>
            </div>
        </>
    );
};

export default Toolbar;