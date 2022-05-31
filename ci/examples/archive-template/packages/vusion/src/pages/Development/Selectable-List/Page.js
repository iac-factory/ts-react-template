import React from "react";

import PropTypes from "prop-types";

import * as Styles from "./SCSS/Index.module.scss";

import { default as List } from "./../../../components/Selectable-List";

/***
 *
 * @returns {JSX.Element}
 *
 * @constructor
 *
 */

const Component = () => (<List rows={ 15 }/>);

export default Component;