import React from 'react';

import Key from './Key/Key';
import './KeyboardNum.css';

const keyboardNum = (props) => {

    const keysNum = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    
    return (
        <div className="keyboard-num">
            {keysNum.map(key => {
                let styleZero = null;
                if (key === '0') {
                    styleZero = {width: '130px', borderRadius: '30px/50%'};
                }
                let styleActive = null;
                if (key === props.activeKey) {
                    styleActive = {color: 'black', backgroundColor: 'rgb(90, 90, 90)'};
                }
                return <Key key={key} styleChanged={{...styleActive,...styleZero}} keyValue={key} clicked={props.numClicked}/>    
            })}
            <Key keyValue="." clicked={props.dotClicked}/>    
        </div>
    );
}

export default keyboardNum;