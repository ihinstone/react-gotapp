import React, { Component } from "react";
import "./charDetails.css";
import uuid from "react-uuid";

import gotServiceId from "../../services/gotServiceId";
import getComponent from "../../utils/getComponent";
import { checkData } from "../../utils/checkData";

import ErrorMessage from "../errorMessage/errorMessage";

import { characters } from "../../constants/constants";

export default class CharDetails extends Component {
  state = {
    charName: "",
    charDitails: [
      { name: "Gander", value: "" },
      { name: "Born", value: "" },
      { name: "Died", value: "" },
      { name: "Culture", value: "" },
    ],
    error: false,
  };

  componentDidMount() {
    this.setChar();
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.setChar();
    }
  }

  setChar = () => {
    const { id } = this.props;

    return !id
      ? null
      : gotServiceId({ url: characters, id: id })
          .then(({ name, gender, born, died, culture }) => {
            this.setState({
              charName: name,
              charDitails: [
                { name: "Gander", value: checkData(gender) },
                { name: "Born", value: checkData(born) },
                { name: "Died", value: checkData(died) },
                { name: "Culture", value: checkData(culture) },
              ],
            });
          })
          .catch(() => {
            this.setState({
              error: true,
            });
          });
  };

  setContent = () => {
    const { charName, charDitails } = this.state;

    return (
      <>
        <h4>{charName}</h4>
        <ul className="list-group list-group-flush">
          {charDitails.map(({ name, value }) => {
            return (
              <li
                key={uuid()}
                className="list-group-item d-flex justify-content-between"
              >
                <span className="term">{name}</span>
                <span>{value}</span>
              </li>
            );
          })}
        </ul>
      </>
    );
  };

  checkContent = () => {
    const { id } = this.props;
    const { error } = this.state;

    if (!id) {
      return <span>Select character</span>;
    } else if (error) {
      return getComponent(<ErrorMessage name={"Not found"} />);
    } else {
      return this.setContent();
    }
  };

  render() {
    return <div className="char-details rounded">{this.checkContent()}</div>;
  }
}
