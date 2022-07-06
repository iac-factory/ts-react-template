import React from "react";

import * as Icons from "./icons";

import CXS from "classnames/bind";

const CX = CXS.bind( styles );

import styles from "./index.module.scss";
import tool from "./toolbar.module.scss";

import { Data } from ".";

type Input = { active: () => { count: number, users?: () => Promise<Data>, rows?: string }, caption?: string, loader: [ { loading: boolean, title: string }, React.Dispatch<{ loading: boolean, title: string }> ] };
export const Toolbar = ( properties: Input ) => {
    const { active } = properties;
    const { caption } = properties;

    const { count, rows, users } = active();

    const classes = CX( {
        [ styles.toolbar ]: true
    }, ( count > 0 ) ? styles.active : styles.hidden );

    const button = CX( {
        [ tool.right ]: true,
        [ tool.icon ]: true
    }, ( count === 1 ) ? tool.active : tool.disabled );

    React.useEffect(() => {

    });

    return (
        <>
            <span className={ ( styles.active ) }>
                {
                    caption
                }
            </span>
            <div className={ classes }>
                <div className={ tool.toolbar }>
                    <button className={ button } disabled={ ( count !== 1 ) }>
                        <Icons.Data className={ tool.icon } height={ 24 } width={ 24 }/>
                    </button>
                    <button className={ button } disabled={ ( count !== 1 ) } onClick={async (event) => {
                        console.log(event);
                        (rows) && console.log(rows);
                        const element = document.getElementById(rows);
                        console.log(element, await users());
                    }}>
                        <Icons.Data className={ tool.icon } height={ 24 } width={ 24 }/>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Toolbar;