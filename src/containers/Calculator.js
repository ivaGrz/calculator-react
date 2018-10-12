import React, { Component } from 'react';

import Display from '../components/Display/Display';
import KeyboardNum from '../components/Keyboard/KeyboardNum';
import KeyboardOperators from '../components/Keyboard/KeyboardOperators';
import KeyboardOptions from '../components/Keyboard/KeyboardOptions';
import './Calculator.css';

class Calculator extends Component {

    state = {
        numString: '',
        resultNum: null,
        calcOperator: '',
        decimalNumInput: false
    }

    numClickedHandler = (event) => {
        this.addCharacter(event.target.innerHTML);
    }
    
    addCharacter = (char) => {
        let numberString = this.state.numString;
        if (numberString.length < 7) {
            if (numberString === '0' && char !== '0' ) {
                numberString = char;
            } else if (numberString !== '0') {
                numberString = numberString.concat(char);
            }
            this.setState({ numString: numberString });
        }
    }

    dotClickedHandler = () => {
        if (!this.state.decimalNumInput && this.state.numString.length < 6) {
            let numberString = this.state.numString;
            if (numberString) {
                numberString = numberString.concat('.')
            } else {
                numberString = '0.'
            }
            this.setState({ 
                numString: numberString,
                decimalNumInput: true
            });
        }
    }

    operatorClickedHandler = (event) => {
        this.calculationHandler(event.target.innerHTML);
    }

    calculationHandler = (operator) => {
        console.log(operator);
        let {numString, resultNum, calcOperator} = this.state;
        let secondNum;

        if (typeof resultNum === 'number' && calcOperator && numString) {
            secondNum = parseFloat(numString);
            resultNum = this.calcResult(resultNum, secondNum, calcOperator);
            calcOperator = operator;

        } else if (typeof resultNum === 'number' && !numString) {
            calcOperator = operator;

        } else if (!calcOperator && numString) {
            resultNum = parseFloat(numString);
            calcOperator = operator;
        }

        this.setState({
            numString: '',
            resultNum,
            calcOperator,
            decimalNumInput: false
        });
    }

    equalClickedHandler = () => {
        let {numString, resultNum, calcOperator} = this.state;
        let secondNum;

        if (calcOperator && numString) {
            secondNum = parseFloat(numString);
            if (typeof resultNum === 'number' && typeof secondNum === 'number') {
                resultNum = this.calcResult(resultNum, secondNum, calcOperator);
                this.setState({
                    numString: '',
                    resultNum,
                    calcOperator: '',
                    decimalNumInput: false
                });
            }
        }
    }

    calcResult = (a, b, operator) => {
        let res;
        if (operator === '+') {
            res = a + b;
        } else if (operator === '-') {
            res = a - b;
        } else if (operator === '*') {
            res = a * b;
        } else if (operator === '/') {
            res = a / b;
        }
        return res;
    };

    optionClickedHandler = (event) => {
        const option = event.target.innerHTML;
        this.optionsHandler(option);
    }

    optionsHandler = (option) => {
        let { numString, resultNum, calcOperator, decimalNumInput } = this.state;

        if (option === 'AC') {
            numString = '';
            resultNum = null;
            calcOperator = '';
            decimalNumInput = false;

        } else if (option === '+/-') {
            if (numString) {
                numString = this.changeSign(numString);
            } else {
                resultNum = parseFloat(this.changeSign('' + resultNum));
            }

        } else if (option === '%') {
            let displayNum;
            if (numString) {
                displayNum = parseFloat(this.state.numString);
                numString = '';
            } else {
                displayNum = resultNum;
            }
            resultNum = displayNum * 0.01;
        }

        this.setState({
            numString,
            resultNum,
            calcOperator,
            decimalNumInput
        });
    }

    changeSign = (number) => {
        if (number.charAt(0) === '-') {
            return number.substring(1);
        } else {
            return '-' + number;
        }
    }

    keyDownHandler = (event) => {
        const key = event.key;
        if (!isNaN(parseInt(key))) {
            this.addCharacter(key);
        }
        else if (key === '+' || key === '-' || key === '*' || key === '/') {
            this.calculationHandler(key);
        }
        else if (key === '.') {
            this.dotClickedHandler();
        }
        else if (key === 'Enter') {
            event.preventDefault();
            this.equalClickedHandler();
        }
        else if (key === 'Escape') {
            this.optionsHandler('AC');
        } 
        else if (key === '%') {
            this.optionsHandler(key);
        }
    }

    logState = () => {
        console.log('STATE: ', this.state);
    }

    render() {  
        this.logState();
        let numDisplay = 0;
        if (this.state.numString) {
            numDisplay = this.state.numString;
        } else if (this.state.resultNum) {
            numDisplay = this.state.resultNum;
        }

        if (('' + numDisplay).length > 7) {
            if (Math.round(numDisplay) < 10000000 && numDisplay > 0.000001) {
                let whole = (Math.floor(numDisplay)).toString();
                numDisplay = parseFloat(numDisplay.toFixed(7 - (whole).length));
            } else {
                numDisplay = numDisplay.toExponential(2);
            }
        }

        return (
            <div className="background" onKeyDown={this.keyDownHandler} tabIndex="0">
                <div className="calculator" >
                    <Display display={numDisplay} />
                    <KeyboardOptions keyClicked={this.optionClickedHandler}/>
                    <KeyboardOperators activeKey={this.state.calcOperator} keyClicked={this.operatorClickedHandler} equalClicked={this.equalClickedHandler}/>
                    <KeyboardNum activeKey={this.state.numString.charAt(this.state.numString.length - 1)} numClicked={this.numClickedHandler} dotClicked={this.dotClickedHandler}/>
                </div>
            </div>
        );
    }
}

export default Calculator;