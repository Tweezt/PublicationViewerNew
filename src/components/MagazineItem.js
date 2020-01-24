import React, { Component } from "react";

class MagazineItem extends Component {
  getStyle = () => {
    return {
      background: "#f4f4f4",
      //padding: "10px",
      borderBottom: "1px #ccc dotted",

      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between"
    };
  };

  render() {
    const { _id, Title1, Title2, issn, e_issn, Points } = this.props.magazine;
    return (
      <tr>
        <td>{Title1}</td>
        <td>{Title2}</td>

        <td>{Points[0].Value}</td>
        <td>{issn}</td>
        <td>{e_issn !== "" ? e_issn : "Brak"}</td>
        <td>
          <button
            onClick={this.props.showMagazine.bind(this, _id)}
            style={btnStyle}
          >
            Open
          </button>
        </td>
      </tr>
    );
  }
}

const btnStyle = {
  background: "#555",
  color: "#fff",
  border: "none",
  padding: "5px 9px",
  borderRadius: "30%",
  cursor: "pointer"
  //   float: "right"
};

export default MagazineItem;
