import React from 'react';
import './Box.css';

const Box = (props) => (
    <div id="box_wrapper">
        {props.children}
    </div>
);

export default Box;