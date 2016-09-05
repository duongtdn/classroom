"use strict"

import React from 'react';

import $media from 'media-query';

import { W3EComp, SideNav, Button } from 'w3-react';

export default class extends W3EComp {

  constructor(props) {
    super(props);

    this.state = { showContent : {}, showSelf : false, active : '' };

    this.bind('_showSelf','_hideSelf', '_highlightActive', 'goto');

  }

  componentWillMount() {
    const struct = this.props.data.struct;
    const showContent = {};
    struct.forEach ( topic => showContent[topic.id] = true );      
    this.setState({
      showContent : showContent
    });
  }

  componentDidMount() {

    const event = this.context.event;
    event.on('toc.show', this._showSelf);
    event.on('media.loaded', this._highlightActive );

  }

  render() {
    const showSelf = this.state.showSelf ? {'w3-hide' : false} : {'w3-hide' : true};
    const data = this.props.data;  
    const struct = data.struct;
    const lessons = data.lessons;   
    
    const tocBody = (
      <div className = { $media.isxLarge() ? 'w3-border-top w3x-clear-both' : 'w3x-pad-top-32 w3-border-top w3x-clear-both' } >
        { 
          struct.map( content => {
            const detail = lessons.filter( lesson => {
              return content.lessonId.indexOf(lesson.id) !== -1 ; 
            });
            
            let _showContentClass, _chevronClass; 
            if (this.state.showContent[content.id]) {
              _showContentClass = 'w3-show';
              _chevronClass = 'fa fa-chevron-up';
            } else {
              _showContentClass = 'w3-hide';
              _chevronClass = 'fa fa-chevron-down';
            }

            return (
              <div key = {content.id} >
                <Button w3-btn-block w3-left-align w3-sand w3-text-grey w3x-pad-left-8 w3x-hover-no-box-shadow onClick = { () => { this._toggleContent(content.id) } } >
                  {content.title}
                  <span className="w3-right"> <i className={_chevronClass} aria-hidden="true"></i> </span>
                </Button>
                <div className = { _showContentClass } >               
                  <table>
                    <tbody>
                      { detail.map (lesson => {
                        let _mediaClass = "fa fa-film";
                        if (lesson.media === 'quiz') {
                          _mediaClass = "fa fa-puzzle-piece";
                        } 
                        const _trClass = this.state.active === lesson.id ? "w3-hover-light-grey w3x-cursor-pointer w3-pale-yellow" : "w3-hover-light-grey w3x-cursor-pointer";
                        return ( 
                          <tr className={_trClass} key = {lesson.id} >
                            <td className="w3x-vertical-align-top w3-padding-4 w3x-pad-left-8"> <span className="w3x-width-30"> <i className={_mediaClass} aria-hidden="true"></i> </span> </td>
                            <td className="w3x-vertical-align-top w3-padding-4" onClick={() => {this.goto(lesson.id); this._hideSelf()}}> <span> {lesson.title} </span> </td>
                            <td className="w3x-vertical-align-top w3-padding-4 w3x-pad-right-16"> <span className="w3-right">  <i className="fa fa-check" aria-hidden="true"></i> </span> </td>
                          </tr>
                        )
                      })}                        
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })
        }          
      </div>
    );   
    const toc = $media.isxLarge() ? 
        (
          <div className="w3-rest">
            <div className = 'w3-white w3x-width-inherit'>
              <span className="w3-text-grey w3x-position-absolute w3x-margin-top-4 w3x-pad-top-4 w3x-pad-left-8"> <i className="fa fa-list-alt"></i> Table of Contents </span>
              <span className="w3-closebtn w3-large w3-text-white w3-container w3-padding-4" > <i className="fa fa-times" aria-hidden="true"></i> </span>
            </div>             
            {tocBody}  
          </div>
        ) 
      :
        (
          <SideNav w3-top w3-col m6 l4 {...showSelf}>
            <div className = 'w3-top w3-white w3-border-bottom w3x-width-inherit'>
              <span className="w3-text-grey w3x-position-absolute w3x-margin-top-4 w3x-pad-top-4 w3x-pad-left-8"> <i className="fa fa-list-alt"></i> Table of Contents </span>  
              <span onClick={this._hideSelf} className="w3-closebtn w3-large w3-hover-red w3-container w3-padding-4" title="Close"> <i className="fa fa-times" aria-hidden="true"></i> </span>          
            </div>
            {tocBody} 
          </SideNav>
        );

    return toc;
  }

  _toggleContent(contentId) {
    const showContent = this.state.showContent;
    showContent[contentId] = !showContent[contentId];
    this.setState({
      showContent :showContent
    });
  }

  _showSelf() {
    if (!$media.isxLarge()) {
      this.setState({
        showSelf : true
      });
    }    
  }

  _hideSelf() {
    this.setState({
      showSelf : false
    });
  }

  _highlightActive(id) {
    this.setState({
      active : id
    });
  }

  goto(lessonId) {
    this.context.event.emit('media.goto', lessonId);
  }

}