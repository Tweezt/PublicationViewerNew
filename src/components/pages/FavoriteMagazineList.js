import React, { Component } from "react";
import Magazines from "../Magazines";
import PopupModal from "../PopupModal";
import Axios from "axios";
import { Button, Alert } from "react-bootstrap";
class FavoriteMagazineList extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      magazines: [],
      popupShown: false,
      idToShow: 0,
      isMessage: false,
      message: "fetching...",
      // fetchingUrl: `http://localhost:3000/favorites`,
      fetchingUrl: "http://publisher.freesher.ct8.pl/favorites"
    };
  }
  async componentDidMount() {
    let userid = localStorage.getItem("id");
    await this.setState({ userId: userid });
    this.fetchingFavortiesMagazine();
  }
  popupClose = () => {
    this.setState({ popupShown: false });
    this.fetchingFavortiesMagazine();
  };
  showMagazinePopUp = id => {
    this.setState({ popupShown: true, idToShow: id });
  };
  showModal = () => {
    if (this.state.popupShown) {
      return (
        <PopupModal
          isAuthenticated={this.props.isAuthenticated}
          show={this.state.popupShown}
          onHide={this.popupClose}
          idpassed={this.state.idToShow}
          isfavorite={true}
        />
      );
    }
  };
  fetchingFavortiesMagazine = () => {
    let url = `${this.state.fetchingUrl}/${this.state.userId}`;
    console.log(url);
    this.setState({ isMessage: true, message: "fetching..." });
    Axios.get(url)
      .then(res => res.data)
      .then(data => {
        this.setState({ magazines: data, isMessage: false });
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
  makePdf = () => {
    let thead = document.querySelectorAll("thead tr th");

    let tbody = document.querySelector("table").rows;

    //const theadT = thead.split("<th>");

    var style = "<style>";
    style = style + "table {width: 100%;font: 17px Calibri;}";
    style =
      style +
      "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
    style = style + "padding: 2px 3px;text-align: center;}";
    style = style + "</style>";
    var win = window.open("", "", "height=700,width=700");
    win.document.write("<html><head>");
    win.document.write("<title>Profile</title>"); // <title> FOR PDF HEADER.
    win.document.write(style); // ADD STYLE INSIDE THE HEAD TAG.
    win.document.write("</head>");
    win.document.write("<body>");
    win.document.write("<h2>Lista ulubionych czasopism naukowych</h2>");
    win.document.write(`<h4> Wygenerowano ${new Date().toLocaleString()}</h4>`);

    win.document.write("<table>");
    win.document.write("<thead>");
    win.document.write("<tr>");
    for (let i = 0; i < thead.length - 1; i++) {
      win.document.write(`<th>${thead[i].innerHTML}</th>`);
    }
    win.document.write("</tr>");
    win.document.write("<tbody>");
    for (let i = 1; i < tbody.length; i++) {
      win.document.write("<tr>");
      for (let j = 0; j < tbody[i].cells.length - 1; j++) {
        win.document.write(`<td>${tbody[i].cells[j].innerHTML}</td>`);
      }
      win.document.write("</tr>");
    }
    win.document.write("</tbody>");
    // THE TABLE CONTENTS INSIDE THE BODY TAG.
    win.document.write("</table>");
    win.document.write("</body></html>");

    win.document.close();
    win.print();
  };
  render() {
    return (
      <React.Fragment>
        <header style={headerStyle}>
          <h2>Favorites Magazines</h2>
          <Button type="button" onClick={() => this.makePdf()}>
            Export the list as PDF
          </Button>
        </header>
        <Alert variant="primary" show={this.state.isMessage}>
          {this.state.message}
        </Alert>
        <Magazines
          magazines={this.state.magazines}
          showMagazinePopUp={this.showMagazinePopUp}
        />
        {this.showModal()}
      </React.Fragment>
    );
  }
}
const headerStyle = {
  display: "flex",
  flexDireciton: "row",
  justifyContent: "space-between"
};
export default FavoriteMagazineList;
