"use strict"

const YOUTUBE = 'YT';

export default class  {
  constructor({plugin, content, events}) {

    this.plugin = plugin;
    this.content = content;
    this.events = events || {};


    /* private */
    this._player = {};
    this._currentIndex = 0;
    this._nextIndex = 0;    // init load will start at begin -> enhance: store last index

    this._bind('_fire', '_onFinish', 'goto', 'back', 'next');

    this.init();


  }

  /* public APIs */

  init() {
    const service = this.getCurrentActiveService();
    if (!this.plugin[service]) {
      Meteor.Error (500, 'Service plugin not found');
    }
    const plugin = this.plugin[service];
    if (!plugin.ready) {
      // load plugin script base on lesson.service
      this._loadPluginScript(plugin.api);
      // register listener event for when script loaded
      window[plugin.apiReady] = evt => {
        console.log (`loaded ${service} API`);
        this.plugin[service].ready = true;
        this._createPlayer(service);
      }  
    }
    // then, create the player

    return this;
  }

  load() {
    const lesson = this.getNextLesson();
    if ( !lesson ) {
      console.log ('ended');
      return;
    }
    const player = this.plugin[lesson.service].player;
    if (player) {
      player.load(lesson.src);
      this.updateLessonIndex().pointToNextLesson();
    } else {
      this.init();
    }
    return this;
  }

  updateLessonIndex() {
    this._currentIndex = this._nextIndex;
    return this;
  }

  pointToNextLesson() {
    if (this._currentIndex < this.content.length) {
      this.setNextLesson(this._currentIndex + 1);
    }    
    return this;
  }

  pointToPreviousLesson() {
    if (this._currentIndex > 0) {
      this.setNextLesson(this._currentIndex - 1);
    } else {
      this.setNextLesson(0);
    }   
    return this;
  }

  setNextLesson(index) {
    this._nextIndex = index;
    return this;
  }

  getPlayer(service) {
    return this._player[service];
  }

  getLesson() {
    return this.content[this._currentIndex];
  }

  getNextLesson() {
    return this.content[this._nextIndex];
  }

  getCurrentActiveService() {
    return this.getLesson().service;
  }

  getCurrentActivePlayer() {
    const service = this.getCurrentActiveService();
    return this.plugin[service].player;
  }

  back() {    
    this.pointToPreviousLesson().getCurrentActivePlayer().back();
  }

  next() {    
    this.pointToNextLesson().getCurrentActivePlayer().next();
  }

  goto(id) {
    let index = -1;
    for (let i = 0; i < this.content.length; i++) {
      if (this.content[i].id === id) {
        index = i;
        break;
      }
    }
    if (index === -1) {
      // no lesson, invalid id
      return;
    }
    this.setNextLesson(index).load();
  }

  /* private methods */ 
  
  _onFinish() {
    this._fire('onFinish', this._currentIndex);
    this.load();   
  }  

  _loadPluginScript(api) {
    const tag = document.createElement('script');
    tag.src = api;
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    return this;
  }

  _createPlayer(service) {

    const playerParams = {
      'theme':'dark',
      'autohide':0,
      'modestbranding':1,
      'showinfo':1,
      'controls':1,
      'rel':0
    };
    const src = this.getLesson().src;
    this.plugin[service].player = new window[service].Player ('video', {
      // videoId     : src,
      playerVars  : playerParams,
      events      : {
        'onReady' : () => this.load(),
        'onStateChange' : evt => {
          switch (evt.data) {
            case 0 : this._onFinish(); break;
            case 5 : this._fire('onLoaded', this.getLesson().id); break;
          } 
        } 
      }
    });
    
    /* make wraper for Youtube service as its is from third party and not 
       compatible
    */
    if (service === YOUTUBE) {
      this._makeYoutubeCompatible();
    }

    return this;

  }

  _makeYoutubeCompatible() {
   
     this.plugin[YOUTUBE].player.finish =  this.plugin[YOUTUBE].player.next =  this.plugin[YOUTUBE].player.back = () => {
        // invoke finish from Whiteboard
        this._onFinish();
      }

      this.plugin[YOUTUBE].player.stop = () => {
        this.plugin[YOUTUBE].player.stopVideo();
      };
      
      this.plugin[YOUTUBE].player.load = src => {
        this.plugin[YOUTUBE].player.stop(); 
        this.plugin[YOUTUBE].player.cueVideoById({videoId:src});
      };
  }

  _bind (...methods) {
    methods.forEach (method => this[method] = this[method].bind(this));
  }

  _fire (event, ...args) {
    this.events[event] && this.events[event](...args);
    return this;
  }

}