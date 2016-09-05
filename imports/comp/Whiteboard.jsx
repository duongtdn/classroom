"use strict"

import React from 'react';

import Player from '../lib/MediaPlayer';

import { W3EComp } from 'w3-react';

export default class extends W3EComp {

  constructor (props) {
    super (props);
    this.player = {};

    this.bind('_onGoto', '_onNext', '_onBack');

  }

  componentDidMount() {

    const event = this.context.event;
    event.on('media.goto', this._onGoto);
    event.on('media.next', this._onNext);
    event.on('media.back', this._onBack);


    const plugin = this.props.plugin;
    const content = this.props.data;

    this.player = new Player ({
      plugin : plugin, 
      content : content,
      events : {
        onLoaded : id => event.emit('media.loaded', id),
        onFinish : id => event.emit('media.finish', id)
      }
    });

  }

  render () {
    return (
      <div className = 'whiteboard-container'>        
        <div id = 'video'> </div>
      </div>
    );
  }

   _onBack() {   
    this.player.back();
  }

  _onNext() {    
    this.player.next();
  }

  _onGoto(id) {
    this.player.goto(id);
  }

}
