import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";
import "./modal.scss";
import { IoIosCloseCircle } from "react-icons/io";
const Modal = (props) => {
   const nodeRef = useRef();

   const [active, setActive] = useState(false);
   useEffect(() => {
      setActive(props.active);
   }, [props.active]);

   return (
      <CSSTransition
         in={active}
         classNames="modal-transition"
         timeout={400}
         unmountOnExit
         nodeRef={nodeRef}
      >
         <ModalContent
            setActive={setActive}
            variant="primary"
            nodeRef={nodeRef}
            dismissible
            setTrailerUrl={props.setTrailerUrl}
         >
            {props.children}
         </ModalContent>
      </CSSTransition>
   );
};

Modal.propTypes = {
   active: PropTypes.bool,
   id: PropTypes.string,
   setTrailerUrl: PropTypes.func,
   trailerUrl: PropTypes.string,
};

const ModalContent = (props) => {
   const { setTrailerUrl, nodeRef, variant } = props;
   return (
      <div
         className="modal"
         variant={variant}
         ref={nodeRef}
         onClick={() => {
            setTrailerUrl("");
         }}
      >
         <div
            className="modal__close"
            onClick={() => {
               props.setActive(false);
            }}
         >
            <IoIosCloseCircle />
         </div>
         <div
            className="modal__content"
            onClick={(e) => {
               e.stopPropagation();
            }}
         >
            {props.children}
         </div>
      </div>
   );
};

export default Modal;
