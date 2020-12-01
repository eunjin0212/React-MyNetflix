import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "../static/css/Poster.css";

const Poster = ({ id, imageUrl, title, rating, year, isMovie = false }) => (
  <Link to={isMovie ? `/movie/${id}` : `/show/${id}`}>
    <div className="poster-container">
      <div className="poster-image_container">
        <img
          className="poster_image"
          alt="image"
          src={
            `https://image.tmdb.org/t/p/w300${imageUrl}`
            //   : require("../static/images/noPosterSmall.png")
          }
        />
        <div className="poster-rating">
          <span role="img" aria-label="rating">
            ⭐️
          </span>{" "}
          {rating}/10
        </div>
      </div>
      <span className="poster-title">
        {title.length > 18 ? `${title.substring(0, 18)}...` : title}
      </span>
      <span className="poster-year">{year}</span>
    </div>
  </Link>
);

Poster.propTypes = {
  id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  rating: PropTypes.number,
  year: PropTypes.string,
  isMovie: PropTypes.bool,
};

export default Poster;
