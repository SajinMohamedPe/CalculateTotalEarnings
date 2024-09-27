import React, { Component } from "react";
import './App.css';
import Form from './Components/Form';
import HelloWorldComponent from "./Components/HelloWorldComponent";
import DatePicker from "./Components/DatePicker";
import DateComponent from "./Components/DateComponent";
import TotalEarnings from "./Components/TotalEarnings";

class App extends Component {
  constructor(props) {
    super(props);
    // Step 1: Shared state for the date
    this.state = {
      year: '',
      month: '',
      day: '',
      calculateEarnings: false,
    };
  }

  // updateDate = (year, month, day) => {
  //   this.setState({ year, month, day });
  // };

  updateYear = (year) => {
    this.setState({ year });
  };

  updateMonth = (month) => {
    this.setState({ month });
  };

  updateDay = (day) => {
    this.setState({ day });
  };

  handleFormSubmit = () => {
    this.setState({ calculateEarnings: true }, () => {
      // Reset to false after earnings calculation is triggered
      setTimeout(() => this.setState({ calculateEarnings: false }), 100);
    });
  };

  render() {
    const { year, month, day, calculateEarnings } = this.state;
    return (
      <div className="App">
        
        {/* <DateComponent /> */}
        {/* <HelloWorldComponent /> */}
        {/* <Form /> */}
        <DateComponent 
         year={year}
         month={month}
         day={day}
         updateYear={this.updateYear}
         updateMonth={this.updateMonth}
         updateDay={this.updateDay}
        />
        <Form 
          year={year}
          month={month}
          day={day}
          onFormSubmit={this.handleFormSubmit}
        />
        <TotalEarnings calculateEarnings={calculateEarnings} />
      </div>
    );
  }
}

export default App;
