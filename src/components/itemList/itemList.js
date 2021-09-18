import React, { useState, useEffect } from "react";
import "./itemList.css";

import gotServicePage from "../../services/gotServicePage";

import Spiner from "../spiner";
import ErrorMessage from "../errorMessage/errorMessage";

export const ItemList = ({dataSettings, setItemId}) => {

  const [itemList, setItemList] = useState([{ name: "", id: "" }]);
  const [loading, setLoading] = useState(true);
  const[error, setError] = useState(false);

  useEffect(() => {
    gotServicePage(dataSettings).then((items) => {
     const nameList =[];
     items.map(({name}) => {
       return nameList.push({name})
     })
     setItemList(nameList);
     setLoading(false);
    }).catch(() => {
      setLoading(false);
      setError(!error);
    })
    console.log(itemList, loading, error);
  })

  const pushId = (e) => {
    setItemId(e.target.id);
  };

  const setContent = () => {

    return (
      <ul className="item-list list-group">
        {itemList.map(({ name, id }) => {
          return (
            <li
              onClick={pushId}
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
      return <ErrorMessage name={"Not found"} />;
    } else {
      return setContent();
    }
  };

  
  return <div className="random-block rounded">{checkContent()}</div>;
  
}
