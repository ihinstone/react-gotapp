import React, { useState } from "react";

import { Col, Row, Container } from "reactstrap";
import RandomItem from "../randomItem";
import ItemList from "../itemList";
import ItemDetails from "../itemDetails";

import { houses } from "../../constants/constants";

export const Houses = () => {
  const [btn, setBtn] = useState({ name: "hide", hide: true });
  const [itemId, setItemId] = useState(null);

  const { name, hide } = btn;

  const onHide = () => {
    setBtn({ name: name === "hide" ? "show" : "hide", hide: !hide });
  };

  const getItemId = (id) => {
    setItemId(id);
  };

  return (
    <>
      <Container>
        <Row>
          <Col lg={{ size: 5, offset: 0 }}>
            {hide ? (
              <RandomItem
                setReq={{
                  url: houses,
                  id: Math.floor(Math.random() * 377 + 1),
                }}
                options={["region", "words", "titles"]}
                type={"House"}
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
              setReq={{ url: houses, page: 2 }}
              type={"House"}
              getItemId={getItemId}
            />
          </Col>
          <Col md="6">
            <ItemDetails
              setReq={{ url: houses, id: itemId }}
              options={["region", "words", "titles"]}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};
