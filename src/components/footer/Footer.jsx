import React from "react";
import { Link } from "react-router-dom";
import "./footer.scss";
import logo from "../../assets/logo.svg";
import bg from "../../assets/footer-bg.jpg";
const Footer = () => {
   return (
      <div className="footer" style={{ backgroundImage: `url(${bg})` }}>
         <div className="footer__content container">
            <div className="footer__content__header">
               <div className="footer__content__header__logo">
                  <img src={logo} alt="" />
                  <Link to="/">Go Movies</Link>
               </div>
            </div>
            <div className="footer__content__menus">
               <ul className="footer__content__menu">
                  <Link to="/">Home</Link>
                  <Link to="/">Contact us</Link>
                  <Link to="/">Term of services</Link>
                  <Link to="/">About us</Link>
               </ul>
               <ul className="footer__content__menu">
                  <Link to="/">Live</Link>
                  <Link to="/">FAQ</Link>
                  <Link to="/">Premium</Link>
                  <Link to="/">Pravacy policy</Link>
               </ul>
               <ul className="footer__content__menu">
                  <Link to="/">You must watch</Link>
                  <Link to="/">Recent release</Link>
                  <Link to="/">Top IMDB</Link>
               </ul>
            </div>
         </div>
      </div>
   );
};

export default Footer;
