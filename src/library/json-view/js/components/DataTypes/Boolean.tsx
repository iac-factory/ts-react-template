import React from 'react';
import DataTypeLabel from './DataTypeLabel';

import Theme from './../../themes/getStyle';
export default function ( { properties = Object.create({}) } ) {
    const type_name = 'bool';

    return (
        <div {...Theme(properties?.theme, 'boolean')}>
            <DataTypeLabel type_name={ type_name } { ...properties } />
            { properties.value ? 'true' : 'false' }
        </div>
    );
}