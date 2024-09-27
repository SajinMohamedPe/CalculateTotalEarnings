import React, { Component } from 'react';
import HelloWorldService from '../Service/HelloWorldService';

class HelloWorldComponent extends Component {
    constructor() {
        super(); // Corrected: Call super() to inherit from React.Component
        this.state = {
            message: '',
            postResponse: ''
        };
    }

    componentDidMount() {
        HelloWorldService.executeGetHelloWorldService()
            .then(response => this.setState({ message: response.data }))
            .catch(error => console.error('Error fetching message:', error)); // Added error handling
        HelloWorldService.executePostHelloWorldService()
            .then(response => this.setState({ postResponse: response }))
            .catch(error => console.error('Error fetching message:', error));    
    }

    componentDidUpdate(prevProps, prevState) {
        // Log the state when it has been updated
        if (prevState.message !== this.state.message) {
            console.log('Updated message:', this.state.message);
        }
    }

    render() {
        return (
            <div>
                <h1>Hello World</h1>
                <div>the message is {this.state.message}</div>
                <div>The response received is {this.state.postResponse}</div>
            </div>
        );
    }
}

export default HelloWorldComponent;
