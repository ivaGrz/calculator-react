import React from 'react';

import './Display.css';

const currentNumber = (props) => {

    return (
        <div className="display">{props.display}</div>
    );
}

export default currentNumber;