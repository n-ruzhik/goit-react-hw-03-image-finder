import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from 'components/Searchbar';
import api from '../services/PixabyApiService';
import ImageGallery from 'components/ImageGallery';
import Modal from 'components/Modal';
import Loader from 'components/Loader';
import Button from 'components/Button';

import css from './App.module.css';

// const Status = {
//   IDLE: 'idle',
//   PENDING: 'pending',
//   RESOLVED: 'resolved',
//   REJECTED: 'rejected',
//   LOADING: 'loading',
// };

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    error: '',
    showModal: false,
    showBtn: false,
    urlModal: '',
    onLoading: false,
    totalHits: null,
    isEmpty: false,
  };

  onRenderImages(query, page) {
    this.setState({
      onLoading: true,
    });

    api
      .fetchImage(query, page)
      .then(({ hits, totalHits }) => {
        if (!hits.length) {
          this.setState({
            isEmpty: true,
          });
          return;
        }
        this.setState({
          images: [...this.state.images, ...hits],
          showBtn: this.state.page < Math.ceil(totalHits / 12),
        });
      })
      .catch(error => {
        this.setState({ error: `${error}` });
      })
      .finally(() => this.setState({ onLoading: false }));
  }

  componentDidUpdate(prevProps, prevState) {
    const newQuery = this.state.query;
    const newPage = this.state.page;

    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.onRenderImages(newQuery, newPage);
    }
  }

  openModal = url => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      urlModal: url,
    }));
  };

  closeModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      urlModal: '',
    }));
  };

  toggleOnLoading = () => {
    this.setState(({ onLoading }) => ({ onLoading: !onLoading }));
  };

  handleFormSubmit = query => {
    this.setState({
      images: [],
      query,
      page: 1,
      showBtn: false,
      total: 'null',
      error: '',
      isEmpty: false,
    });
  };

  handleIncrement = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  render() {
    const { images, error, onLoading, showModal, urlModal, isEmpty } =
      this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <div>
          {isEmpty && (
            <p className={css.error}>Sorry, nothing found for your request</p>
          )}
          {error && <p className={css.error}>{error}</p>}
          <>
            <ImageGallery
              images={images}
              openModal={this.openModal}
              toggleOnLoading={this.toggleOnLoading}
            />
            {this.state.showBtn && (
              <Button handleIncrement={this.handleIncrement} />
            )}
          </>

          {onLoading && <Loader />}
        </div>
        {showModal && (
          <Modal onClose={this.closeModal}>
            <img
              onLoad={this.toggleOnLoading}
              src={urlModal}
              alt=""
              width="900px"
              height="600px"
              className={css.modalImage}
            />
          </Modal>
        )}
        <ToastContainer autoClose={1500} />
      </div>
    );
  }
}
