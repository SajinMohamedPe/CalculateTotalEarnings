import React, { Component } from "react";
import HelloWorldService from "../Service/HelloWorldService";

class TotalEarnings extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      comments: "",
      topic: "React",
      totalEarnings: "0",
      totalWorkTime: "0",
      totalEarningsForWeek: "0",
      totalTimeWorkedForWeek: "0",
    };
  }

    // Lifecycle method to watch for changes in props
    componentDidUpdate(prevProps) {
      // console.log("componentDidUpdate");
      // console.log("prevProps", prevProps);
      // Check if the calculateEarnings prop has changed
      if (this.props.calculateEarnings && !prevProps.calculateEarnings) {
        this.calculateTotalEarnings(); // Call the calculation function
      }
    }
  

  calculateTotalEarnings = () => {
    const { startOfWeek, endOfWeek } = this.props;
    HelloWorldService.executeGetHelloWorldTotalEarningsService(startOfWeek, endOfWeek)
      .then((response) => {
        console.log("response data from total earnings", response.data);
        this.setState({ totalEarnings: response.totalEarnings });
        this.setState({ totalWorkTime: response.totalWorkTime });
        this.setState({ totalEarningsForWeek: response.totalEarningsForWeek });
        this.setState({ totalTimeWorkedForWeek: response.totalHoursForWeek });

        // alert("The total earnings is " + this.state.totalEarnings); $# commenting for now
      })
      .catch((error) => {
        console.error("Error fetching message:", error);
        alert("request failed in total earnings");
      });
  };

  render() {
  
    const { dayOfWeek } = this.props;
    // console.log("startOfWeek from total earnings", startOfWeek);
    // console.log("endOfWeek from total earnings", endOfWeek);

    return (
      <div>
        <h1>Total Earnings is: €{this.state.totalEarnings}</h1>
        <div>The total hours worked is {this.state.totalWorkTime} hours</div>
        <div>The total earnings for the week is €{this.state.totalEarningsForWeek}</div>
        <div>The total hours worked for the week is {this.state.totalTimeWorkedForWeek} hours</div>
        <div>The day of week is {dayOfWeek}</div>
      </div>
    );
  }
}

export default TotalEarnings;
