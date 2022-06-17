import React from "react";
import styles from "./index.module.scss";
import xstyles from "./toolbar.module.scss";
import * as Icons from "./icons";

import CXS from "classnames/bind";
const CX = CXS.bind( styles );

type Input = { active: [ { count: number; }, React.Dispatch<boolean> ], caption?: string };
export const Toolbar = ( properties: Input ) => {
    const classes = CX( {
        [ styles.toolbar ]: true
    }, ( properties.active[ 0 ].count > 0 ) ? styles.active : styles.hidden );

    const button = CX( {
        [ xstyles.right ]: true,
        [ xstyles.icon ]: true
    }, ( properties.active[ 0 ].count > 0 ) ? xstyles.active : xstyles.disabled );

    return (
        <>
            <span className={ ( styles.active ) }>{ properties.caption }</span>
            <div className={ classes }>
                <div className={ xstyles.toolbar }>
                    <button className={ button } disabled={ !( properties.active[ 0 ].count > 0 ) }>
                        <Icons.Data className={ xstyles.icon } height={ 24 } width={ 24 }/> &nbsp;
                    </button>
                </div>
            </div>
        </>
    );
};

export default Toolbar;