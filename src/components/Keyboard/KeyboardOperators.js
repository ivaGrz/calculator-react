import React from 'react';

import Key from './Key/Key';
import './KeyboardOperators.css';

const keyboardOperators = (props) => {

    const keysOperators = ['+', '-', '*', '/'];
    
    return (
        <div className="operators">
            {keysOperators.map(key => {
                let styleActive = null;
                if (key === props.activeKey) {
                    styleActive = {color: 'black', backgroundColor: 'rgb(210, 150, 180)'};
                }
                return <Key key={key} styleChanged={styleActive} keyValue={key} clicked={props.keyClicked}/>    
            })} 
            <Key keyValue="=" clicked={props.equalClicked}/>           
        </div>


    );
}

export default keyboardOperators;