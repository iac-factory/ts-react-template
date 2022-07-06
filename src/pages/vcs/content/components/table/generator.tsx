import React from "react";

import { All } from ".";
import { Informational } from ".";
import { Check } from ".";
import { Row } from ".";
import { Header } from ".";
import { Cell } from ".";
import { Body } from ".";
import { Footer } from ".";

import type { Type } from ".";

type Data = Type.Enumeration;

/*** Complexity Here Cannot be Avoided without Excessive Module Separation */
export module Generator {
    export interface Input {
        Headers: { cells: { header: string }[], toolbar: () => { count: number; }, isAllChecked: boolean, handleCheckAll: React.Dispatch<boolean> };
        Body: { handleCheck: ( event: { target: React.HTMLAttributes<HTMLInputElement> & { checked: boolean } } ) => void, isChecked: string[], cells: { title: string, value?: string }[] };
        Footer: { cells: { header: string }[] };
    }

    export const Headers = ( properties: Input["Headers"] ) => {
        return (
            <Header scope={ "column" }>
                <Row>
                    <All isAllChecked={ properties.isAllChecked } handleCheckAll={ properties.handleCheckAll }/>
                    {
                        properties.cells.map( ( element, index ) => {
                            return (
                                <Cell key={ index }>
                                    {
                                        element.header
                                    }
                                </Cell>
                            );
                        } )
                    }
                </Row>
            </Header>
        );
    };

    const Context = ( properties: Input["Body"], element: Data ) => {
        return properties.cells.map(
            ( property, index ) => {
                return (
                    <Cell identifier={ property.title + "-" + index } key={ index }>
                        {
                            element[ "name" ]
                        }
                    </Cell>
                );
            }
        );
    };

    export const Content = ( data: Type.Enumeration[], properties: Input["Body"] ) => {
        return (
            <Body scope={ "row" }>
                {
                    data.map( ( element, index ) => {
                        const { name } = element;
                        const { type } = { type: "checkbox" };

                        return (
                            <Row key={ index }>
                                <Check name={ name } id={ String( element.id ) } type={ type } checkbox={ [ properties.isChecked, properties.handleCheck as React.Dispatch<any> ] }/>
                                { Context( properties, element ) }
                                <Informational isActive={ true } handleActive={ () => {
                                    console.log( data[ index ] );
                                } }/>
                            </Row>
                        );
                    } )
                }
            </Body>
        );
    };

    export const Pager = ( properties: Input["Footer"] ) => {
        return (
            <Footer>
                <Row>
                    {
                        properties.cells.map( ( element, index ) => {
                            return (
                                <Cell key={ index }>
                                    {
                                        element.header
                                    }
                                </Cell>
                            );
                        } )
                    }
                </Row>
            </Footer>
        );
    };
}
