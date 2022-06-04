import React from 'react';

import Theme from './../../themes/getStyle';
export default function ( {
                              theme,
                              type
                          } ) {
    return (
        <span className="data-type-label" { ...Theme( theme, 'data-type-label' ) }>
            { type }
        </span>
    );
}