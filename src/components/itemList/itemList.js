import React, { Component } from "react";
import "./itemList.css";

import gotServicePage from "../../services/gotServicePage";
import getComponent from "../../utils/getComponent";
import { getApiId } from "../../utils/getApiId";

import Spiner from "../spiner";
import ErrorMessage from "../errorMessage/errorMessage";

import { characters } from "../../constants/constants";

export default class ItemList extends Component {
  state = {
    itemList: [{ name: "", id: "" }],
    loading: true,
    error: false,
  };

  setData = (page) => {
    return gotServicePage({
      url: characters,
      page: 4,
    })
      .then((items) => {
        const nameList = [];
        items.map(({ name, url }) => {
          return nameList.push({ name, id: getApiId(url) });
        });
        console.log(nameList);
        this.setState({
          itemList: nameList,
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

  pushId = (id) => {
    const { setItemId } = this.props;
    setItemId(id);
  };

  setContent = () => {
    const { itemList } = this.state;

    return (
      <ul className="item-list list-group">
        {itemList.map(({ name, id }) => {
          return (
            <li
              onClick={() => this.pushId(id)}
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

  checkContent = () => {
    const { loading, error } = this.state;

    if (loading) {
      return getComponent(<Spiner />);
    } else if (error) {
      return getComponent(<ErrorMessage name={"Characters not found"} />);
    } else {
      return this.setContent();
    }
  };

  componentDidMount() {
    this.setData();
  }

  render() {
    return <div className="random-block rounded">{this.checkContent()}</div>;
  }
}
