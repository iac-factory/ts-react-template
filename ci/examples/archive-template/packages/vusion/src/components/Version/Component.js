import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "@carbon/react";

const Year = new Date().getFullYear();

const Ignore = () => true;

import { default as Build } from "./../../Version.js";

import { default as Modal } from "./../Modal/Manager";

const Legal = () => (
    <>
        <Link href={ "#" } target={ "#" }>Copyrights</Link>, <Link href={ "#" } target={ "#" }>Usage
        Policy</Link>, <Link href={ "#" } target={ "#" }>DCMA</Link>, <Link href={ "#" } target={ "#" }>Security Notices</Link>,
        and <Link href={ "#" } target={ "#" }>Personal Data</Link>
    </>
);

import "./SCSS/Index.scss";
import * as Styles from "./SCSS/Index.module.scss";

const Component = ({ version, state }) => {
    //    window.onerror = Ignore;

    return (
        <Modal State={ state } buttonText={ "..." }/>
    );

    //    return (
    //        <>
    //            <Button
    //                type={ "button" } kind={ "secondary" } onClick={ () => state[1](true) } children={ (
    //                <>
    //                    Version Information
    //                </>
    //            ) }
    //            />
    //            <AboutModal
    //                open={ state[0] }
    //                additionalInfo={ [
    //                    { label: "Distribution", content: version }
    //                ] }
    //                className={ Styles.version }
    //                closeIconDescription="Close"
    //                copyrightText={ (
    //                    <span className={ Styles.copyright }>
    //                        Copyright © { String(Year) } Cloud-Technology LLC.
    //                    </span>
    //                ) }
    //                legalText={ (
    //                    <span className={ Styles.legal }>
    //                        The established website, domain, and associated namespace(s) contains proprietary notices,
    //                        copyright information, and conditional usage policies of which must be observed and followed.
    //                        Please see <Legal/> for additional information and context.
    //                    </span>
    //                ) }
    //                links={ [
    //                    <Link key="Key-Index-API" href="https://www.ibm.com/design/language">
    //                        API
    //                    </Link>,
    //                    <Link key="Key-Index-Open-Source-Licenses" href="https://www.ibm.com/design/language">
    //                        Open Source License(s)
    //                    </Link>,
    //                    <Link key="Key-Index-Carbon-Design-System" href="https://www.carbondesignsystem.com">
    //                        Carbon Design System
    //                    </Link>
    //                ] }
    //                logo={ (<img alt="Nexus Dashboard Version Component Logo" src="/Favicon/V-12-7.png"/>) }
    //                onClose={ (event) => console.log("Hello") }
    //                title={ (
    //                    <div className={ Styles.title }>
    //                        Nexus
    //                        { " ‒ " }
    //                        <span style={ { fontWeight: "600" } }>
    //                            Cloud Dashboard
    //                        </span>
    //                    </div>
    //                ) }
    //                content={ (
    //                    <>
    //                        <em>
    //                            The Cloud Practitioners Company
    //                        </em>
    //                    </>
    //                ) }
    //            />
    //        </>
    //)

};

Component.defaultProps = {
    version: Build
};

Component.propTypes = {
    version: PropTypes.string,
    state: PropTypes.any
};

export default Component;