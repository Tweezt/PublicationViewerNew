import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  buildLoginLink = () => {
    if (!this.props.isAuthenticated) {
      return (
        <Link style={linkStyle} to="/login">
          Login
        </Link>
      );
    }
  };
  buildLogoutLink = () => {
    if (this.props.isAuthenticated) {
      return (
        <Link style={linkStyle} onClick={this.props.onLogout()} to="/">
          Logout
        </Link>
      );
    }
  };
  buildFavoritesLink = () => {
    if (this.props.isAuthenticated) {
      return (
        <Link style={linkStyle} to="/favorites">
          Favorites
        </Link>
      );
    }
  };

  render() {
    return (
      <header style={headerStyle}>
        <h1>Publication Viewer</h1>
        <div style={linkContainerStyle}>
          <Link style={linkStyle} to="/">
            Home
          </Link>
          {this.buildLoginLink()}
          {this.buildFavoritesLink()}
          {this.buildLogoutLink()}
        </div>
      </header>
    );
  }
}

const headerStyle = {
  background: "#333",
  color: "#fff",
  textAlign: "center",
  padding: "10px"
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none"
};
const linkContainerStyle = {
  display: "flex",
  flexDirectorion: "row",
  flex: 1,
  justifyContent: "space-around"
};
