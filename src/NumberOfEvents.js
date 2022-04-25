import React, {Component} from "react";
import { ErrorAlert } from "./Alert";


class NumberOfEvents extends Component{
    state = {
        numberOfEvents: 32,
        errorText: ''
    };

    handleInputChanged = (event) => {
        const value = event.target.value;
        if (value < 1 || value > 32) {
          this.setState({
            numberOfEvents: "",
            errorText: "Please enter a number between 1 and 32",
          });
        } else {
          this.setState({
            numberOfEvents: value,
            errorText: "",
          });
        }
      };
      render(){
          return (
              <div className="NumberOfEvents">
                <ErrorAlert text={this.state.errorText} />
                <p>Number of Events:</p>
                <input
                type="number"
                className="numberOfEvents"
                value={this.state.numberOfEvents}
                onChange={this.handleInputChanged} />
              </div>
          )
      }
}
export default NumberOfEvents;