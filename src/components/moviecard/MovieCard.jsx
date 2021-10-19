import React from "react";
import PropTypes from "prop-types";
import { category } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import { IoLogoYoutube } from "react-icons/io";
import { Link } from "react-router-dom";
import Button from "../button/Button";
import "./moviecard.scss";
const MovieCard = (props) => {
   const { item } = props;
   const link = "/" + category[props.category] + "/" + item.id;
   const backgroundImage = apiConfig.w500Image(item.poster_path || item.backdrop_path);
   return (
      <Link to={link}>
         <div className="movie-card" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <Button className="movie-card--btn">
               <IoLogoYoutube />
            </Button>
         </div>
         <h3 className="movie-card--title">{item.title || item.name}</h3>
      </Link>
   );
};

MovieCard.propTypes = {
   item: PropTypes.object,
   category: PropTypes.string,
};

export default MovieCard;
