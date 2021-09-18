import React, { Component } from "react";
import "./randomChar.css";
import uuid from "react-uuid";

import gotServiceId from "../../services/gotServiceId";

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

  setChar = () => {
    gotServiceId({
      url: "https://www.anapioficeandfire.com/api/characters",
      id: Math.floor(Math.random() * 140 + 1),
    })
      .then(({ name, gender, born, died, culture }) => {
        this.setState({
          char: [
            { title: "Gender", value: gender },
            { title: "Born", value: born },
            { title: "Died", value: died },
            { title: "Culture", value: culture },
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
            return value ? (
              <li
                key={uuid()}
                className="list-group-item d-flex justify-content-between"
              >
                <span className="term">{title} </span>
                <span>{value}</span>
              </li>
            ) : (
              <li
                key={uuid()}
                className="list-group-item d-flex justify-content-between"
              >
                <span className="term">{title} </span>
                <span>No data</span>
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
      return <Spiner />;
    } else if (error) {
      return <ErrorMessage name={"Fetch"} />;
    } else {
      return this.showContent();
    }
  };

  componentDidMount() {
    this.setChar();
  }

  render() {
    return <div className="random-block rounded">{this.checkContent()}</div>;
  }
}
