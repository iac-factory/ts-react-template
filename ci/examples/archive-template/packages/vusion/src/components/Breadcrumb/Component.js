import PropTypes from "prop-types";

import React, { useEffect, useRef, useState } from "react";

import Styles from "./SCSS/Index.module.scss";

import { default as Capitalize } from "./../../utilities/Capitalize";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbSkeleton
} from "@carbon/react";

const Compose = () => {
    Capitalize();

    const Hash = String(window.location.hash).slice(2);
    const Relative = Hash.capitalize();

    return [ "Nexus", window.location.pathname, Relative ].join("/");
};

const Deconstruct = (Title = null) => {
    const Data = [];

    const Composition = (
        Title === null
    ) ? Compose()
        : Title.join("/");

    const Components = Composition.split("/").filter(($) => $ !== "");

    Components.forEach(
        (Element, Index, Collection) => {
            const Properties = (
                Index === 0
            ) ? {
                "data-value": Element,
                href: "/#/",
                value: -1,
                key: [ "Breadcrumb-Item", String(Index) ].join("-"),
                isCurrentPage: (
                    Index === Collection.length - 1
                )
            } : {
                "data-value": String(Element).charAt(0).toUpperCase()
                    + String(Element).slice(1),
                href: [ "", Element.toLowerCase() ].join("/"),
                value: -1,
                key: [ "Breadcrumb-Item", String(Index) ].join("-"),
                isCurrentPage: (
                    Index === Collection.length - 1
                )
            };

            Data.push(
                (
                    <BreadcrumbItem { ... Properties } className={ Styles.crumb }>
                        { Properties["data-value"] }
                    </BreadcrumbItem>
                )
            );
        }
    );

    return Data;
};

const Component = () => {
    const Data = Deconstruct(null);
    return (
        <Breadcrumb aria-label={ "Parent Navigation" } noTrailingSlash={ true } className={ Styles.crumb }>
            {
                Data.map((Component) => Component)
            }
        </Breadcrumb>
    );
};

Component.propTypes = {
    /***
     * @param Title {String} - [...]
     */

    Title: PropTypes.string
};

export const Strict = ({ Title }) => {
    const Data = Deconstruct([ "Nexus", Title ]);

    return (
        <Breadcrumb aria-label={ "Parent Navigation" } noTrailingSlash={ true } className={ Styles.breadcrumb }>
            {
                Data.map((Component) => Component)
            }
        </Breadcrumb>
    );
};

Strict.propTypes = {
    /***
     * @param Title {String} - [...]
     */

    Title: PropTypes.string.isRequired
};

export default Strict;
