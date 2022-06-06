import React, { Suspense } from "react";

import { Row, Col } from "react-grid-system";

import styles from "./index.module.scss";

export module Help {
    export const Component = ( properties: Properties ) => {
        return (
            <div className={ styles.help } hidden={ properties.hidden }>
                {
                    properties.text
                }
            </div>
        );
    };

    export interface Properties {
        text: string,
        hidden?: boolean
    }
}

export module Input {
    export const Component = ( properties: Properties ) => {
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
                    <Help.Component text={ properties.help.text }/>
                </div>
            </div>
        );
    };

    export interface Properties {
        label: string,
        name: string,
        focus: boolean,
        help?: Help.Properties,
        placeholder?: string,
        autofill?: "on" | false,
        id?: string
    }
}

export module Password {
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
    export const Component = ( properties: Properties ) => {
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
                    <Help.Component text={ properties.help.text }/>
                </div>
            </div>
        );
    };

    export interface Properties {
        label: string,
        name: string,
        help?: Help.Properties,
        placeholder?: false | "Password",
        id?: string
    }
}

export module Area {
    export const Component = ( properties: Properties ) => {
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
                    <Help.Component text={ properties.help.text }/>
                </div>
            </div>
        );
    };

    export interface Properties {
        label: string,
        name: string,
        focus: boolean,
        help?: Help.Properties,
        placeholder?: string,
        stateful?: boolean,
        autofill?: boolean,
        id?: string
    }
}

/***
 * ...
 * ---
 *
 * The first Input item of a form should be set to the page's autofocus element
 */
export const Form = () => {
    return (
        <Suspense /* fallback={ <span> Loading ... </span> } */ fallback={(null)}>
            <Row justify="start">
                <Col>
                    <Input.Component label={ "Field-1" } name={ "field-1" } autofill={ false } help={ { text: "Optional Help Context (1)" } } focus={ true }/>
                </Col>
                <Col>
                    <Input.Component label={ "Field-2" } name={ "field-2" } autofill={ false } help={ { text: "Optional Help Context (2)" } } focus={ false }/>
                </Col>
            </Row>
            <Row justify="start">
                <Col lg={ 16 }>
                    <Input.Component label={ "Username" } name={ "username" } help={ { text: "Optional Help Context (3)" } } focus={ false }/>
                </Col>
                <Col lg={ 16 }>
                    <Password.Component label={ "Password" } name={ "password" } help={ { text: "Optional Help Context (4)" } }/>
                </Col>
            </Row>
            <Area.Component label={ "Field-3" } name={ "field-3" } autofill={ false } help={ { text: "Optional Help Context (5)" } } focus={ false }/>
        </Suspense>
    );
};

export default Form;
