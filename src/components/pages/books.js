import React, { useState } from "react";

import { Col, Row, Container } from "reactstrap";
import RandomItem from "../randomItem";
import ItemList from "../itemList";
import ItemDetails from "../itemDetails";

import { books } from "../../constants/constants";

export const Books = () => {
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
                  url: books,
                  id: Math.floor(Math.random() * 7 + 1),
                }}
                options={["isbn", "country", "publisher", "authors"]}
                type={"Book"}
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
              setReq={{ url: books, page: 1 }}
              type={"Books"}
              getItemId={getItemId}
            />
          </Col>
          <Col md="6">
            <ItemDetails
              setReq={{ url: books, id: itemId }}
              options={["isbn", "country", "publisher", "authors"]}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};
