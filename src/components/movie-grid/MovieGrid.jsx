import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import tmdbApi, { category as cat, movieType, tvType } from "../../api/tmdbApi";

import "./movie-grid.scss";
import Input from "../input/Input";
import Button from "../button/Button";
import { useHistory, useParams } from "react-router";
import MovieCard from "../moviecard/MovieCard";

const MovieGrid = (props) => {
   const [items, setItems] = useState([]);
   const [totalPages, setTotalPages] = useState();
   const [page, setPage] = useState(1);
   const { category, keyword } = useParams();

   useEffect(() => {
      const fetchMOvies = async () => {
         let params = {};
         let response;
         if (keyword === undefined) {
            switch (category) {
               case cat.movie:
                  response = await tmdbApi.getMoviesList(movieType.popular, { params });
                  break;
               default:
                  response = await tmdbApi.getTvList(tvType.popular, { params });
            }
         } else {
            params = {
               query: keyword,
            };
            response = await tmdbApi.search(category, { params });
         }
         setItems(response.results);
         setTotalPages(response.total_pages);
      };

      fetchMOvies();
   }, [category, keyword]);
   const showMore = async () => {
      let params = { page: page + 1 };
      let response;
      if (keyword === undefined) {
         switch (category) {
            case cat.movie:
               response = await tmdbApi.getMoviesList(movieType.popular, { params });
               break;
            default:
               response = await tmdbApi.getTvList(tvType.popular, { params });
         }
      } else {
         params = {
            query: keyword,
            page: page + 1,
         };
         response = await tmdbApi.search(category, { params });
      }
      setItems([...items, ...response.results]);
      setPage(page + 1);
   };
   return (
      <>
         <div className="container mb-3">
            <div className="section mb-2">
               <div className="section__header">
                  <Search category={props.category} />
               </div>
            </div>
            <div className="section mb-2">
               <div className="movie-grid">
                  {items &&
                     items.map((item, i) => {
                        if (!item.backdrop_path || !item.poster_path) return "";
                        return (
                           <React.Fragment key={i}>
                              <MovieCard item={item} category={category}></MovieCard>
                           </React.Fragment>
                        );
                     })}
               </div>
            </div>
            {page < totalPages && (
               <div className="show-more">
                  <Button
                     className="small"
                     onClick={() => {
                        showMore();
                     }}
                  >
                     Show More
                  </Button>
               </div>
            )}
         </div>
      </>
   );
};

MovieGrid.propTypes = {
   category: PropTypes.string,
};

const Search = (props) => {
   const [value, setValue] = useState();

   const history = useHistory();

   const getSearch = () => {
      history.push("/" + props.category + "/search/" + value);
   };
   return (
      <form
         className="search-form"
         onChange={(e) => {
            setValue(e.target.value);
         }}
         value={value}
         onSubmit={(e) => {
            e.preventDefault();
            if (!value) return;
            getSearch();
         }}
      >
         <Input placeholder="Enter Keywoard" type="text" />
         <Button type="submit" className="small">
            Search
         </Button>
      </form>
   );
};
Search.propTypes = {
   category: PropTypes.string,
};
export default MovieGrid;
