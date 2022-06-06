import React from 'react';
import DataTypeLabel from './DataTypeLabel';

import Theme from './../../themes/getStyle';
export default function ({ properties }) {
    const type_name = 'date';
    const display_options = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };

    return (
        <div {...Theme(properties?.theme, 'date')}>
            <DataTypeLabel type_name={type_name} {...properties} />
            <span className="date-value" {...Theme(properties.theme, 'date-value')}>
                    {properties.value.toLocaleTimeString('en-us', display_options)}
                </span>
        </div>
    );
}