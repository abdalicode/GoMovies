import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { useParams } from "react-router";

import tmdbApi from "../../api/tmdbApi";

const VideoList = (props) => {
   const { category } = useParams();
   const [videos, setVideos] = useState([]);
   useEffect(() => {
      const fetchVideos = async () => {
         const response = await tmdbApi.getVideos(category, props.id);
         setVideos(response.results.slice(0, 5));
      };
      fetchVideos();
   }, [props.id, category]);
   // .name .key
   return (
      <>
         {videos.map((item, i) => {
            const videoUrl = "https://youtube.com/embed/" + item.key;
            return (
               <div key={i} className="video mb-3">
                  <div className="section__header">
                     <h2>{item.name}</h2>
                  </div>
                  <iframe src={videoUrl} width="100%" height="500px" title="trailer"></iframe>
               </div>
            );
         })}
      </>
   );
};

VideoList.propTypes = {
   id: PropTypes.number,
};

export default VideoList;
