import React from 'react';

import Key from './Key/Key';
import './KeyboardOptions.css';

const keyboardOptions = (props) => {

    const keysOptions = ['AC', '+/-', '%'];
    
    return (
        <div className="options">
            {keysOptions.map(key => (
                <Key key={key} keyValue={key} clicked={props.keyClicked}/>    
            ))} 
        </div>


    );
}

export default keyboardOptions;