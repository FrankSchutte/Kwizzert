import React from 'react';
import './CenterTextHZ.css';
import CenterText from './CenterText';

const CenterTextHZ = (props) => (
    <div className="content">
        <CenterText>
            {props.children}
        </CenterText>
    </div>
);

export default CenterTextHZ;