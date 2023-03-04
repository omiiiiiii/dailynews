import React, { Component } from 'react';
import loading from './Loading.gif';

export default class Spinner extends Component {
  render() {
    return <div>
        <div className='text-center'>
        <img src={loading} alt='loading'></img>
        </div>
        
    </div>;
  }
}
