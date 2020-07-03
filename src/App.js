import React, { Component } from 'react';

/* Components */
import Assets from './components/Assets'

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="dashboard">
        <Assets />
      </div>
    )
  }
}


export default App;
