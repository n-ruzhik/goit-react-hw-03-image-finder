import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from "components/Searchbar";
import api from "../services/PixabyApiService";
import ImageGallery from 'components/ImageGallery';
import Modal from "components/Modal";
import Loader from "components/Loader";
import Button from "components/Button";

import css from './App.module.css';


const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
  LOADING: 'loading',
};

export class App extends Component  {
  state = {
    query: "",
    images: [],
    page: 1,
    error: "",
    status: Status.IDLE,
    total: null,
    showModal: false,
    urlModal: "",
    onLoading: false,
  }
  
  onRenderImages(query, page) {
    api
      .fetchImage(query, page)
      .then(({ hits, total }) => {
        this.setState({
          images: [...this.state.images, ...hits],
          total: total / 12 > 500 ? 500 : total / 12,
        });

        hits[0]
          ? this.setState({ status: Status.RESOLVED })
          : this.setState({
              status: Status.REJECTED,
              error:
                "Sorry, nothing found for your request",
            });
      })
      .catch((message) => {
        this.setState({ status: Status.REJECTED, error: `${message}` });
      });
    }

  componentDidUpdate(prevProps, prevState) {
    const newQuery = this.state.query;
    const newPage = this.state.page;

    if (this.state.status === Status.LOADING) {
      this.setState({ error: "", status: Status.PENDING });
      this.onRenderImages(newQuery, newPage);
    }

    if (this.state.status !== Status.LOADING && prevState.page !== newPage) {
      this.setState({ error: "" });
      this.onRenderImages(newQuery, newPage);
    }

  }
 
  openModal = (url) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      urlModal: url,
    }));
  };

  closeModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      urlModal: "",
    }));
  };

  toggleOnLoading = () => {
    this.setState(({ onLoading }) => ({ onLoading: !onLoading }));
  };

  handleFormSubmit = (query) => {
    this.setState({
      images: [],
      query,
      page: 1,
      status: Status.LOADING,
      total: "null",
    });
  };

  handleIncrement = () => {
    this.setState({ page: this.state.page + 1 });
  };

  render() {
    const {
      query,
      images,
      page,
      error,
      status,
      total,
      onLoading,
      showModal,
      urlModal, } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
       <div>
            {status === "idle" && (
              <p className={css.request}>Please, enter your request!</p>
            )}

            {status === "rejected" && (
              <p className={css.error}>{error}</p>
            )}
            {status === "resolved" && (
              <>
                <p className={css.find}>
                  Results for "{query}"
                </p>
                <ImageGallery
                  images={images}
                  openModal={this.openModal}
                  toggleOnLoading={this.toggleOnLoading}
                />
                {page < total && (
                  <Button handleIncrement={this.handleIncrement} />
                )}
              </>
            )}
            {status === "pending" && <Loader />}
          </div>
        {showModal && (
          <Modal onClose={this.closeModal}>
            {onLoading && <Loader />}
            <img
              onLoad={this.toggleOnLoading}
              src={urlModal}
              alt=""
              width='900px'
              height='600px'
              className={css.modalImage}
            />
          </Modal>)
        }
        <ToastContainer autoClose={2000} />
    </div>
  );
  }
}

