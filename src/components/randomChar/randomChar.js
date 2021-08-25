import React, { Component } from "react";
import "./randomChar.css";

import gotServiceId from "../../services/gotServiceId";

import Spiner from "../spiner";
import ErrorMessage from "../errorMessage/errorMessage";

export default class RandomChar extends Component {
  constructor() {
    super();

    this.setChar();
  }

  state = {
    char: {
      name: null,
      gender: null,
      born: null,
      died: null,
      culture: null,
    },
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
          char: {
            name,
            gender,
            born,
            died,
            culture,
          },
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

  render() {
    const {
      char: { name, gender, born, died, culture },
      loading,
      error,
    } = this.state;

    const charData = [
      { name: "Gender", value: gender },
      { name: "Born", value: born },
      { name: "Died", value: died },
      { name: "Culture", value: culture },
    ];

    const content = loading ? (
      <Spiner />
    ) : error ? (
      <ErrorMessage name={"Fetch"} />
    ) : (
      <>
        <h4>Random Character: {name}</h4>
        <ul className="list-group list-group-flush">
          {charData.map((param, key) => {
            const { name, value } = param;
            return value !== "" ? (
              <li
                key={key}
                className="list-group-item d-flex justify-content-between"
              >
                <span className="term">{name} </span>
                <span>{value}</span>
              </li>
            ) : (
              <li
                key={key}
                className="list-group-item d-flex justify-content-between"
              >
                <span className="term">{name} </span>
                <span>No data</span>
              </li>
            );
          })}
        </ul>
      </>
    );

    return <div className="random-block rounded">{content}</div>;
  }
}
