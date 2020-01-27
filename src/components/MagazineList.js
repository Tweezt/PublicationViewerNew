import React, { Component } from "react";
import Axios from "axios";
import Magazines from "./Magazines";
import FilterMagazine from "./FilterMagazine";
import PopupModal from "./PopupModal";
import { ButtonToolbar, Alert } from "react-bootstrap";
class MagazineList extends Component {
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
      // fetchingUrl: `http://localhost:3000/magazines`,
      fetchingUrl: "http://publisher.freesher.ct8.pl/magazines",
      searchTitle: undefined,
      searchMinPoints: undefined,
      searchMaxPoints: undefined,
      sortOption: undefined,
      isMessage: false,
      message: ""
    };
  }
  popupClose = () => {
    this.setState({ popupShown: false });
  };

  showMagazinePopUp = id => {
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
          isAuthenticated={this.props.isAuthenticated}
          show={this.state.popupShown}
          onHide={this.popupClose}
          idpassed={this.state.idToShow}
          isfavorite={false}
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
      fetchingUrl,
      sortOption
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
    if (sortOption !== undefined) {
      baseUrl += `&sortOption=${sortOption}`;
    }
    this.setState({ isMessage: true, message: "Fetching..." });
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
        this.setState({ magazines, isMessage: false });
        console.log("End fetching");
      })
      .catch(err => {
        if (typeof err.response.data.message === "undefined") {
          this.setState({ isMessage: false, message: err });
          console.error(err);
        } else {
          this.setState({
            isMessage: false,
            message: err.response.data.message
          });
        }
      });
  };
  searchMagazines = async params => {
    console.log(params);
    const { title, minPoints, maxPoints, sortOption } = params;

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

    await this.setState({ sortOption });

    this.fetchingMagazine();
  };

  render() {
    return (
      <React.Fragment>
        <FilterMagazine searchMagazines={this.searchMagazines} />
        <Alert variant="primary" show={this.state.isMessage}>
          {this.state.message}
        </Alert>
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
    );
  }
}
const buttonsToolbar = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around"
};
export default MagazineList;
