import React, { Component } from "react";

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedYear: "2024",    // Initial selected year
      selectedMonth: "1",      // Initial selected month (January)
      selectedDay: "1",        // Initial selected day
    };
  }

  // Function to check leap year
  isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  // Function to get the number of days based on selected month and year
  getDaysInMonth = (year, month) => {
    switch (month) {
      case "1": // January
      case "3": // March
      case "5": // May
      case "7": // July
      case "8": // August
      case "10": // October
      case "12": // December
        return 31;
      case "4": // April
      case "6": // June
      case "9": // September
      case "11": // November
        return 30;
      case "2": // February
        return this.isLeapYear(year) ? 29 : 28;
      default:
        return 31;
    }
  };

  handleYearChange = (event) => {
    this.setState({ selectedYear: event.target.value });
  };

  handleMonthChange = (event) => {
    this.setState({ selectedMonth: event.target.value });
  };

  handleDayChange = (event) => {
    this.setState({ selectedDay: event.target.value });
  };

  render() {
    const { selectedYear, selectedMonth, selectedDay } = this.state;

    // Get the number of days for the current year and month
    const daysInMonth = this.getDaysInMonth(parseInt(selectedYear), selectedMonth);

    return (
      <div>
        {/* Year Dropdown */}
        <div>
          <label>Select Year: </label>
          <select value={selectedYear} onChange={this.handleYearChange}>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>
        </div>

        {/* Month Dropdown */}
        <div>
          <label>Select Month: </label>
          <select value={selectedMonth} onChange={this.handleMonthChange}>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>

        {/* Days Dropdown */}
        <div>
          <label>Select Day: </label>
          <select value={selectedDay} onChange={this.handleDayChange}>
            {[...Array(daysInMonth)].map((_, day) => (
              <option key={day + 1} value={day + 1}>
                {day + 1}
              </option>
            ))}
          </select>
        </div>

        {/* Display Selected Date */}
        <div>
          Selected Date: {selectedYear}-{selectedMonth}-{selectedDay}
        </div>
      </div>
    );
  }
}

export default DatePicker;
