import React, { Component } from "react";

import "./App.css";

import MartaDashboard from "./MartaDashboard";

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <MartaDashboard />
      </div>
    );
  }
}

export default App;
