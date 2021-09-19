import React, { useState, useEffect } from "react";
import "./randomItem.css";
import uuid from "react-uuid";

import gotServiceId from "../../services/gotServiceId";

import { ifDataIsEmpty } from "../../utils/ifDataIsEmpty";

import Spiner from "../spiner";
import ErrorMessage from "../errorMessage/errorMessage";

export const RandomItem = ({ setReq, options, type }) => {
  const [itemName, setItemName] = useState("");
  const [item, setItem] = useState([{ title: "", value: "" }]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    gotServiceId(setReq)
      .then((item) => {
        const itemBody = [];

        options.map((option) => {
          return itemBody.push({
            title: option,
            value: ifDataIsEmpty(item[option]),
          });
        });
        setItemName(item.name);
        setItem(itemBody);
        setLoading(!loading);
      })
      .catch(() => {
        setLoading(!loading);
        setError(!error);
      });
  }, []);

  const showContent = () => {
    return (
      <>
        <h4>
          Random {type}: {itemName}
        </h4>
        <ul className="list-group list-group-flush">
          {item.map(({ title, value }) => {
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

  const checkContent = () => {
    if (loading) {
      return <Spiner />;
    } else if (error) {
      return <ErrorMessage name={"Fetch"} />;
    } else {
      return showContent();
    }
  };

  return <div className="random-block rounded">{checkContent()}</div>;
};
