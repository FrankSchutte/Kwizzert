import React from 'react';
import './CenterText.css';

const CenterText = (props) => (
    <div id="text_center">
        <div id="display_inline">
            {props.children}
        </div>
    </div>
);

export default CenterText;