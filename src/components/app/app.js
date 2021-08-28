import React, { Component } from "react";
import { Col, Row, Container } from "reactstrap";
import Header from "../header";
import RandomChar from "../randomChar";
import ItemList from "../itemList";
import CharDetails from "../charDetails";

export default class App extends Component {
  state = {
    btn: { name: "hide", hide: true },
    itemId: null,
  };

  onHide = () => {
    const {
      btn: { name, hide },
    } = this.state;
    const newName = name === "hide" ? "show" : "hide";
    this.setState({
      btn: {
        name: newName,
        hide: !hide,
      },
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
              {hide ? <RandomChar /> : null}
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <button onClick={this.onHide}>{name}</button>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <ItemList setItemId={this.setItemId} />
            </Col>
            <Col md="6">
              <CharDetails id={itemId} />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
