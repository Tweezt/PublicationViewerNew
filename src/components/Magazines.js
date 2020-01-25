import React, { Component } from "react";
import MagazineItem from "./MagazineItem";
import { Table } from "react-bootstrap";

class Magazines extends Component {
  render() {
    return (
      <React.Fragment>
        <Table bordered>
          <thead>
            <tr>
              <th> Title 1 </th>
              <th> Title 2 </th>
              <th> Points </th>
              <th> ISSN </th>
              <th> EISSN </th>
              <th> Actions </th>
            </tr>
          </thead>
          <tbody>
            {this.props.magazines.map(magazine => {
              return (
                <MagazineItem
                  key={magazine["_id"]}
                  magazine={magazine}
                  showMagazine={this.props.showMagazinePopUp}
                />
              );
            })}
          </tbody>
        </Table>
      </React.Fragment>
    );
  }
}

export default Magazines;
