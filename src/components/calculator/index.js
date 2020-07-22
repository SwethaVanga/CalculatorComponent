import React, { Component } from "react";
import "./index.css";

const operatorToFunction = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b
}

const isNumber = (value) => {
  return typeof value === 'number';
}

export default class Calculator extends Component {

  state={
    operator: '+',
    first: false,
    second: false,
    result: false,
    operationCounter: 0
  }
  
  doOperation = () => {
    const {first, second, operator} = this.state
    if(isNumber(first) && isNumber(second)){
      const operation = operatorToFunction[operator]
      this.increaseCounter()
      const result = operation(first, second)
      this.updateResult(result)
    }   
   }
   
    updateResult = (result) => {
     this.setState({result})
   }

    increaseCounter = () => {
     const newCount = this.state.operationCounter + 1
     this.setState({operationCounter: newCount})
   }

    setOperatorDo = (newOperator) => {
      if(this.state.first && this.state.second){
        this.setState({operator: newOperator}, () => {
          this.doOperation()
        })
      }
   }

    handleChange = (e, name) => {
      this.setState({ [name]: parseInt(e.target.value) });
      // (e) => this.setState(parseInt(e.target.value))
    }

    resetAll = () => {
      this.setState({
        first: false,
        second: false,
        operator : '+',
        result: false,
        operationCounter: 0
      
      })
    }
 
  render() { 
    return (
      <div className="layout-column align-items-center">
        <div data-testid="total-operations" 
             className="pt-50 total-operations">Total operations perfomed: {this.state.operationCounter}</div>
        <div className="card">
          <section className="card-text">
            <div className="layout-row justify-content-around align-items-center mt-40">
              <input type="number" 
                    className="ml-3 mr-3" 
                    data-testid="app-input1" 
                    autoComplete="off" 
                    placeholder="Eg: 1"
                    name="input1" 
                    value={this.state.first} 
                    onChange={(e) => this.handleChange(e, 'first')}/>
              <label className="ml-2 mr-2 symbol text-center" 
                    data-testid="selected-operator">{this.state.operator}</label>
              <input type="number"
                    data-testid="app-input2"
                    autoComplete="off" 
                    className="ml-3 mr-3"
                    placeholder="Eg: 2" 
                    value={this.state.second} 
                    onChange={(e) => this.handleChange(e, 'second')}/>
            </div>

            <div className="layout-row justify-content-around mt-30">
              <button className="operationFont" 
                      type="submit" 
                      data-testid="addButton"
                      onClick={() => this.setOperatorDo('+')} >+</button>
              <button className="operationFont"
                      type="submit"
                      data-testid="subtractButton" 
                      onClick={() => this.setOperatorDo('-')} >-</button>
              <button className="operationFont"
                      type="submit" 
                      data-testid="multiplyButton"
                      onClick={() => this.setOperatorDo('*')} >*</button>
              <button className="operationFont" 
                      type="submit"
                      data-testid="divideButton" 
                      onClick={() => this.setOperatorDo('/')} >/</button>
            </div>

            <div className="layout-row justify-content-between align-items-center mt-30">
              <button type="reset" 
                      data-testid="resetButton"
                      className="outline danger" 
                      onClick={() => this.resetAll()}>Reset</button>
              {isNumber(this.state.result) &&
                <div className="layout-row justify-content-center align-items-center result-container">
                  <div data-testid="result" 
                       className="result-value ma-0 slide-up-fade-in">Result: {this.state.result}</div>
                </div>
              }
            </div>
          </section>
        </div>
      </div>
    );
  }
}