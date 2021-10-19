import React from "react";

import { useParams } from "react-router-dom";
import PageHeader from "../components/pageheader/PageHeader";
import MovieGrid from "../components/movie-grid/MovieGrid";

const Catalog = (props) => {
   const { category } = useParams();
   return (
      <>
         <div className="mb-2">
            <PageHeader category={category} />
         </div>
         <div className="section mb-2">
            <MovieGrid category={category} />
         </div>
      </>
   );
};

Catalog.propTypes = {};

export default Catalog;
