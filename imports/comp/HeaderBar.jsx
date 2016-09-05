"use strict"

import React from 'react';

import { W3Comp, NavBar, NavItem, NavLink, DropList, ListItem } from 'w3-react';

/* data */
const lIndex = 3;
const data = [
    { _id : 'l1', title : 'Digital Logic Concept', url : '#l1'},
    { _id : 'l2', title : 'Combinatorial Logics', url : '#l2'},
    { _id : 'l3', title : 'Sequential Logics', url : '#l3'},
    { _id : 'l4', title : 'Finite State Machine', url : '#l4'},
    { _id : 'l5', title : 'Numbering Systems', url : '#l5'},
    { _id : 'l6', title : 'Popular Logic Modules', url : '#l6'},
    { _id : 'l7', title : 'Practical Design : 7-segment LED Controller', url : '#l7'}
  ];

export default class extends W3Comp {

  constructor (props) {
    super (props);

    this.state = {showDropList : false};

    this.bind('_toggleDropList');

  }

  render () {
    const _showDropList = this.state.showDropList ? {'w3-hide' : false} : {'w3-hide' : true};    
    const {hover, ...rest} = this.getProps();
    const _hover = {};
    if (hover) {
      _hover [`w3-hover-${hover}`] = true;      
    }   
    return (
      <header>
        <NavBar w3-black w3-left-align>
          <NavLink w3-black w3-opennav w3-right > <i className="fa fa-bars"></i> </NavLink>
          <NavLink w3x-cursor-pointer onClick={this._toggleDropList} > <span className="w3x-inline-block w3x-width-80"> Section {lIndex} </span> <i className="fa fa-angle-right"></i> </NavLink>
          <NavItem w3-hide-small> {data[lIndex-1].title} </NavItem>
        </NavBar>
        <DropList {..._showDropList} >        
          {
            data.map ( (section, index) => (
              <ListItem w3x-cursor-pointer {..._hover} key = {section._id} >
                <span className="w3x-inline-block w3x-width-80"> Section {index+1} </span> <i className="fa fa-angle-right"></i>  
                <span className="w3x-pad-left-24 w3x-sm-pad-left-8"> {section.title} </span>
              </ListItem>
            ))
          }                     
        </DropList>
      </header>
    )
  }

  _toggleDropList () {
    this.setState({showDropList : !this.state.showDropList});
  }

}