import React from 'react';
import './Box.css';

const Box = (props) => {
    if (props.rating === undefined) {
        props.rating = 'rating_none';
    }

    return (
    <div className={props.rating}>
        {props.children}
    </div>
    )
};

export default Box;