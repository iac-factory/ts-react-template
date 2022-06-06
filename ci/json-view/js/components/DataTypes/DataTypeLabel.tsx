import React from 'react';

import Theme from './../../themes/getStyle';
export default function ( properties: Properties ) {
    return (
        <span className="data-type-label" { ...Theme( properties.theme, 'data-type-label' ) }>
            { properties.type }
        </span>
    );
}

type Properties = any;