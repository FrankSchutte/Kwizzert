import React from 'react';
import './InputField.css';

const InputField = (props) => (
    <div className="inputField">
        {props.label}
        <input type="text" id={props.id}/>
    </div>
);

export default InputField;