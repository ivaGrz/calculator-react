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
        secondNum: null,
        calcOperator: '',
        decimalNum: false
    }

    numClickedHandler = (event) => {
        if (this.state.numString.length < 6) {
            let updatedValue = this.state.numString;
            this.setState({ numString: updatedValue.concat(event.target.innerHTML) });
        }
    }

    dotClickedHandler = () => {
        if (!this.state.decimalNum) {
            let updatedValue = this.state.numString;
            this.setState({ 
                numString: updatedValue.concat('.'),
                decimalNum: true
            });
        }
    }

    operatorClickedHandler = (event) => {
        let operator = event.target.innerHTML;
        let numString = this.state.numString;

        if (typeof(this.state.resultNum) === 'number' && this.state.calcOperator && numString) {
            this.setState({ 
                secondNum: parseFloat(numString),
             }, () => {
                this.calcResult(this.state.resultNum, this.state.secondNum, this.state.calcOperator);
                this.setState({ calcOperator: operator });
            });

        } else if (typeof this.state.resultNum === 'number' && !numString) {
            this.setState({ calcOperator: operator });

        } else if (!this.state.calcOperator && numString) {
            this.setState({ 
                resultNum: parseFloat(numString),
                calcOperator: operator,
            });
        }
        this.setState({
            numString: '',
            decimalNum: false
        });
    }

    equalClickedHandler = () => {
        let numDisplay = this.state.numString;
        if (this.state.calcOperator) {
            this.setState({secondNum: parseFloat(numDisplay)}, () => {
                if (typeof this.state.resultNum === 'number' && typeof this.state.secondNum === 'number') {
                    this.calcResult(this.state.resultNum, this.state.secondNum, this.state.calcOperator);
                }
            });
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
        this.setState({
            resultNum: res, 
            secondNum: null,
            numString: '',
            calcOperator: '',
            decimalNum: false
        }, () => this.logNumbers());
    };

    logNumbers = () => {
        console.log('resultNum: ',this.state.resultNum);
        console.log('secondNum: ', this.state.secondNum);
        console.log('numString: ', this.state.numString);
        console.log('calcOperator: ', this.state.calcOperator);
    }

    optionClickedHandler = (event) => {
        let option = event.target.innerHTML;
        if (option === 'AC') {
            this.setState({
                resultNum: null, 
                secondNum: null,
                numString: '',
                calcOperator: '',
                decimalNum: false
            })
        }
        if (option === '+/-') {
            let number, updatedNumber;
            if (this.state.numString) {
                number = this.state.numString;
                updatedNumber = this.changeSign(number);
                this.setState({ numString: updatedNumber});
            } else {
                number = '' + this.state.resultNum;
                updatedNumber = this.changeSign(number);
                this.setState({ resultNum: parseFloat(updatedNumber)});
            }
        }
        if (option === '%') {
            let displayNum;
            if (this.state.numString) {
                displayNum = parseFloat(this.state.numString);
                this.setState({ numString: '' });
            } else {
                displayNum = this.state.resultNum;
            }
            let percentageRes = displayNum * 0.01;
            this.setState({ resultNum: percentageRes });
        }
    }

    changeSign = (number) => {
        if (number.charAt(0) === '-') {
            return number.substring(1);
        } else {
            return '-' + number;
        }
    }

    render() {  
        
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
            <div className="calculator">
                <Display display={numDisplay} />
                <KeyboardOptions keyClicked={this.optionClickedHandler}/>
                <KeyboardOperators activeKey={this.state.calcOperator} keyClicked={this.operatorClickedHandler} equalClicked={this.equalClickedHandler}/>
                <KeyboardNum numClicked={this.numClickedHandler} dotClicked={this.dotClickedHandler}/>
            </div>
        );
    }
}

export default Calculator;