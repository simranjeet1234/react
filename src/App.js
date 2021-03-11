import React, { Component } from "react"

import './App.css';

class App extends Component{
  state = {
    userInput:"",
    Array:[],
  };

  clickHandler = (event) => {
    event.preventDefault();
    const split =this.state.userInput.split("-");
    this.setState((oldstate) => ({
      userInput:"",
      Array:[
        ...oldstate.Array,{fruit: split[0], quantity: split[1] }
      ],
    }));
  };

inputChangeHandler = (event) => {
  this.setState({userInput: event.target.value });
};

deleteFruit(fruit) {
  return () => {
    this.setState((oldState) => ({
      Array: oldState.Array.filter(
        (fruitItem) => fruitItem.fruit !== fruit
      ),
    }));
  };
}


  render() {
    return(
      <div className="app">
      <form onSubmit={this.clickHandler}>
        <input 
        type="text"
        onChange={this.inputChangeHandler}
            value={this.state.userInput}
        /><br/>
        <button>
          submit
        </button>
        </form>

        <table>
          {this.state.Array.map((fruit) => {
              return (
                <tr>
            <td>{fruit.fruit}</td>
            <td>{fruit.quantity}</td>
            <td> 
              <button onClick={this.deleteFruit(fruit.fruit)}> 
              delete
              </button>
            </td>
          </tr>

          );
          }
          )}
          
        </table>
      

      </div>
    );
  }
}
export default App;
