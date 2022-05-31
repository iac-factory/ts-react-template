import "./SCSS/Profile.scss";

import { default as cx } from "classnames";

import { useEffect, useState } from "react";

import { Button, Link } from "@carbon/react";

import { Settings, User, Edit } from "@carbon/icons-react";

const Component = ({ State }) => {
    useEffect(() => {
        document.getElementById("io-profile").addEventListener("click", (event) => {
            event.stopImmediatePropagation();
        });
    }, []);

    const [ profileEditIcon, setProfileEditIcon ] = useState(false);

    return (
        <div id={ "io-profile" } className={ (State[0]) ? cx("io-profile-popover") : cx("io-profile-popover", "io-profile-popover-hidden") }>
            <section className={ "io-profile-popover-container" }>
                <div className={ "io-profile-popover-icon-container" } onMouseEnter={
                    (event) => {
                        setProfileEditIcon(true);
                    }
                } onMouseLeave={
                    (event) => {
                        setProfileEditIcon(false);
                    }
                }
                >
                    {
                        (profileEditIcon) ? (<Edit className={ [ "io-profile-popover-icon", "io-profile-popover-icon-edit" ].join(" ") }/>)
                            : (<User className={ [ "io-profile-popover-icon", "io-profile-popover-icon" ].join(" ") }/>)
                    }
                </div>
                <div className={ "io-profile-popover-header" }>
                    <span className={ "io-profile-popover-header-text" }>
                        Jacob B. Sanders
                    </span>
                    <span className={ "io-profile-popover-header-label" }>
                        jacob.sanders@cloudhybrid.io
                    </span>
                </div>
            </section>
            {/*<hr/>*/ }
            <section className={ "io-profile-popover-footer" }>
                <Link href={ "/settings" } inline={ true }>
                    <Settings className={ "io-profile-popover-footer-settings-icon" }/>
                    Settings
                </Link>
                <Button size={ "small" } kind={ "secondary" } href={ "/logout" } children={ "Logout" } className={ "io-profile-popover-footer-logout-button" }/>
            </section>
        </div>
    );
};

export default Component;