import React, { useState, useEffect } from "react";
import "./itemList.css";

import gotServicePage from "../../services/gotServicePage";
import { getApiId } from "../../utils/getApiId";

import Spiner from "../spiner";
import ErrorMessage from "../errorMessage/errorMessage";

export const ItemList = ({ setReq, type, setItemId }) => {
  const [itemList, setItemList] = useState([{ name: "", id: "" }]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    gotServicePage(setReq)
      .then((items) => {
        const nameList = [];

        items.map(({ name, url }) => {
          return nameList.push({ name, id: getApiId(url) });
        });
        setItemList(nameList);
        setLoading(!loading);
      })
      .catch(() => {
        setLoading(!loading);
        setError(!error);
      });
  }, []);

  const pushId = (id) => {
    setItemId(id);
  };

  const setContent = () => {
    return (
      <ul className="item-list list-group">
        {itemList.map(({ name, id }) => {
          return (
            <li
              onClick={() => pushId(id)}
              key={id}
              id={id}
              className="list-group-item"
            >
              {name}
            </li>
          );
        })}
      </ul>
    );
  };

  const checkContent = () => {
    if (loading) {
      return <Spiner />;
    } else if (error) {
      return <ErrorMessage name={`${type} not found`} />;
    } else {
      return setContent();
    }
  };

  return <div className="random-block rounded">{checkContent()}</div>;
};
