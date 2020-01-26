import React, { Component } from "react";
import Magazines from "../Magazines";
import PopupModal from "../PopupModal";
import Axios from "axios";
class FavoriteMagazineList extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      magazines: [],
      popupShown: false,
      idToShow: 0,
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
    Axios.get(url)
      .then(res => res.data)
      .then(data => {
        this.setState({ magazines: data });
      })
      .catch(err => {
        console.error(err);
      });
  };
  render() {
    return (
      <React.Fragment>
        <h2>Favorites Magazines</h2>
        <Magazines
          magazines={this.state.magazines}
          showMagazinePopUp={this.showMagazinePopUp}
        />
        {this.showModal()}
      </React.Fragment>
    );
  }
}
export default FavoriteMagazineList;
