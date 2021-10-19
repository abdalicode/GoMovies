import React from 'react'
import HeroSlide from "../components/hero-slide/HeroSlide";
import { Link } from "react-router-dom";
import { category, movieType, tvType } from "../api/tmdbApi";
import { OutlineButton } from "../components/button/Button";
import MovieList from "../components/movielist/MovieList";
const Home = () => {
   return (
      <>
         <HeroSlide />
         <div className="section container mb-3">
            <div className="section__header mb-2">
               <h2>Trending Movies</h2>
               <Link to="/movies">
                  <OutlineButton className="small">View more</OutlineButton>
               </Link>
            </div>
            <MovieList category={category.movie} type={movieType.popular} />
         </div>
         <div className="section container mb-3">
            <div className="section__header mb-2">
               <h2>Top Rated Movies</h2>
               <Link to="/movies">
                  <OutlineButton className="small">View more</OutlineButton>
               </Link>
            </div>
            <MovieList category={category.movie} type={movieType.top_rated} />
         </div>
         <div className="section container mb-3">
            <div className="section__header mb-2">
               <h2>Trending TV</h2>
               <Link to="/tv">
                  <OutlineButton className="small">View more</OutlineButton>
               </Link>
            </div>
            <MovieList category={category.tv} type={tvType.popular} />
         </div>
         <div className="section container mb-3">
            <div className="section__header mb-2">
               <h2>Top Rated TV</h2>
               <Link to="/tv">
                  <OutlineButton className="small">View more</OutlineButton>
               </Link>
            </div>
            <MovieList category={category.tv} type={tvType.top_rated} />
         </div>
      </>
   );
};

export default Home
