import React from "react";

import { Route, Switch } from "react-router-dom";

import Home from "../pages/Home";
import Detail from "../pages/detail/Detail";
import Catalog from "../pages/Catalog";

const Routes = () => {
   return (
      <Switch>
         <Route path="/" exact component={Home} />
         <Route path="/:category/:id" exact component={Detail} />
         <Route path="/:category" exact component={Catalog} />
         <Route path="/:category/search/:keyword" exact component={Catalog} />
      </Switch>
   );
};

export default Routes;
