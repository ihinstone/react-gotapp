import React, { useState } from "react";

import { Col, Row, Container } from "reactstrap";
import Header from "../header";
import RandomItem from "../randomItem";
import ItemList from "../itemList";
import ItemDetails from "../itemDetails";

import { characters } from "../../constants/constants";

export const Characters = () => {
  const [btn, setBtn] = useState({ name: "hide", hide: true });
  const [itemId, setItemId] = useState(null);

  const { name, hide } = btn;

  const onHide = () => {
    setBtn({ name: name === "hide" ? "show" : "hide", hide: hide });
  };

  const getItemId = (id) => {
    setItemId(id);
  };

  return (
    <>
      <Container>
        <Header />
      </Container>
      <Container>
        <Row>
          <Col lg={{ size: 5, offset: 0 }}>
            {hide ? (
              <RandomItem
                setReq={{
                  url: characters,
                  id: Math.floor(Math.random() * 140 + 1),
                }}
                options={["gender", "born", "died", "culture"]}
              />
            ) : null}
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <button onClick={onHide}>{name}</button>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <ItemList
              setReq={{ url: characters, page: 4 }}
              type={"Characters"}
              getItemId={getItemId}
            />
          </Col>
          <Col md="6">
            <ItemDetails
              setReq={{ url: characters, id: itemId }}
              options={["gender", "born", "died", "culture"]}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};
