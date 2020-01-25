import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./components/layout/Header";

import About from "./components/pages/About";
import Register from "./components/pages/Register";
import MagazineList from "./components/MagazineList";
//import uuid from "uuid";

import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props => <MagazineList />} />
            <Route path="/about" component={About} />
            <Route path="/register" component={Register} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
