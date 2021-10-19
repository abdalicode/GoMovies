import React from "react";
import PropTypes from "prop-types";

import "./pageheader.scss";

import { category } from "../../api/tmdbApi";

import bg from "../../assets/footer-bg.jpg";

const PageHeader = (props) => {
   const title = () => {
      if (props.category === category.tv) {
         return "TV Series";
      } else if (props.category === category.movie) {
         return "Movies";
      } else {
         return "not fined";
      }
   };
   return (
      <div className="page-header" style={{ backgroundImage: `url(${bg})` }}>
         <div className="container">
            <h2>{title()}</h2>
         </div>
      </div>
   );
};

PageHeader.propTypes = {
   category: PropTypes.string,
};

export default PageHeader;
