import React, { useRef, useEffect } from "react";
import "./header.scss";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.svg";

const headerNav = [
   { display: "Home", path: "/" },
   { display: "Movies", path: "/movie" },
   { display: "TV Series", path: "/tv" },
];

const Header = () => {
   const headerRef = useRef();
   const { pathname } = useLocation();
   const active = headerNav.findIndex((e) => e.path === pathname);

   useEffect(() => {
      const shrinkHeader = () => {
         if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            headerRef.current.classList.add("shrink");
         } else {
            headerRef.current.classList.remove("shrink");
         }
      };
      window.addEventListener("scroll", shrinkHeader);
      return () => {
         window.removeEventListener("scroll", shrinkHeader);
      };
   }, []);

   return (
      <div className="header" ref={headerRef}>
         <div className="header__wrap container">
            <div className="logo">
               <img src={logo} alt="" />
               <Link to="/">Go Movies</Link>
            </div>
            <ul className="header__nav">
               {headerNav.map((e, i) => (
                  <li key={i} className={i === active ? "active" : ""}>
                     <Link to={e.path}>{e.display}</Link>
                  </li>
               ))}
            </ul>
         </div>
      </div>
   );
};

export default Header;
