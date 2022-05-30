import React, { useRef } from "react";

import styles from "./index.module.scss";

import { useOutsideAlerter } from ".";

export module Component {
    export const Panel = ( input: Input ) => {
        const wrapper = useRef( null );
        const trigger = useRef( null );
        const active = React.useState( false );

        useOutsideAlerter( wrapper, trigger, active );

        return (
            <li>
                <div ref={trigger} className={ styles.item } onClick={ ( ( event ) => {
                    console.debug("[Debug]", "Panel Item Click-Event");
                    active[1](!active[0]);
                } ) }>
                    <span>{ input.title }</span>
                </div>
                {
                    ( active[ 0 ] && input.children ) ? (
                        <section ref={ wrapper } style={ {
                        }}>
                            { input .children }
                        </section>
                    ) : ( active[ 0 ] ) ? (
                        <section ref={ wrapper } style={ {
                            position: "absolute",
                            width: "auto",
                            minWidth: "350px",
                            top: "100%",
                            left: "-1rem",
                            right: "auto",
                            minHeight: "300px",
                            justifyContent: "flex-start",
                            backgroundColor: "var(--global-background)",
                            border: "var(--global-border-subtle-00)",
                            borderWidth: "1px",
                            borderStyle: "solid",
                            display: "flex",
                            boxShadow: "0 3px 5px rgba(185, 185, 185, 0.075)",
                            zIndex: "1000",
                            flexDirection: "row",
                            padding: "2rem"
                        } }>
                            hello world
                        </section>
                    ) : null
                }
            </li>
        );
    };

    export interface Input {
        /*** Global Menu Item Path Prefix(es) */
        title: string;

        children?: JSX.Element;
    }
}

export default Panel;
export const { Panel } = Component;
