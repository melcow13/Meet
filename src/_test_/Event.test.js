import React from 'react';
import {shallow} from 'enzyme';
import { mockData } from '../mock-data';
mockData
import Event from '../Event';

describe("<Event /> component", () => {
    let EventWrapper;
  
    beforeAll(() => {
      EventWrapper = shallow(<Event event={mockData[1]} />);
    });
  
    test("render an event", () => {
      expect(EventWrapper.find(".event")).toHaveLength(1);
    });
  
    test("render the location", () => {
      expect(EventWrapper.find(".location")).toHaveLength(1);
    });
  
    test("render start date", () => {
      expect(EventWrapper.find(".start-date")).toHaveLength(1);
    });
    test("default-event details are collapsed", ()=> {
        expect(EventWrapper.state('collapsed')).toBe(true);
    });
    test("render details button", ()=>{
        expect(EventWrapper.find(".details-button")).toHaveLength(1);
    });
    test("render details when detail button is clicked", () =>{
        EventWrapper.setState({collapsed: true});
        EventWrapper.find('.details-button').simulate("click");
        expect(EventWrapper.state('collapsed')).toBe(false);
    });
    test("hide details when button is clicked", ()=>{
        EventWrapper.setState({collapsed: false});
        EventWrapper.find('.hide-details').simulate("click");
        expect(EventWrapper.state("collapsed")).toBe(true);
    });
  
});