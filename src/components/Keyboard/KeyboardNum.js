import React from 'react';

import Key from './Key/Key';
import './KeyboardNum.css';

const keyboardNum = (props) => {

    const keysNum = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    
    return (
        <div className="keyboard-num">
            {keysNum.map(key => {
                let styleActive = null;
                if (key === '0') {
                    styleActive = {width: '130px', borderRadius: '30px/50%'};
                }
                return <Key key={key} styleChanged={styleActive} keyValue={key} clicked={props.numClicked}/>    
            })}
            <Key keyValue="." clicked={props.dotClicked}/>    
        </div>
    );
}

export default keyboardNum;