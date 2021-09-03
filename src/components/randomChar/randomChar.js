import React, { Component } from "react";
import "./randomChar.css";
import uuid from "react-uuid";

import gotServiceId from "../../services/gotServiceId";
import getComponent from "../../utils/getComponent";
import { checkData } from "../../utils/checkData";

import Spiner from "../spiner";
import ErrorMessage from "../errorMessage/errorMessage";

export default class RandomChar extends Component {
  state = {
    char: [
      { title: "Gender", value: "" },
      { title: "Born", value: "" },
      { title: "Died", value: "" },
      { title: "Culture", value: "" },
    ],
    charName: null,
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.setChar();
  }

  setChar = () => {
    gotServiceId({
      url: "https://www.anapioficeandfire.com/api/characters",
      id: Math.floor(Math.random() * 140 + 1),
    })
      .then(({ name, gender, born, died, culture }) => {
        this.setState({
          char: [
            { title: "Gender", value: checkData(gender) },
            { title: "Born", value: checkData(born) },
            { title: "Died", value: checkData(died) },
            { title: "Culture", value: checkData(culture) },
          ],
          charName: name,
          loading: false,
        });
      })
      .catch(() => {
        this.setState({
          loading: false,
          error: true,
        });
      });
  };

  showContent = () => {
    const { char, charName } = this.state;

    return (
      <>
        <h4>Random Character: {charName}</h4>
        <ul className="list-group list-group-flush">
          {char.map(({ title, value }) => {
            return (
              <li
                key={uuid()}
                className="list-group-item d-flex justify-content-between"
              >
                <span className="term">{title} </span>
                <span>{value}</span>
              </li>
            );
          })}
        </ul>
      </>
    );
  };

  checkContent = () => {
    const { loading, error } = this.state;

    if (loading) {
      return getComponent(<Spiner />);
    } else if (error) {
      return getComponent(<ErrorMessage name={"Fetch"} />);
    } else {
      return this.showContent();
    }
  };

  render() {
    return <div className="random-block rounded">{this.checkContent()}</div>;
  }
}
