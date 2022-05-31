import PropTypes from "prop-types";

import React, { useState, useEffect } from "react";

import { Book } from "@carbon/icons-react";

import "./SCSS/Card.scss";

import cx from "classnames";

export const Page = ({}) => {
    return (
        <>
            <div className={ cx("blog-content-card", "blog-primary-content-showcase-item") }>
                <h3
                    className={ "blog-content-card-header-title" }
                    children={ (
                        <>
                            <span className={ "blog-content-card-header-title-text" }>Header Card Title</span>
                            <img
                                className={ "blog-content-card-header-image" }
                                src="/Images/Cube.svg"
                                alt={ "..." }
                            />
                        </>
                    ) }
                />
                <hr/>
                <p className={ cx("blog-content-card-author-name") }>
                    Author
                    { ":" + " " }
                    <span>Author Name</span>
                </p>
                <p className={ cx("blog-content-card-estimated-read-duration") }>
                    <Book className={ cx("blog-content-card-estimated-read-duration-icon") }/>
                    { " " }
                    <span>
                    7 Minutes
                </span>
                </p>
                <p className={ "blog-content-card-synopsis" }>
                    Robotic process automation (RPA) helps the retail sector streamline critical workflows, deliver engaging customer experiences and adapt
                    to
                    an increasingly digital world. Here’s how.
                </p>
            </div>

            <div className={ "blog-primary-content-container" }>
                <div className={ cx("blog-content-card", "blog-primary-content-normalized-item") }>
                    {/*<img*/ }
                    {/*    className={ "blog-content-card-header-image" }*/ }
                    {/*    src="/Images/Cube.svg"*/ }
                    {/*    alt={ "..." }*/ }
                    {/*/>*/ }
                    <h3 className={ "blog-content-card-header-title" } children={ (<span>Title Name</span>) }/>
                    <hr/>
                    <p className={ cx("blog-content-card-author-name") }>
                        Author:
                        { " " }
                        <span>Author Name</span>
                    </p>
                    <p className={ cx("blog-content-card-estimated-read-duration") }>
                        <Book className={ cx("blog-content-card-estimated-read-duration-icon") }/>
                        { " " }
                        <span>
                    7 Minutes
                </span>
                    </p>
                    <p className={ "blog-content-card-synopsis" }>
                        Robotic process automation (RPA) helps the retail sector streamline critical workflows.
                    </p>
                </div>
                <div className={ cx("blog-content-card", "blog-primary-content-normalized-item") }>
                    <img
                        className={ "blog-content-card-header-image" }
                        src="/Images/Cube.svg"
                        alt={ "..." }
                    />
                    <h3 className={ "blog-content-card-header-title" } children={ (<span>Title Name</span>) }/>
                    <hr/>
                    <p className={ cx("blog-content-card-author-name") }>
                        Author:
                        { " " }
                        <span>Author Name</span>
                    </p>
                    <p className={ cx("blog-content-card-estimated-read-duration") }>
                        <Book className={ cx("blog-content-card-estimated-read-duration-icon") }/>
                        { " " }
                        <span>
                    7 Minutes
                </span>
                    </p>
                    <p className={ "blog-content-card-synopsis" }>
                        Robotic process automation (RPA) helps the retail sector streamline critical workflows.
                    </p>
                </div>
            </div>

            <div className={ "blog-primary-content-container" }>
                <div className={ cx("blog-content-card", "blog-primary-content-normalized-item") }>
                    <img
                        className={ "blog-content-card-header-image" }
                        src="/Images/Cube.svg"
                        alt={ "..." }
                    />
                    <h3 className={ "blog-content-card-header-title" } children={ (<span>Title Name</span>) }/>
                    <hr/>
                    <p className={ cx("blog-content-card-author-name") }>
                        Author:
                        { " " }
                        <span>Author Name</span>
                    </p>
                    <p className={ cx("blog-content-card-estimated-read-duration") }>
                        <Book className={ cx("blog-content-card-estimated-read-duration-icon") }/>
                        { " " }
                        <span>
                    7 Minutes
                </span>
                    </p>
                    <p className={ "blog-content-card-synopsis" }>
                        Robotic process automation (RPA) helps the retail sector streamline critical workflows.
                    </p>
                </div>
                <div className={ cx("blog-content-card", "blog-primary-content-normalized-item") }>
                    {/*<img*/ }
                    {/*    className={ "blog-content-card-header-image" }*/ }
                    {/*    src="/Images/Cube.svg"*/ }
                    {/*    alt={ "..." }*/ }
                    {/*/>*/ }
                    <h3 className={ "blog-content-card-header-title" } children={ (<span>Title Name</span>) }/>
                    <hr/>
                    <p className={ cx("blog-content-card-author-name") }>
                        Author:
                        { " " }
                        <span>Author Name</span>
                    </p>
                    <p className={ cx("blog-content-card-estimated-read-duration") }>
                        <Book className={ cx("blog-content-card-estimated-read-duration-icon") }/>
                        { " " }
                        <span>
                    7 Minutes
                </span>
                    </p>
                    <p className={ "blog-content-card-synopsis" }>
                        Robotic process automation (RPA) helps the retail sector streamline critical workflows.
                    </p>
                </div>
            </div>
        </>
    );
};

Page.defaultProps = {};

Page.propTypes = {};

export default Page;