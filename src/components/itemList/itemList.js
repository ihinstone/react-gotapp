import React, { Component } from "react";
import "./itemList.css";

import gotServicePage from "../../services/gotServicePage";
import getComponent from "../../utils/getComponent";

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
        let nameList = [];
        items.forEach(({ name }, i) => {
          nameList.push({ name, id: 31 + i });
        });
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

  pushId = (e) => {
    const { setItemId } = this.props;
    setItemId(e.target.id);
  };

  setContent = () => {
    const { itemList } = this.state;

    return (
      <ul className="item-list list-group">
        {itemList.map(({ name, id }) => {
          return (
            <li
              onClick={this.pushId}
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
