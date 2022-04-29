import React, { Component } from 'react';
import './App.css';
import CitySearch from './CitySearch';
import EventList from './EventList';
import NumberOfEvents from './NumberOfEvents';
import EventGenre from './EventGenre';
import WelcomeScreen from './WelcomeScreen';
import { getEvents, extractLocations, checkToken, getAccessToken } from
'./api';
import './nprogress.css';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

class App extends Component {
  state={
    events: [],
    locations:[],
    numberOfEvents: 32,
    location: 'all',
    showWelcomeScreen: undefined,

  }

async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false :
    true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
      if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
      if (this.mounted) {
      this.setState({ events, locations: extractLocations(events) });
      }
  });
  }
}
  
  /*componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }*/

  componentWillUnmount(){
    this.mounted = false;
  }
  
  //function that count how many events each city has
  getData = () => {
    const {locations, events} = this.state;
    const data = locations.map((location)=>{
      const number = events.filter((event) => event.location === location).length
      const city = location.split(', ').shift()
      return {city, number};
    })
    return data;
  };

  updateNumberOfEvents = (numberOfEvents) => {
    this.setState({
      numberOfEvents
    }, this.updateEvents(this.state.location, numberOfEvents));
  };

  updateEvents = (location, eventCount) => {
    getEvents().then((events) => {
      const locationEvents =
        location === "all"
          ? events
          : events.filter((event) => event.location === location);
      if (this.mounted) {
        this.setState({
          events: locationEvents.slice(0, this.state.numberOfEvents),
          currentLocation: location,
          numberOfEvents: eventCount,
        });
      }
    });
  };

  render() {
    const { locations, events } = this.state;
    if (this.state.showWelcomeScreen === undefined) return <div
    className="App" />
    return (
      <div className="App">
        <h1>Meet App</h1>
        <h4>Choose your nearest city</h4>
        <CitySearch updateEvents={this.updateEvents} locations={locations} />
        <NumberOfEvents
          updateNumberOfEvents={this.updateNumberOfEvents}
        />       
         <h4>Events in each city</h4>
        <div className='data-vis-wrapper'>
          <EventGenre events={this.state.events} />
          <ResponsiveContainer height={400} >
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid />
              <XAxis type="category" dataKey="city" name="city" />
              <YAxis
                allowDecimals={false}
                type="number"
                dataKey="number"
                name="number of events"
              />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter data={this.getData()} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <EventList events={events} />
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen}
        getAccessToken={() => { getAccessToken() }} />
      </div>
    );
  }
}

export default App;
