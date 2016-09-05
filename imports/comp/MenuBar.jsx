"use strict"

import React from 'react';

import $media from 'media-query';

import { W3EComp, NavBar, NavLink } from 'w3-react';

export default class extends W3EComp {

  constructor(props) {
    super(props);

    this.bind('next','back','showToc');

  }

  render () {
    const _class = this.importClassName().extendClassName('w3-border').get();        
    const _props = this.getProps();
    const {hover, ...rest} = this.getProps();
    const _hover = {};
    if (hover) {
      _hover [`w3-hover-${hover}`] = true;      
    }    

    return (
      <div >
        <NavBar className = {_class} >
          {
            $media.isxLarge() ?
              <span style={{display:'none'}} />
              :
              <NavLink w3-opennav {..._hover} onClick={ this.showToc }> <i className="fa fa-list-alt"></i> <span className="w3-hide-small w3-hide-medium"> Table of Content </span> </NavLink>
          }          
          <NavLink w3-opennav {..._hover}> <i className="fa fa-bar-chart"></i> <span className="w3-hide-small w3-hide-medium"> Dashboard </span> </NavLink>
          <NavLink w3-opennav {..._hover}> <i className="fa fa-cloud-download"></i> <span className="w3-hide-small w3-hide-medium"> Download </span> </NavLink>
          <NavLink w3-opennav {..._hover}> <i className="fa fa-comments"></i> <span className="w3-hide-small w3-hide-medium"> Comment </span> </NavLink>

          <NavLink w3-opennav w3-right {..._hover} onClick={ this.next }> <span className="w3-hide-small w3-hide-medium"> Next </span> <i className="fa fa-angle-right"></i> </NavLink>
          <NavLink w3-opennav w3-right {..._hover} onClick={ this.back }> <i className="fa fa-angle-left"></i> <span className="w3-hide-small w3-hide-medium"> Back </span> </NavLink>
        </NavBar>
      </div>
    );
  }

  next() {
    this.context.event.emit('media.next');
  }

  back() {
    this.context.event.emit('media.back');
  }

  showToc() {
    this.context.event.emit('toc.show');
  }


}
