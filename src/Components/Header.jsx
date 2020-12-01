import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import "../static/css/Header.css";
import logo from "../static/images/netflixlogo.png";

const SLink = styled(Link)``;
// eslint-disable-next-line
export default withRouter(({ location: { pathname } }) => (
  <div>
    <header className="nav_header">
      <ul className="nav_ul">
        <li className="nav_list">
          <img src={logo} alt="logo" className="logo" />
        </li>

        <li className="nav_list" current={pathname === "/"}>
          <SLink to="/" className="link">
            Movie
          </SLink>
        </li>
        <li className="nav_list" current={pathname === "/tv"}>
          <SLink to="/tv" className="link">
            TV Show
          </SLink>
        </li>
        <li className="nav_list" current={pathname === "/search"}>
          <SLink to="/search" className="link">
            Search
          </SLink>
        </li>
      </ul>
    </header>
  </div>
));
