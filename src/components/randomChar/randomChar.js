import React, { Component } from "react";
import "./randomChar.css";
import uuid from "react-uuid";

import gotServiceId from "../../services/gotServiceId";

import Spiner from "../spiner";
import ErrorMessage from "../errorMessage/errorMessage";

export default class RandomChar extends Component {
  constructor() {
    super();

    this.setChar();
    this.checkContent = this.checkContent.bind(this);
  }

  state = {
    char: [
      { title: "Gender", value: null },
      { title: "Born", value: null },
      { title: "Died", value: null },
      { title: "Culture", value: null },
    ],
    charName: null,
    loading: true,
    error: false,
  };

  setChar() {
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
  }

  checkContent(content) {
    const { loading, error } = this.state;

    return loading ? (
      <Spiner />
    ) : error ? (
      <ErrorMessage name={"Fetch"} />
    ) : (
      content
    );
  }

  render() {
    const { char, charName } = this.state;

    const content = (
      <>
        <h4>Random Character: {charName}</h4>
        <ul className="list-group list-group-flush">
          {char.map((param) => {
            const { title, value } = param;
            return value !== "" ? (
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

    return (
      <div className="random-block rounded">{this.checkContent(content)}</div>
    );
  }
}
