import React, { Component } from "react";
import HelloWorldService from "../Service/HelloWorldService";

class TotalEarnings extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      comments: "",
      topic: "React",
      totalEarnings: "",
    };
  }

    // Lifecycle method to watch for changes in props
    componentDidUpdate(prevProps) {
      // Check if the calculateEarnings prop has changed
      if (this.props.calculateEarnings && !prevProps.calculateEarnings) {
        this.calculateTotalEarnings(); // Call the calculation function
      }
    }
  

  calculateTotalEarnings = () => {
    HelloWorldService.executeGetHelloWorldTotalEarningsService()
      .then((response) => {
        console.log("response data ", response.data);
        this.setState({ totalEarnings: response.data });

        alert("The message is " + response.data);
      })
      .catch((error) => {
        console.error("Error fetching message:", error);
        alert("request failed in total earnings");
      });
  };

  render() {
    return (
      <div>
        <h1>Total Earnings is: {this.state.totalEarnings} minutes</h1>
        <div>the time saved is </div>
      </div>
    );
  }
}

export default TotalEarnings;
