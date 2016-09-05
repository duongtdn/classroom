"use strict"

import React from 'react';
import { render } from 'react-dom';

import { W3Comp, W3EComp, SimpleEvent } from 'w3-react';

import HeaderBar from './HeaderBar';
import MainBody from './MainBody';
import Whiteboard from './Whiteboard';
import ProgressBar from './ProgressBar';
import MenuBar from './MenuBar';
import ToC from './ToC';

const event = new SimpleEvent();

/* data */
const plugin = {
  'YT' : {
    api : 'https://www.youtube.com/player_api',
    apiReady : 'onYouTubePlayerAPIReady'
  }
};
const content = {
  _id : 'section_1',
  struct : [
    { id : 'tp01', title : 'Electronic and Signal', lessonId : ['ls01', 'ls02', 'ls03', 'ls04', 'ls05', 'ls06'] },
    { id : 'tp02', title : 'Information and Digital Logical', lessonId : ['ls07', 'ls08', 'ls09', 'ls10'] }
  ],
  // lessons : [
  //   { id : 'ls01', media : 'video', service : 'YT', src : 'PevmScfgC40', title : 'Introduction'},
  //   { id : 'ls02', media : 'video', service : 'YT', src : 'XQMnT9baoi8', title : 'Current and voltage, R C L components'},
  //   { id : 'ls03', media : 'video', service : 'YT', src : '2Rxoz13Bthc', title : 'AC vs. DC'},
  //   { id : 'ls04', media : 'video', service : 'YT', src : 'WO3z4gfN118', title : 'Frequency'},
  //   { id : 'ls05', media : 'video', service : 'YT', src : 'mF3DCa4TbD0', title : 'Clock'},
  //   { id : 'ls06', media : 'quiz', service : 'YT', src : '6fXEsroBpEU', title : 'Quiz'},
  //   { id : 'ls07', media : 'video', service : 'YT', src : 'tFdlhlmQ-ek', title : 'Analog world, the limitation and motivation to digital'},
  //   { id : 'ls08', media : 'video', service : 'YT', src : '9EU8UXtu-4k', title : 'Didital word: the world of 0 and 1'},
  //   { id : 'ls09', media : 'video', service : 'YT', src : '9EU8UXtu-4k', title : 'From analog to digital'},
  //   { id : 'ls10', media : 'video', service : 'YT', src : '9EU8UXtu-4k', title : 'Boolean algorithm, the art of true and false'}
  // ]
   lessons : [
    { id : 'ls01', media : 'video', service : 'YT', src : 'PevmScfgC40', title : 'Introduction Verilof HDL'},
    { id : 'ls02', media : 'video', service : 'YT', src : 'XQMnT9baoi8', title : 'The Elder Scrolls V: Skyrim - Dragonbord Piano'},
    { id : 'ls03', media : 'video', service : 'YT', src : '2Rxoz13Bthc', title : 'Warcraft Official Trailer Movie'},
    { id : 'ls04', media : 'video', service : 'YT', src : 'WO3z4gfN118', title : 'Anh Cu Di Di - An Coong'},
    { id : 'ls05', media : 'video', service : 'YT', src : 'mF3DCa4TbD0', title : 'Naruto Sadness and Sorrow (Violin) - Taylor Davis'},
    { id : 'ls06', media : 'quiz', service : 'YT', src : '6fXEsroBpEU', title : 'Endless Love - The Myth OST - An Coong'},
    { id : 'ls07', media : 'video', service : 'YT', src : 'tFdlhlmQ-ek', title : 'My Heart Will Go On - Taylor Davis'},
    { id : 'ls08', media : 'video', service : 'YT', src : '9EU8UXtu-4k', title : 'Game of Thrones Theme (Violin cover) - Taylor Davis'},
    { id : 'ls09', media : 'video', service : 'YT', src : 'hnXD6FRZtn0', title : 'Skyrim - The Dragonborn Comes - Swedish'},
    { id : 'ls10', media : 'video', service : 'YT', src : 'q8ir8rVl2Z4', title : 'The Hobbit: The Battle Of The Five Armies - Billy Boyd'}
  ]
}

export default class Classroom extends W3Comp {

  getChildContext () {
    return { event : event };
  }  

  render() {
    const _class = this.importClassName().get();
    return (
      <main className = { _class } >

        <HeaderBar hover="pale-blue"/>
        <div className = "w3-row">         
          <MainBody w3-col w3x-margin-top-5 w3x-max-width-1200>          
            <Whiteboard plugin = {plugin} data = {content.lessons} />                  
            <ProgressBar w3x-margin-top-5 />
            <MenuBar w3x-margin-top-5 w3-light-grey hover="teal"/>
          </MainBody>       
          <ToC data = {content} />
        </div>
      </main>
    );
  }

} 

Classroom.childContextTypes = W3EComp.contextTypes;