import React, { useState, useEffect } from "react";
import "./itemDetails.css";
import uuid from "react-uuid";

import gotServiceId from "../../services/gotServiceId";

import ErrorMessage from "../errorMessage/errorMessage";

export const ItemDetails = ({setReq, options}) => {

  const [itemName, setItemName] = useState('');
  const [itemDetails, setItemDetails] = useState([{ name: "", value: "" },]);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (setReq.id) {
      gotServiceId(setReq).then((item) => {
        const itemBody = [];
  
        options.map((option) => {
          return itemBody.push({name: option, value: !item[option] ? 'no data' : item[option]})
        })
        setItemName(item.name);
        setItemDetails(itemBody);
      }).catch(() => {
        setError(!error);
      })
    }
  }, [setReq.id])

  const setContent = () => {
    return (
      <>
        <h4>{itemName}</h4>
        <ul className="list-group list-group-flush">
          {itemDetails.map(({ name, value }) => {
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

  const checkContent = () => {

    if (!setReq.id) {
      return <span>Select character</span>;
    } else if (error) {
      return <ErrorMessage name={"Not found"} />;
    } else {
      return setContent();
    }
  };

  
    return <div className="char-details rounded">{checkContent()}</div>;
}
