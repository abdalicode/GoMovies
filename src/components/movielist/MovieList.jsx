import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import tmdbApi from "../../api/tmdbApi";
import "./movielist.scss";
import { SwiperSlide, Swiper } from "swiper/react";
import MovieCard from "../moviecard/MovieCard";

const MovieList = (props) => {
   const [movieItems, setMovieItems] = useState([]);
   useEffect(() => {
      const fetchMovies = async () => {
         let response;
         const params = {};
         if (props.type !== "similar") {
            switch (props.category) {
               case "movie":
                  response = await tmdbApi.getMoviesList(props.type, { params });
                  break;
               default:
                  response = await tmdbApi.getTvList(props.type, { params });
            }
         } else {
            response = await tmdbApi.similar(props.category, props.id);
         }
         setMovieItems(response.results);
      };
      fetchMovies();
   }, [props]);
   return (
      <div className="movie-list">
         <Swiper grabCursor={true} spaceBetween={10} slidesPerView={"auto"}>
            {movieItems.map((item, i) => {
               return (
                  <SwiperSlide key={i}>
                     <MovieCard item={item} category={props.category} />
                  </SwiperSlide>
               );
            })}
         </Swiper>
      </div>
   );
};

MovieList.propTypes = {
   category: PropTypes.string,
   type: PropTypes.string,
   id: PropTypes.number,
};

export default MovieList;
