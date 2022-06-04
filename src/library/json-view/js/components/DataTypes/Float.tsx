import React from 'react';
import DataTypeLabel from './DataTypeLabel';

import Theme from './../../themes/getStyle';

export default function ( { properties } ) {
    const type_name = 'float';

    return (
        <div { ...Theme( properties?.theme, 'float' ) }>
            <DataTypeLabel type_name={ type_name } { ...properties } />
            { properties.value }
        </div>
    );
}