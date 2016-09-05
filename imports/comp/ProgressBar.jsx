"use strict"

import React from 'react';

import { W3Comp } from 'w3-react';

/* data */
const complete = '75%';

export default class extends W3Comp {

  constructor (props) {
    super (props);

  }

  render () {
    const _class = this.importClassName().extendClassName('w3x-clear-both').get();
    return (
      <div className = {_class} >
        <div className = 'w3-progress-container w3-pale-green w3-small'>
          <div className="w3-progressbar w3-green" style={{width: complete}}>
            <div className="w3-center w3-text-white"> {complete} </div>
          </div>          
        </div>
      </div>
    );
  }


}