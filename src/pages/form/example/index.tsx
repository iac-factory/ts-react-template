import React, { Suspense } from "react";

import styles from "./index.module.scss";

export interface Help {
    text: string,
    hidden?: boolean
}

export const Help = ( properties: Help ) => {
    return (
        <div className={ styles.help } hidden={ properties.hidden }>
            {
                properties.text
            }
        </div>
    );
};

export interface Input {
    label: string,
    name: string,
    focus: boolean,
    help?: Help,
    placeholder?: string,
    autofill?: "on" | false,
    id?: string
}

export const Input = ( properties: Input ) => {
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
                        type={"text"}
                        className={ styles.input }
                        title={ properties.name[ 0 ].toUpperCase() + properties.name.slice( 1 ) }
                        id={ ( properties.id ) ? properties.id : [ properties.name, "identifier" ].join( "-" ) }
                        name={ properties.name }
                        autoComplete={ ( properties.autofill ) ? "on" : "off" }
                        autoFocus={ (properties.focus) ? properties.focus : false }
                        placeholder={ (properties.placeholder) ? properties.placeholder : properties.label }>
                        {/*  ...  */}
                    </input>
                </div>
                <Help text={ properties.help.text } />
            </div>
        </div>
    );
};

export interface Password {
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
export const Password = ( properties: Password ) => {
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
                        type={"password"}
                        className={ styles.input }
                        title={ properties.name[ 0 ].toUpperCase() + properties.name.slice( 1 ) }
                        id={ ( properties.id ) ? properties.id : [ properties.name, "identifier" ].join( "-" ) }
                        name={ properties.name }
                        autoComplete={ "new-password" }
                        autoFocus={ false }
                        placeholder={ (properties.placeholder) ? properties.placeholder : "Password" }>
                        {/*  ...  */}
                    </input>
                </div>
                <Help text={ properties.help.text }/>
            </div>
        </div>
    );
};

export interface Area {
    label: string,
    name: string,
    focus: boolean,
    help?: Help,
    placeholder?: string,
    stateful?: boolean,
    autofill?: boolean,
    id?: string
}

export const Area = ( properties: Area ) => {
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
                        rows={5}
                        placeholder={ (properties.placeholder) ? properties.placeholder : "Placeholder Text" }>
                        {/*  ...  */}
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
            <Input label={ "Field-1" } name={ "field-1" } autofill={ false } help={ { text: "Optional Help Context (1)" } } focus={ true }/>
            <Input label={ "Field-2" } name={ "field-2" } autofill={ false } help={ { text: "Optional Help Context (2)" } } focus={ false }/>
            <Password label={ "Password-Field" } name={ "password" } help={ { text: "Optional Help Context (3)" } }/>
            <Area label={ "Field-3" } name={ "field-3" } autofill={ false } help={ { text: "Optional Help Context (4)" } } focus={ false }/>
        </Suspense>
    );
};

export default Form;