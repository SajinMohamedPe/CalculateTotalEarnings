import React, { Component } from "react";
import HelloWorldService from "../Service/HelloWorldService";

class Form extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      comments: "",
      topic: "React",
      postResponse: "",
      startTime: "13:00", // to be changed
      endTime: "18:00", // to be changed
      year: "",
      month: "",
      day: "",
      lunch: "60", // to be changed
      totalWorkTime: "",
    };
  }

  handleStartTimeChange = (event) => {
    this.setState({ startTime: event.target.value });
  };

  handleEndTimeChange = (event) => {
    this.setState({ endTime: event.target.value });
  }

  handleTopicChange = (event) => {
    this.setState({ topic: event.target.value})
  }

  handleLunchChange = (event) => {
    this.setState({ lunch: event.target.value})
  }

  calculateTimeDifference = (startTime, endTime) => {
    const [startHour, startMinutes] = startTime.split(':').map(Number);
    const [endHour, endMinutes] = endTime.split(':').map(Number);
    
    const startTotalMinutes = startHour * 60 + startMinutes;
    const endTotalMinutes = endHour * 60 + endMinutes;

    let timeDifference = endTotalMinutes - startTotalMinutes;
    if (timeDifference < 0) {
      timeDifference += 24 * 60;
    }
    return timeDifference;
  }

  handleSubmitForm = (event) => {
    const { year, month, day } = this.props;
    console.log('Year:', year, 'Month:', month, 'Day:', day);
    // alert(`${this.state.name} ${this.state.comments} ${this.state.topic}`);
    event.preventDefault();
    const timeDifference = this.calculateTimeDifference(this.state.startTime, this.state.endTime);
    // console.log('Time difference:', timeDifference);
    HelloWorldService.executePostHelloWorldService(12, year, month, day, this.state.startTime, this.state.endTime, this.state.lunch) 
      .then(responseData => {
        console.log('Response data:', responseData);
        console.log('Total work time:', responseData.totalWorkTime);
      
        this.setState({ totalWorkTime: responseData.totalWorkTime });
        this.props.onFormSubmit();
    })
      .catch(error => console.error('Error posting message:', error));
    
  }

  render() {
    const { year, month, day } = this.props;
    return (
      <form onSubmit={ this.handleSubmitForm }>
        <div>
          <h1>Form Component</h1>
        <div>
          <p>Date from DateComponent: {year} - {month} - {day}</p>
        </div>
          <label>Start Time:</label>
          <input
            type="time"
            id="start-time"
            name="start-time"
            value={this.state.startTime}
            onChange={this.handleStartTimeChange}
          />
        </div>
        <div>
          <label>End Time:</label>
          <input
            type="time" 
            id="end-time"
            name="end-time"
            value={this.state.endTime}
            onChange={this.handleEndTimeChange}/>
        </div>
        <div>
          <label>Lunch Time:</label>
          <input
            type="integer" 
            id="lunch-time"
            name="-lunch-time"
            value={this.state.lunch}
            onChange={this.handleLunchChange}/>
        </div>
        <button type="submit" style={{ marginTop: '20px' }}>Submit</button>
       
        
        <div>the response from form is {this.state.postResponse} minutes</div>
        <div>the time saved is </div>
      </form>
      
    );
  }
}

export default Form;
