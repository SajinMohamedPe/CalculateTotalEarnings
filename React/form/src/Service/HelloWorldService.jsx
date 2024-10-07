import axios from "axios";

const GET_API_URL = "http://localhost:8080/get-hello-world";
const GET_TOTAL_EARNINGS = "http://localhost:8080/get-hello-world-total-earnings";
const POST_API_URL = "http://localhost:8080/update-hello-world";
const POST_API_URL_FOR_GET_DATA = "http://localhost:8080/get-hello-world-data";

class HelloWorldService {
  executeGetHelloWorldService() {
    return axios.get(GET_API_URL);
  }

  executeGetHelloWorldTotalEarningsService(startofWeek, endOfWeek) {
    console.log("start and end of week", startofWeek, endOfWeek);
    // console.log("get total earnings service");
    return axios.post(GET_TOTAL_EARNINGS, {
        payPerHour: 12.7,
        startOfWeek: startofWeek,
        endOfWeek: endOfWeek,
    }).then((response) => {
        console.log("total earnings response",response.data);
        return response.data;
    }
    ).catch((error) => {
        console.log(error);
        throw error;
    });
  }

  executeGetHelloWorldService(day, month, year) {
    console.log("day in service  ", day, month, year);
    // return axios.get(GET_API_URL);
    return axios
        .post(POST_API_URL_FOR_GET_DATA, {
            message: "Hello World!!!",
            day: day,
            month: month,
            year: year,
        }).then((response) => {
            // console.log(response);
            console.log("response data ", response.data);
            return response.data;
        }).catch((error) => {          
            console.log(error);
            throw error;});
  }

  executePostHelloWorldService(number, year, month, day, startTime, endTime, lunch) {
    // console.log("year ", year);
    return axios
      .post(POST_API_URL, {
        message: "Hello World",
        number: number,
        year: year,
        month: month,
        day: day,
        startTime: startTime,
        endTime: endTime,
        lunch: lunch,
      })
      .then((response) => {
        // Log and return the response data
         console.log(response);
        // console.log("response data start ", response.data.startTime);
        return response.data; // Return the data here
      })
      .catch((error) => {
        console.log(error);
        // Re-throw the error if necessary
        throw error;
      });
  }
}

export default new HelloWorldService();
