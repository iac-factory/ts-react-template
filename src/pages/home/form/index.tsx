import React, { Suspense, useEffect } from "react";

import { Container, Row, Col } from 'react-grid-system';


import styles from "./index.module.scss";

interface Help {
    text: string,
    hidden?: boolean
}

const Help = ( properties: Help ) => {
    return (
        <div className={ styles.help } hidden={ properties.hidden }>
            {
                properties.text
            }
        </div>
    );
};

interface Input {
    label: string,
    name: string,
    focus: boolean,
    help?: Help,
    placeholder?: string,
    autofill?: "on" | false,
    id?: string
}

const Input = ( properties: Input ) => {
    return (
        <div className={ styles.item }>
            <label className={ styles.label } title={ "label" }>
                {
                    properties.label
                }
            </label>
            <div className={ styles.outer }>
                <div className={ styles.wrapper }>
                    <input
                        type={ "text" }
                        className={ styles.input }
                        title={ properties.name[ 0 ].toUpperCase() + properties.name.slice( 1 ) }
                        id={ ( properties.id ) ? properties.id : [ properties.name, "identifier" ].join( "-" ) }
                        name={ properties.name }
                        autoComplete={ ( properties.autofill ) ? "on" : "off" }
                        autoFocus={ ( properties.focus ) ? properties.focus : false }
                        placeholder={ ( properties.placeholder ) ? properties.placeholder : properties.label }>
                        {/*  ...  */ }
                    </input>
                </div>
                <Help text={ properties.help.text }/>
            </div>
        </div>
    );
};

interface Password {
    label: string,
    name: string,
    help?: Help,
    placeholder?: false | "Password",
    id?: string
}

/***
 * Passwords should otherwise *never* be a page's first focus element.
 *
 * <br/>
 *
 * Of course, there may be exceptions to this rule (for example, a progress-based prompt
 * that completes the login form via a series of steps).
 *
 * <br/>
 *
 * The autofill property should be forced to "new-password".
 *
 * @param properties
 * @constructor
 */
const Password = ( properties: Password ) => {
    return (
        <div className={ styles.item }>
            <label className={ styles.label } title={ "label" }>
                {
                    properties.label
                }
            </label>
            <div className={ styles.outer }>
                <div className={ styles.wrapper }>
                    <input
                        type={ "password" }
                        className={ styles.input }
                        title={ properties.name[ 0 ].toUpperCase() + properties.name.slice( 1 ) }
                        id={ ( properties.id ) ? properties.id : [ properties.name, "identifier" ].join( "-" ) }
                        name={ properties.name }
                        autoComplete={ "new-password" }
                        autoFocus={ false }
                        placeholder={ ( properties.placeholder ) ? properties.placeholder : "Password" }>
                        {/*  ...  */ }
                    </input>
                </div>
                <Help text={ properties.help.text }/>
            </div>
        </div>
    );
};

interface Area {
    label: string,
    name: string,
    focus: boolean,
    help?: Help,
    placeholder?: string,
    stateful?: boolean,
    autofill?: boolean,
    id?: string
}

const Area = ( properties: Area ) => {
    return (
        <div className={ styles.item }>
            <label className={ styles.label } title={ "label" }>
                {
                    properties.label
                }
            </label>
            <div className={ styles.outer }>
                <div className={ styles.wrapper }>
                    <textarea
                        className={ styles.area }
                        title={ properties.name[ 0 ].toUpperCase() + properties.name.slice( 1 ) }
                        id={ ( properties.id ) ? properties.id : [ properties.name, "identifier" ].join( "-" ) }
                        name={ properties.name }
                        autoComplete={ "new-password" }
                        autoFocus={ properties.focus }
                        rows={ 5 }
                        placeholder={ ( properties.placeholder ) ? properties.placeholder : "Placeholder Text" }>
                        {/*  ...  */ }
                    </textarea>
                </div>
                <Help text={ properties.help.text }/>
            </div>
        </div>
    );
};

/***
 * ...
 * ---
 *
 * The first Input item of a form should be set to the page's autofocus element
 */
export const Form = () => {
    return (
        <Suspense fallback={ <span> Loading ... </span> }>
            <Container lg={ true } md={ true } sm={ true }>
                <Row justify="start">
                    <Col>
                        <Input label={ "Field-1" } name={ "field-1" } autofill={ false } help={ { text: "Optional Help Context (1)" } } focus={ true }/>
                    </Col>
                    <Col>
                        <Input label={ "Field-2" } name={ "field-2" } autofill={ false } help={ { text: "Optional Help Context (2)" } } focus={ false }/>
                    </Col>
                </Row>
                <Row justify="start">
                    <Col lg={ 16 }>
                        <Input label={ "Username" } name={ "username" } help={ { text: "Optional Help Context (3)" } } focus={ false }/>
                    </Col>
                    <Col lg={ 16 }>
                        <Password label={ "Password" } name={ "password" } help={ { text: "Optional Help Context (4)" } }/>
                    </Col>
                </Row>
                <Area label={ "Field-3" } name={ "field-3" } autofill={ false } help={ { text: "Optional Help Context (5)" } } focus={ false }/>
            </Container>
        </Suspense>
    );
};

export default Form;