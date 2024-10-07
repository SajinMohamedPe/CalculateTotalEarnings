import { Component } from "react";
import HelloWorldService from "../Service/HelloWorldService";

class DateComponent extends Component {
  constructor(props) {
    // what if no props?
    super(props);
    this.state = {
      year: "2024",
      month: "September",
      day: "1",
      count: 0,
      message: "",
      yearInDB: "",
      monthInDB: "",
      dayInDB: "",
      startTimeInDB: "",
      endTimeInDB: "",
      lunchInDB: "",
      totalWorkTimeInDB: "",
    };
  }

  isleapyear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  getDaysInMonth = (year, month) => {
    switch (month) {
      case "January":
      case "March":
      case "May":
      case "July":
      case "August":
      case "October":
      case "December":
        return 31;
      case "April":
      case "June":
      case "September":
      case "November":
        return 30;
      case "February":
        return this.isleapyear(year) ? 29 : 28;
    }
  };

  componentDidMount() { 
    this.props.setInitialDate(this.state.year, this.state.month, this.state.day);
  }
    
  handleYearChange = (event) => {
    const year = event.target.value;
    console.log("year from date component ", { year: event.target.value });
    this.setState({year: event.target.value});
    this.props.updateYear(year);
  };

  getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    const dayOfWeek = date.getDay();

    const daysToSaturday = (dayOfWeek + 1) % 7;
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - daysToSaturday);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    return {
        date: date.toDateString(),
        dayOfWeek,
        startOfWeek: startOfWeek.toDateString(),
        endOfWeek: endOfWeek.toDateString(),
    };
  }

  handleMonthChange = (event) => {
    const month = event.target.value;
    this.setState({month: event.target.value});
    this.props.updateMonth(month);    
  };

  handleDayChange = (event) => {
    const day = event.target.value;
    console.log("day from date component on day change", { day: event.target.value });
    this.setState({day: event.target.value});
    this.props.updateDay(day);
    

    HelloWorldService.executeGetHelloWorldService(day, this.props.month, this.props.year)
      .then(response => {
        // const { yearOfCentury, monthOfYear, dayOfMonth } = response;

        this.setState(
            { 
                yearInDB: response.yearOfCentury,
                monthInDB: response.monthOfYear,
                dayInDB: response.dayOfMonth,
                startTimeInDB: response.startTime,
                endTimeInDB: response.endTime,
                lunchInDB: response.lunch,
                totalWorkTimeInDB: response.timeDifference
            }
        );
        console.log("response month of year ", response.timeDifference);
      });

      const selectedDate = `${this.state.year}-${this.getMonthNumber(this.state.month)}-${this.getFormattedDay(day)}`;
      const weekInfo = this.getDayOfWeek(selectedDate);
      this.props.updateStartOfWeek(weekInfo.startOfWeek);
      this.props.updateEndOfWeek(weekInfo.endOfWeek);
      this.props.updateDayOfWeek(weekInfo.date);
      console.log("week info ", weekInfo);
  };

  handleSubmitClick = () => {
    this.setState({ count: this.state.count + 1 });
    alert(`The date is ${this.props.year} ${this.props.month} ${this.props.day} ${this.state.count}`);
    HelloWorldService.executePostHelloWorldService(this.state.count, this.props.year, this.props.month, this.props.day)
      .then(response => {
        // console.log("response data ", response.data);
        this.setState({ message: response.data });
        if (response.data.status === "success") {
          alert("The message is " + response.data.message);
        } else {
          alert("request failed in date component");
        }
      }).catch(error => {
        console.error('Error fetching message:', error);
      });
  };

  getMonthNumber = (monthName) => {
    const months = {
      "January": "01",
      "February": "02",
      "March": "03",
      "April": "04",
      "May": "05",
      "June": "06",
      "July": "07",
      "August": "08",
      "September": "09",
      "October": "10",
      "November": "11",
      "December": "12",
    };
    return months[monthName] || "01"; // Default to January if not found
  };

  getFormattedDay = (day) => {
    return day < 10 ? `0${day}` : day
}

  render() {
    const { year, month, day } = this.state;
    
    console.log("dayyyyy", day)
    const daysInMonth = this.getDaysInMonth(year, month);
    // console.log("days in month ", daysInMonth);
    const selectedDate = `${year}-${this.getMonthNumber(month)}-${this.getFormattedDay(day)}`;
    console.log("selected date ", selectedDate);
    // const selectedDate = "2024-06-25";  // Example: June 25, 2024
    const formattedDate = this.getDayOfWeek(selectedDate);
    // this.props.upda
    // console.log(`The day of the week for ${selectedDate} is: ${formattedDate.dayOfWeek}`);
    // console.log(`The week starts on: ${formattedDate.startOfWeek}`);
    // console.log(`The week ends on: ${formattedDate.endOfWeek}`); $# commenting for now

    return (
      <div>
        <h1>Date Component</h1>
        <div>
          <label>Year: </label>
          <select value={this.state.year} onChange={this.handleYearChange}>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
          </select>
        </div>
        <div>
          <label>Month: </label>
          <select value={this.state.month} onChange={this.handleMonthChange}>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </div>
        <div>
          <label>Day</label>
          <select value={this.state.day} onChange={this.handleDayChange}>
            {[...Array(daysInMonth)].map((_, day) => (
              <option key={day + 1} value={day + 1}>
                {day + 1}
              </option>
            ))}
          </select>
        </div>
            
        <div>
            {/* <button onClick={this.handleSubmitClick}>Submit</button> */}
        </div>
        

        {/* <div><p>The message is {this.state.yearInDB}</p></div>
        <div><p>The month of year is {this.state.monthInDB}</p></div>
        <div><p>The day of month is {this.state.dayInDB}</p></div>
        <div><p>The total hours worked is {this.state.totalWorkTimeInDB}</p></div>
        <div><p>The total amount earned is {this.state.totalWorkTimeInDB * 0.21166}</p></div> */}

        
      </div>
    );
  }
}

export default DateComponent;
