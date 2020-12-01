import React from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Header from "./Header";
import TV from "../Routers/TV";
import Search from "../Routers/Search";
import Movie from "../Routers/Movie";
import Detail from "../Routers/Detail";

// eslint-disable-next-line
export default () => (
  <Router>
    <div>
      <Header />
      <Switch>
        <Route path="/" exact component={Movie} />
        <Route path="/tv" component={TV} />
        <Route path="/search" component={Search} />
        <Route path="/movie/:id" component={Detail} />
        <Route path="/show/:id" component={Detail} />

        <Redirect from="*" to="/" />
      </Switch>
    </div>
  </Router>
);
