import React, { Component } from "react";
import Axios from "axios";
import Magazines from "./Magazines";
import FilterMagazine from "./FilterMagazine";
import PopupModal from "./PopupModal";
import { ButtonToolbar } from "react-bootstrap";
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
      //fetchingUrl: `http://localhost:3000/magazines`,
      fetchingUrl: "http://publisher.freesher.ct8.pl/magazines",
      searchTitle: undefined,
      searchMinPoints: undefined,
      searchMaxPoints: undefined
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
    );
  }
}
const buttonsToolbar = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around"
};
export default MagazineList;
