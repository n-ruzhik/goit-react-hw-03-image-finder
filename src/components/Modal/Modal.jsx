import { Component } from "react";
import { createPortal } from "react-dom";
import { ReactComponent as CloseIcon } from '../../icons/close.svg';
import css from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

export default class Modal extends Component {
    
    componentDidMount() {
       window.addEventListener("keydown", this.handleKeyDown);
    }

    componentWillUnmount() {
       window.removeEventListener("keydown", this.handleKeyDown);
    }

    handleKeyDown = (event) => {
       if (event.code === "Escape") {
           this.props.onClose();
        }
    };

    handleBackdropClick = (event) => {
       if (event.currentTarget === event.target) {
           this.props.onClose();
       }
  };

    render() {
       return createPortal(
        <div className={css.backdrop} onClick={this.handleBackdropClick}>
        <div className={css.content}>
          <button
            type="button"
            className={css.closeButton}
            onClick={this.props.onClose}>
               <CloseIcon width="20" height="20" fill="#1DA1F2" className={css.closeIcon} />
          </button>
          {this.props.children}
        </div>
        </div>,
      modalRoot
    );
  }
}