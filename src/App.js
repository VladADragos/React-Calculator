import React, { Component } from "react";
import { Buttons } from "./components/Buttons";
import "./style/css/main.css";
import { Input } from "./components/Input";
import { Clear } from "./components/Clear";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ""
    };
  }

  isValidInput = input => {
    if (
      !isNaN(input) ||
      input === "/" ||
      input === "*" ||
      input === "+" ||
      input === "-" ||
      input === "."
    ) {
      console.log("Is Valid")
      return true;
    } else {
      console.log("Is Not Valid")
      return false;
    }
  };

  addToInput = e => {
    let value = e.target.value;
    if (this.isValidInput(value)) {
      if (value === "=") {
        this.setState({ input: eval(this.state.input) });
      }else {
        this.setState({ input: this.state.input + value });
        if(e !== undefined){
          e.target.blur();
        }
      }
    }  
  };
  clear = (e) => {
    this.setState({ input: "" });
    
    if(e !== undefined){
      e.target.blur();
    }
  };
  enter = e => {
    try {
      this.setState({ input: eval(this.state.input) });
    } catch (err) {
      this.setState({ input: "syntax error" });
      setTimeout(this.clear, 2000);
    }
    if(e !== undefined){
      e.target.blur();
    }
    
  };
  change = event => {
    //let input = e.target.keyCode;
    console.log(event.target.value);
    
      
      this.setState({ input: event.target.value });
    
      //this.setState({ input: e.target.value });
    
  };
  gobal = e => {
    if (e.keyCode === 13) {
      e.target.value = "=";
      this.addToInput(e);
    }
  };
  handleKeyboardEnter=(event)=>{
    
    if(event.key==="Enter"){
      this.enter(event);
    } 
  }
  render() {

    return (
      <div className="calculator-container">
        <div className="calculator">
          <Input input={this.state.input} onChange={this.change} handleKeyboardEnter={this.handleKeyboardEnter}/>
          <Buttons handleClick={this.addToInput} handleEnter={this.enter} />
          <Clear handleClick={this.clear} />
        </div>
      </div>
    );
  }
}

export default App;
