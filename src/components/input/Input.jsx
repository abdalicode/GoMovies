import React from "react";

import "./input.scss";

const Input = (props) => {
   return (
      <input className="input" {...props}>
         {props.children}
      </input>
   );
};

export default Input;
