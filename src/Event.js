import React, {Component} from "react";


class Event extends Component {
    state = {
        event: {},
        collapsed: true
    }

    handleClick =()=>{
        this.setState({
            collapsed: !this.state.collapsed
        });
    }
    render (){
        const {event} = this.props;
        const {collapsed} = this.state;

    return (
        <div className='event'>
            <h2>
                {event.summary}
            </h2>
            <p className="location">
                {event.location}
            </p>
            <p className="start-date">
                {event.start.dateTime}
            </p>
            <button className={`details-button ${collapsed ? "Show Details" : "Hide Details"}-details`} 
					onClick={this.handleClick}>{collapsed ? "Show Details" : "Hide Details"}</button>
					
					{!collapsed &&
					<div className={`extra-details ${this.state.collapsed ? "hide" : "show"}`}>
                        <p className="event__end">{event.end.dateTime}</p>
                        <p className="event__description">{event.description}</p>
                        <p className="event__location">{event.location}</p>
                        <p className="event__calendarLink">{event.htmlLink}</p>
					<button className={`hide-details ${collapsed ? "Show Details" : "Hide Details"}-details`}
                    onClick={this.handleClick}>{collapsed ? "Show Details" : "Hide Details"}</button>
					</div>
					}
        
        </div>
        
     )}
}

export default Event;