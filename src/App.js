import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Magazines from "./components/Magazines";
import Header from "./components/layout/Header";
import FilterMagazine from "./components/FilterMagazine";
import About from "./components/pages/About";
import Register from "./components/pages/Register";
import PopupModal from "./components/PopupModal";
import { ButtonToolbar } from "react-bootstrap";
//import uuid from "uuid";

import "./App.css";
import Axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      magazines: [],
      popupShown: false,
      idToShow: 0,
      isPrev: false,
      isNext: false,
      limit: 5,
      actualPage: 1,
      fetchingUrl: `http://localhost:3000/magazines`,
      searchTitle: undefined,
      searchMinPoints: undefined,
      searchMaxPoints: undefined
    };
  }

  popupClose = () => {
    this.setState({ popupShown: false });
  };

  showMagazinePopUp = id => {
    // axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    // .then(res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !==id)] }));

    this.setState({ popupShown: true, idToShow: id });
  };
  nextPage = async () => {
    console.log("next");
    await this.setState({ actualPage: this.state.actualPage + 1 });
    console.log("Actual page", this.state.actualPage);
    this.fetchingMagazine();
  };
  prevPage = async () => {
    console.log("prev");
    await this.setState({ actualPage: this.state.actualPage - 1 });
    console.log("Actual page", this.state.actualPage);
    this.fetchingMagazine();
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
  fetchingMagazine = () => {
    console.log("fetching...");
    const {
      limit,
      actualPage,
      searchMaxPoints,
      searchMinPoints,
      searchTitle,
      fetchingUrl
    } = this.state;

    let baseUrl = `${fetchingUrl}?limit=${limit}&page=${actualPage}`;
    if (searchTitle !== undefined) {
      baseUrl += `&title=${searchTitle}`;
    }
    if (searchMinPoints !== undefined) {
      baseUrl += `&minPoints=${searchMinPoints}`;
    }
    if (searchMaxPoints !== undefined) {
      baseUrl += `&maxPoints=${searchMaxPoints}`;
    }

    Axios.get(baseUrl)
      .then(res => res.data)
      .then(data => {
        if (typeof data.next !== "undefined") {
          this.setState({ isNext: true });
        } else {
          this.setState({ isNext: false });
        }
        return data;
      })
      .then(data => {
        if (typeof data.previous !== "undefined") {
          this.setState({ isPrev: true });
        } else {
          this.setState({ isPrev: false });
        }
        return data.magazines;
      })
      .then(magazines => {
        this.setState({ magazines });
        console.log("End fetching");
      });
  };
  searchMagazines = async params => {
    console.log(params);
    const { title, minPoints, maxPoints } = params;

    if (title !== undefined) {
      await this.setState({ searchTitle: title });
      console.log("SearchTitle", this.state.searchTitle);
    }
    if (minPoints !== undefined) {
      await this.setState({ searchMinPoints: minPoints });
    }
    if (maxPoints !== undefined) {
      await this.setState({ searchMaxPoints: maxPoints });
    }

    this.fetchingMagazine();
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
                  <FilterMagazine searchMagazines={this.searchMagazines} />
                  <Magazines
                    magazines={this.state.magazines}
                    showMagazinePopUp={this.showMagazinePopUp}
                  />
                  {this.showModal()}

                  <ButtonToolbar style={buttonsToolbar}>
                    <input
                      type="submit"
                      value="Previous"
                      className={this.state.isPrev ? "btn" : "btn hidden"}
                      onClick={() => this.prevPage()}
                    />
                    <input
                      type="submit"
                      value="Next"
                      className={this.state.isNext ? "btn" : "btn hidden"}
                      onClick={() => this.nextPage()}
                    />
                  </ButtonToolbar>
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
const buttonsToolbar = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around"
};
export default App;
