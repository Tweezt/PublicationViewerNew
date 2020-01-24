import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Magazines from "./components/Magazines";
import Header from "./components/layout/Header";
import AddTodo from "./components/AddTodo";
import About from "./components/pages/About";
import Register from "./components/pages/Register";
import PopupModal from "./components/PopupModal";

//import uuid from "uuid";

import "./App.css";
import Axios from "axios";

class App extends Component {
  state = {
    magazines: [],
    popupShown: false,
    idToShow: 0
  };

  componentDidMount() {
    Axios.get("http://publisher.freesher.ct8.pl/magazines/?limit=30&page=1")
      .then(res => res.data.magazines)
      .then(magazines => {
        this.setState({ magazines });
      });
  }

  popupClose = () => {
    this.setState({ popupShown: false });
  };

  showMagazinePopUp = id => {
    // axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    // .then(res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !==id)] }));

    this.setState({ popupShown: true, idToShow: id });
  };
  showModal = () => {
    if (this.state.popupShown) {
      return (
        <PopupModal
          show={this.state.popupShown}
          onHide={this.popupClose}
          idpassed={this.state.idToShow}
        />
      );
    }
  };

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route
              exact
              path="/"
              render={props => (
                <React.Fragment>
                  <AddTodo addTodo={this.addTodo} />
                  <Magazines
                    magazines={this.state.magazines}
                    showMagazinePopUp={this.showMagazinePopUp}
                  />
                  {this.showModal()}
                </React.Fragment>
              )}
            />
            <Route path="/about" component={About} />
            <Route path="/register" component={Register} />
          </div>
        </div>
      </Router>
    );
  }
}
export default App;
