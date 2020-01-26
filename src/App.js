import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./components/layout/Header";

import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import MagazineList from "./components/MagazineList";
//import uuid from "uuid";

import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: false
    };
  }
  componentDidMount() {
    let userId = localStorage.getItem("id");
    console.log(userId);
    if (
      typeof userId !== "undefined" &&
      userId !== "undefined" &&
      userId !== null &&
      userId !== "null"
    ) {
      this.setState({ isAuthenticated: true, userId });
    }
  }

  onLogin = async id => {
    await this.setState({ isAuthenticated: true, userId: id });
  };
  onLogout = async id => {
    await localStorage.setItem("id", "undefined");
    await this.setState({ isAuthenticated: false, userId: undefined });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header
              isAuthenticated={this.state.isAuthenticated}
              onLogout={this.onLogout}
            />
            <Route
              exact
              path="/"
              render={props => (
                <MagazineList isAuthenticated={this.state.isAuthenticated} />
              )}
            />
            <Route
              path="/login"
              render={props => <Login onLogin={this.onLogin} />}
            />
            <Route path="/register" component={Register} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
