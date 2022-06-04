import React from 'react';

import Theme from './../../themes/getStyle';
export default function ({ properties }) {
    return (
        <div {...Theme(properties?.theme, 'nan')}>
            NaN
        </div>
    );
}
