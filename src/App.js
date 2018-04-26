import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FileSelector from './components/FileSelector';
import TextWindow from './components/TextWindow';
import Chart from './components/Chart';
import Accordian from './components/Accordian/Accordian.js'


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <FileSelector />
        <Chart />
        <Accordian />
      </div>
    );
  }
}

export default App;
