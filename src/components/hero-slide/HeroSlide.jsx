import React, { useEffect, useState } from "react";

import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import tmdbApi, { category, movieType } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";

import "./hero-slide.scss";
import { Link } from "react-router-dom";

import Button, { OutlineButton } from "../button/Button";
import Modal from "../modal/Modal";

const HeroSlide = () => {
   SwiperCore.use([Autoplay]);
   const [movieItems, setMovieItems] = useState([]);
   const [trailerUrl, setTrailerUrl] = useState("");
   useEffect(() => {
      const fetchMovies = async () => {
         const params = { page: 1 };
         try {
            const response = await tmdbApi.getMoviesList(movieType.popular, { params });
            setMovieItems(response.results.slice(1, 8));
         } catch {
            console.log("error fetching data");
         }
      };
      fetchMovies();
   }, []);
   return (
      <>
         <div className="hero-slide">
            <Swiper
               moddules={[Autoplay]}
               grabCursor={true}
               spaceBetween={0}
               slidesPerView={1}
               // autoplay={{ deley: 3000 }}
               loop={true}
            >
               {movieItems.map((item, i) => {
                  return (
                     <SwiperSlide key={i}>
                        {({ isActive }) => (
                           <HeroSlideItem
                              item={item}
                              className={isActive ? "active" : ""}
                              setTrailerUrl={setTrailerUrl}
                           />
                        )}
                     </SwiperSlide>
                  );
               })}
            </Swiper>
         </div>
         <Modal
            active={trailerUrl ? true : false}
            trailerUrl={trailerUrl}
            setTrailerUrl={setTrailerUrl}
         >
            <iframe src={trailerUrl} width="100%" height="500px" title="trailer"></iframe>
         </Modal>
      </>
   );
};

const HeroSlideItem = (props) => {
   const { item, setTrailerUrl } = props;
   const background = apiConfig.originalImage(item.backdrop_path || item.poster_path);

   const trailerActivator = async () => {
      let videoSrc;
      const video = await tmdbApi.getVideos(category.movie, item.id);
      if (video.results.length > 0) {
         videoSrc = "https://www.youtube.com/embed/" + video.results[0].key;
      }
      setTrailerUrl(videoSrc);
   };
   return (
      <>
         <div
            className={`hero-slide__item ${props.className} `}
            style={{ backgroundImage: `url(${background})` }}
         >
            <div className="hero-slide__item__content container">
               <div className="hero-slide__item__content__info">
                  <h2 className="title">{item.title || item.name}</h2>
                  <div className="overview">{item.overview}</div>
                  <div className="btns">
                     <Link to={category.movie + "/" + item.id}>
                        <Button>Watch now</Button>
                     </Link>
                     <OutlineButton
                        onClick={(e) => {
                           trailerActivator();
                        }}
                     >
                        Watch trailer
                     </OutlineButton>
                  </div>
               </div>
               <div className="hero-slide__item__content__poster">
                  <img src={apiConfig.w500Image(item.poster_path)} alt=""></img>
               </div>
            </div>
         </div>
      </>
   );
};

export default HeroSlide;
