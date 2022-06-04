import React from 'react';
import DataTypeLabel from './DataTypeLabel';

import Theme from './../../themes/getStyle';

export default function ({ properties }) {
    const type_name = 'regexp';
    return (
        <div {...Theme(properties.theme, 'regexp')}>
            <DataTypeLabel type_name={type_name} {...properties} />
            {properties.value.toString()}
        </div>
    );
}