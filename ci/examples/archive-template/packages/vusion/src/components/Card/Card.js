import { SkeletonPlaceholder } from "@carbon/react";

import { SkeletonText } from "./../Skeleton-Text";

import Styles from "./SCSS/Index.module.scss";

//import PropTypes, {
//    array,
//    element,
//    func,
//    node,
//    oneOfType,
//    shape,
//    string
//} from "prop-types";

import React, { Fragment } from "react";

const Card = (
    {
        className,
        children,
        label,
        link,
        header,
        body,
        footer,
        onClick,
        ... other
    }
) => {
    const cardHeader = header && (
        <div className={ [ className, Styles.header ].join(" ") }>
            { header.tag && (
                <p className={ Styles.tag }>
                    {
                        header.tag
                    }
                </p>
            ) }
            { header.image && (
                <img
                    className={ Styles.image }
                    alt={ label }
                    src={ header.image }
                />
            ) }
            <h1 className={ Styles.title }>{ header.title }</h1>
        </div>
    );

    const cardBody = body && (
        <div className={ Styles.body }>
            <p>{ body.text }</p>
            { body.children }
        </div>
    );

    const cardFooter = footer && (
        <div className={ Styles.footer }>{ footer.children }</div>
    );

    const content = (
        <Fragment>
            { cardHeader }
            { cardBody }
            { cardFooter }
            { children }
        </Fragment>
    );

    return link ? (
        <a
            className={ [ Styles.card, Styles.link ].join(" ") }
            href={ link }
            aria-label={ label }
            onClick={ onClick }
            { ... other }
        >
            { content }
        </a>
    ) : (
        <div className={ [ Styles.card, ... className ].join(" ") } { ... other }>
            { content }
        </div>
    );
};

/** Card child elements. */
const children = oneOfType([ array, element, string ]);

//Card.defaultProps = {
//    body: null,
//    children: null,
//    className: "",
//    footer: null,
//    header: null,
//    label: "",
//    link: null,
//    onClick: null
//};

//Card.propTypes = {
//    /** @type {object.<object, *>} An object list of body props. */
//    body: shape({
//        children,
//
//        /** @type {string} The text of the body. */
//        text: string
//    }),
//
//    children,
//
//    /** @type {string} The class. */
//    className: string,
//
//    /** @type {object.<object, *>} An object list of footer props. */
//    footer: shape({
//        children
//    }),
//
//    /** @type {object.<object, *>} An object list of header props. */
//    header: shape({
//        /** @type {string} The image of the header. */
//        image: string,
//
//        /** @type {string} Card header tag. */
//        tag: node,
//
//        /** @type {string} The title of the header. */
//        title: string.isRequired
//    }),
//
//    /** @type {string} The alt tag content for an image, if included in the header object. */
//    label: string,
//
//    /** @type {string} The link. */
//    link: string,
//
//    /** @type {string} Click handler. */
//    onClick: func
//};

export default Card;

export const Skeleton = (
    {
        className,
        children,
        label,
        link,
        header,
        body,
        footer,
        onClick,
        ... other
    }
) => {
    const cardHeader = header && (
        <SkeletonPlaceholder/>
    );

    const cardBody = body && (
        <div className={ Styles.body }>
            { (<SkeletonText width="65%"/>) }
            { (<SkeletonText width={ "40%" }/>) }
        </div>
    );

    const cardFooter = footer && (
        <SkeletonText className={ [ Styles.footer, Styles.wrapper ].join(" ") }/>
    );

    const content = (
        <Fragment>
            { cardHeader }
            { cardBody }
            { cardFooter }
        </Fragment>
    );

    return link ? (
        <a
            className={ [ Styles.card, Styles.link ].join(" ") }
            href={ link }
            aria-label={ label }
            onClick={ onClick }
            { ... other }
        >
            { content }
        </a>
    ) : (
        <div className={ [ Styles.card, ... className ].join(" ") } { ... other }>
            { content }
        </div>
    );
};