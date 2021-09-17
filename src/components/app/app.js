import React, { Component } from "react";
import { Col, Row, Container } from "reactstrap";
import Header from "../header";
import RandomItem from "../randomItem";
import ItemList from "../itemList";
import ItemDetails from "../itemDetails";

import { characters } from "../../constants/constants";

export default class App extends Component {
  state = {
    btn: { name: "hide", hide: true },
    itemId: null,
  };

  onHide = () => {
    this.setState((prevState) => {
      const {
        btn: { name, hide },
      } = prevState;
      return {
        btn: {
          name: name === "hide" ? "show" : "hide",
          hide: !hide,
        },
      };
    });
  };

  setItemId = (id) => {
    this.setState({
      itemId: id,
    });
  };

  render() {
    const {
      btn: { name, hide },
      itemId,
    } = this.state;

    return (
      <>
        <Container>
          <Header />
        </Container>
        <Container>
          <Row>
            <Col lg={{ size: 5, offset: 0 }}>
              {hide ? <RandomItem setReq={{url: characters, id: Math.floor(Math.random() * 140 + 1)}} options={['gender', 'born', 'died', 'culture']} /> : null}
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <button onClick={this.onHide}>{name}</button>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <ItemList setReq={{url: characters, page: 4}} type={'Characters'} setItemId={this.setItemId} />
            </Col>
            <Col md="6">
              <ItemDetails setReq={{url: characters, id: itemId}} options={['gender', 'born', 'died', 'culture']}/>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
