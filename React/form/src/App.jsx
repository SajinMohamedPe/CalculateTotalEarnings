import React, { Component } from "react";
import './App.css';
import Form from './Components/Form';
import DateComponent from "./Components/DateComponent";
import TotalEarnings from "./Components/TotalEarnings";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: '',
      month: '',
      day: '',
      calculateEarnings: false,
      startOfWeek: '',
      endOfWeek: '',
      dayOfWeek: '',
    };
  }

  updateYear = (year) => {
    console.log("year from app ", year);
    this.setState({ year });
  };

  updateMonth = (month) => {
    this.setState({ month });
  };

  updateDay = (day) => {
    this.setState({ day });
  };

  updateStartOfWeek = (startOfWeek) => {
    console.log("startOfWeek from app ", startOfWeek);
    this.setState({ startOfWeek });
  };

  updateEndOfWeek = (endOfWeek) => {
    console.log("endOfWeek from app ", endOfWeek);
    this.setState({ endOfWeek });
  };
  
  updateDayOfWeek = (dayOfWeek) => {
    // console.log("day of week from app ", dayOfWeek);
    this.setState({ dayOfWeek });
  };
  handleFormSubmit = () => {
    this.setState({ calculateEarnings: true }, () => {
      // Reset to false after earnings calculation is triggered
      setTimeout(() => this.setState({ calculateEarnings: false }), 100);
    });
  };

  setInitialDate = (year, month, day) => {
    this.setState({ year, month, day });
  }

  render() {
    const { year, month, day, calculateEarnings } = this.state;

    return (
      <div className="App">
        {/* Container for DateComponent and Form side-by-side */}
        <div className="container">
          <DateComponent
            setInitialDate={this.setInitialDate}
            year={year}
            month={month}
            day={day}
            updateYear={this.updateYear}
            updateMonth={this.updateMonth}
            updateDay={this.updateDay}
            updateStartOfWeek={this.updateStartOfWeek}
            updateEndOfWeek={this.updateEndOfWeek}
            updateDayOfWeek={this.updateDayOfWeek}
          />

          <Form
            year={year}
            month={month}
            day={day}
            onFormSubmit={this.handleFormSubmit}
          />
        </div>

        {/* TotalEarnings component below, centered */}
        <div className="earnings-container">
          <TotalEarnings calculateEarnings={calculateEarnings} 
          startOfWeek={this.state.startOfWeek}
          endOfWeek={this.state.endOfWeek}
          dayOfWeek={this.state.dayOfWeek}/>
          
        </div>
      </div>
    );
  }
}

export default App;
