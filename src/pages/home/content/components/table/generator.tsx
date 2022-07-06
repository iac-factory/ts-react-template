import React from "react";

import { All } from ".";
import { Check } from ".";
import { Row } from ".";
import { Header } from ".";
import { Cell } from ".";
import { Body } from ".";
import { Footer } from ".";

import { Hydration } from ".";

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

    const Context = ( properties: Input["Body"], element ) => {
        return properties.cells.map(
            ( property, index ) => {
                return (
                    <Cell identifier={ property.title + "-" + index } key={ index }>
                        {
                            element[ ( property.value ) ? property.value : property.title ]
                        }
                    </Cell>
                );
            }
        );
    };

    export const Content = ( data: Hydration.Type[], properties: Input["Body"] ) => {
        return (
            <Body scope={ "row" }>
                {
                    data.map( ( element, index ) => {
                        const { name } = element;
                        const { id } = element;
                        const { type } = { type: "checkbox" };

                        return (
                            <Row key={ index }>
                                <Check name={ name } id={ id } type={ type } checkbox={ [ properties.isChecked, properties.handleCheck as React.Dispatch<any> ] }/>
                                { Context( properties, element ) }
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
