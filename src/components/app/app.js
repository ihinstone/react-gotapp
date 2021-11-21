import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Container } from "reactstrap";
import Header from "../header";

import { Characters } from "../pages/characters";
import { Books } from "../pages/books";
import { Houses } from "../pages/houses";

export const App = () => {
  return (
    <Router>
      <>
        <Container>
          <Header />
        </Container>
        <Route path="/characters" component={Characters}>
          <Characters />;
        </Route>
        <Route path="/books" component={Books}>
          <Books />;
        </Route>
        <Route path="/houses" component={Houses}>
          <Houses />;
        </Route>
      </>
    </Router>
  );
};
