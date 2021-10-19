import React, { useEffect, useState } from "react";

import { useParams } from "react-router";

import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";

import "./detail.scss";
import Casts from "./Casts";

import MovieList from "../../components/movielist/MovieList";
import VideoList from "../../components/videolist/VideoList";

const Detail = (props) => {
   const { category, id } = useParams();
   const [item, setItem] = useState(null);

   useEffect(() => {
      const fetchMovie = async () => {
         const response = await tmdbApi.detail(category, id, { params: {} });
         setItem(response);
         window.scrollTo(0, 0);
      };
      fetchMovie();
   }, [category, id]);
   return (
      <>
         {item && (
            <>
               <div
                  className="movie-detail"
                  style={{ backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path)})` }}
               >
                  <div className="movie-detail__overlay">
                     <div className="movie-detail__container container">
                        <div className="movie-detail__poster">
                           <img
                              src={apiConfig.w500Image(item.poster_path || item.backdrop_path)}
                              alt=""
                           />
                        </div>
                        <div className="movie-detail__info">
                           <h1 className="movie-detail__title">{item.name || item.title}</h1>
                           <div className="movie-detail__genres">
                              {item.genres.map((genre, i) => {
                                 return <span key={i}>{genre.name}</span>;
                              })}
                           </div>
                           <p className="movie-detail__overview mb-2">{item.overview}</p>
                           <div className="cast">
                              <div className="section__header">
                                 <h2>Casts</h2>
                              </div>
                              <Casts id={item.id} />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="container">
                  <div className="section mb-3">
                     <VideoList id={item.id} />
                  </div>
                  <div className="section mb-3">
                     <div className="section__header mb-2">
                        <h2>Similar</h2>
                     </div>
                     <MovieList category={category} type="similar" id={item.id}></MovieList>
                  </div>
               </div>
            </>
         )}
      </>
   );
};

Detail.propTypes = {};

export default Detail;
