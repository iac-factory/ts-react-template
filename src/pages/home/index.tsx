import React, { FormEventHandler, lazy, Suspense } from "react";
import type { PathLike } from "fs";

/***
 *
 * @param submission
 * @param identifier - Form HTML ID Tag
 * @constructor
 */
const Extractor = function ( submission: React.FormEvent<HTMLFormElement>, identifier: string ) {
    submission.preventDefault();

    const node = document.getElementById( identifier ) as HTMLFormElement;
    const fields: { assignment: string, type: string[], valid: () => ValidityState, value: () => { [ p: string ]: string } }[] = [];
    const instance = Object.create( {} );

    instance.count = 0;
    instance.fields = fields;

    for ( void 0; instance.count < node.elements.length; instance.count++ ) {
        const field: HTMLInputElement = node.elements.item( instance.count ) as HTMLInputElement;
        instance.fields.push( {
            [ field.name ?? field.id ]: {
                key: field.name ?? field.id,
                value: field.value
            }
        } );
    }

    const abstract = Object.create( {} );
    instance.fields.forEach( ( field ) => {
        for ( const [ key, kv ] of Object.entries( field ) ) {
            const assignment: { key: string, value: string } = kv as { key: string, value: string };

            Object.assign( abstract, { [ key ]: assignment.value } );
        }
    } );

    return {
        ...abstract, ...{
            api: {
                endpoint: node.action,
                method: node.method,
                type: node.encoding ?? node.enctype
            }
        }
    };
};

/***
 * Enums in TypeScript offer a certain level of nominal typing. Two enum types aren't equal if they differ by name. We can use this fact to provide nominal typing for types that are otherwise structurally compatible.
 */

type Unique<Generic extends string> = Omit<Generic & string, symbol>;

interface Properties {
    /*** HTML Form ID */
    id: Unique<string> & string;

    url: PathLike;

    method: string & "POST"
}

const Form = ( properties: Properties ) => {
    const Handler = ( event: React.FormEvent<HTMLFormElement> ) => Extractor( event, properties.id );
    const Invoker = async function () {
        const node = document.getElementById( properties.id ) as HTMLFormElement;
        node.addEventListener( ( "submit" ), async ( event ) => {
            event.preventDefault();
        } );
    };

    React.useEffect( () => {
        return ( () => void ( async () => Invoker() ) )();
    }, [] );

    return (
        <form
            action={ properties.url as string }
            method={ "POST" }
            id={ properties.id }
            onSubmit={ Handler }
        />
    );
};

export const Home = ( properties?: { name?: string } ) => {
    const Text = lazy( () => import("./../../components/text") );

    return (
        <Suspense fallback={ null }>
            <Text input={ properties.name ?? "Home" }/>
            <Form id={ "login-form" } url={ process.env[ "REACT_APP_API_ENDPOINT" ] + "/login" } method={"POST"}/>
        </Suspense>
    );
};

export default Home;