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
      return true;
    } else return false;
  };

  addToInput = e => {
    let value = e.target.value;
    if (this.isValidInput(value)) {
      if (this.state.input.length > 4 && this.state.input !== "syntax error") {
        this.setState({ input: "To long calculation" });
        setTimeout(this.clear, 2000);
      } else {
        this.setState({ input: this.state.input + value });
        e.target.blur();
      }
    } else if (value === "=") {
      this.setState({ input: eval(this.state.input) });
    }
  };
  clear = () => {
    this.setState({ input: "" });
    console.log(this.isValidInput());
  };
  enter = e => {
    try {
      this.setState({ input: eval(this.state.input) });
    } catch (err) {
      this.setState({ input: "syntax error" });
      setTimeout(this.clear, 2000);
    }
  };
  change = e => {
    //let input = e.target.keyCode;
    console.log(e);
    if (this.isValidInput(e.target.value)) {
      this.setState({ input: e.target.value });
    }
  };
  gobal = e => {
    if (e.keyCode === 13) {
      e.target.value = "=";
      this.addToInput(e);
    }
  };

  render() {
    //window.addEventListener("keydown", this.gobal, false);
    return (
      <div className="calculator-container">
        <div className="calculator">
          <Input input={this.state.input} onChange={this.change} />
          <Buttons handleClick={this.addToInput} handleEnter={this.enter} />
          <Clear handleClick={this.clear} />
        </div>
      </div>
    );
  }
}

export default App;
