import React from 'react';
import {shallow} from 'enzyme';
import NumberOfEvents from '../NumberOfEvents'

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsWrapper;
    beforeAll(() => {
    NumberOfEventsWrapper= shallow(<NumberOfEvents />);
    });
    test('renders number input', () => {
        expect(NumberOfEventsWrapper.find('.numberOfEvents')).toHaveLength(1);
      });
    test('change state when number is input',()=>{
        NumberOfEventsWrapper.setState({ numberOfEvents: "32" });
        NumberOfEventsWrapper.find(".numberOfEvents").simulate("change", {
      target: { value: "10" },
    });
    expect(NumberOfEventsWrapper.state("numberOfEvents")).toEqual("10");
    })
  });