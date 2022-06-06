import React from 'react';
import DataTypeLabel from './DataTypeLabel';

import Theme from './../../themes/getStyle';

export default function ( properties ) {
    const type_name = 'integer';
    return (
        <div {...Theme(properties?.theme, 'integer')}>
            <DataTypeLabel type_name={type_name} />
            {properties.value}
        </div>
    );
}