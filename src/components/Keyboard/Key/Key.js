import React from 'react';

import './Key.css';

const key = (props) => {

    return (
        <button className={"key"} onClick={props.clicked} style={props.styleChanged}>{props.keyValue}</button>
    );
}

export default key;