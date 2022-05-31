import PropTypes from "prop-types";

import React, { useState, useEffect } from "react";

import "./SCSS/Card.scss";

import { default as List } from "./List";

export const Page = ({}) => {
    return (
        <List rows={ 3 }/>
    );
};

Page.defaultProps = {};

Page.propTypes = {};

export default Page;