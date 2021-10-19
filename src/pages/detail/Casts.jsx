import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { useParams } from "react-router";

import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";

const Casts = (props) => {
   const { category } = useParams();
   const [casts, setCasts] = useState([]);
   useEffect(() => {
      const getCredits = async () => {
         const response = await tmdbApi.credits(category, props.id);
         setCasts(response.cast.slice(0, 5));
      };
      getCredits();
   }, [category, props.id]);
   return (
      <div className="casts">
         {casts.map((cast, i) => {
            if (!cast.profile_path) return "";
            return (
               <div key={i} className="casts__item">
                  <img
                     src={apiConfig.w500Image(cast.profile_path)}
                     alt=""
                     className="casts__item__img"
                  />
                  <p className="casts__item__name">{cast.name}</p>
               </div>
            );
         })}
      </div>
   );
};

Casts.propTypes = {
   id: PropTypes.number,
};

export default Casts;
