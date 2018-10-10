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
        decimalNum: false
    }

    numClickedHandler = (event) => {
        this.addCharacter(event.target.innerHTML);
    }
    
    addCharacter = (char) => {
        const numberString = this.state.numString;
        if (numberString.length < 6) {
            this.setState({ numString: numberString.concat(char) });
        }
    }

    dotClickedHandler = () => {
        if (!this.state.decimalNum) {
            const numberString = this.state.numString;
            this.setState({ 
                numString: numberString.concat('.'),
                decimalNum: true
            });
        }
    }

    operatorClickedHandler = (event) => {
        this.calculationHandler(event.target.innerHTML);
    }

    calculationHandler = (operator) => {
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
            decimalNum: false
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
                    decimalNum: false
                }, () => {
                    this.logNumbers();
                });
            }
        }
        this.logNumbers();
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
        let { numString, resultNum, calcOperator, decimalNum } = this.state;

        if (option === 'AC') {
            numString = '';
            resultNum = null;
            calcOperator = '';
            decimalNum = false;

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
            decimalNum
        })
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
            this.logNumbers();
        }
        else if (key === '.') {
            this.dotClickedHandler();
        }
        else if (key === 'Enter') {
            this.equalClickedHandler();
        }
        else if (key === 'Escape') {
            this.optionsHandler('AC');
        } 
        else if (key === '%') {
            this.optionsHandler(key);
        }
    }

    logNumbers = () => {
        console.log('resultNum: ',this.state.resultNum);
        console.log('numString: ', this.state.numString);
        console.log('calcOperator: ', this.state.calcOperator);
    }

    render() {  
        this.logNumbers();
        let numDisplay = 0;
        if (this.state.numString) {
            numDisplay = this.state.numString;
        } else if (this.state.resultNum) {
            numDisplay = this.state.resultNum;
        }
        if (('' + numDisplay).length > 6) {
            numDisplay = numDisplay.toExponential(1);
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