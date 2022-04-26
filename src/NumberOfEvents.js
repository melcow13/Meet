import React, {Component} from "react";
import { ErrorAlert } from "./Alert";


class NumberOfEvents extends Component{
    state = {
        numberOfEvents: 32,
        errorText: ''
    };

    handleInputChanged = (event) => {
      const number = event.target.value;
      if (number < 1 || number > 32) {
        this.setState({
          numberOfEvents: number,
          errorText: 'Enter a number between 1 and 32.',
        });
      } else {
        this.setState({
          numberOfEvents: number,
          errorText: '',
        });
      }
      this.props.updateNumberOfEvents(event.target.value);
    }


      render(){
          return (
              <div className="NumberOfEvents">
                <p>Number of Events:</p> 
                
                <input
                type="number"
                className="numberOfEvents"
                value={this.state.numberOfEvents}
                onChange={this.handleInputChanged} />
                <ErrorAlert text={this.state.errorText} />
              </div>
          )
      }
}
export default NumberOfEvents;