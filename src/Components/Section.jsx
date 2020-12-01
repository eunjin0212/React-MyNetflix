import React from "react";
import PropTypes from "prop-types";
import "../static/css/Section.css";

const Section = ({ title, children }) => (
  <>
    <div className="section">
      <div className="section_title">{title}</div>
      <div className="section_child">{children}</div>
    </div>
  </>
);

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Section;
