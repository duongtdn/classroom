"use strict"

import React from 'react';

import { W3Comp } from 'w3-react';

export default class extends W3Comp {

  render () {
    const _class = this.importClassName().get();
    return (
      <div className = {_class} >
        {this.props.children}
      </div>
    );
  }


}