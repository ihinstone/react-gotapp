import React, { Component } from "react";
import { Col, Row, Container } from "reactstrap";
import Header from "../header";
import RandomChar from "../randomChar";
import ItemList from "../itemList";
import CharDetails from "../charDetails";

export default class App extends Component {
  constructor() {
    super();

    this.onHide = this.onHide.bind(this);
  }

  state = {
    name: "hide",
    hide: true,
  };

  onHide = () => {
    const { name, hide } = this.state;
    const newName = name === "hide" ? "show" : "hide";
    this.setState({
      name: newName,
      hide: !hide,
    });
  };

  render() {
    const { name, hide } = this.state;

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
              <ItemList />
            </Col>
            <Col md="6">
              <CharDetails />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
