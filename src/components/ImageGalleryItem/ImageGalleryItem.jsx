import PropTypes from "prop-types";
import css from './ImageGalleryItem.module.css';



export default function ImageGalleryItem({
  openModal,
  toggleOnLoading,
  webformatURL,
  largeImageURL,
  tags = "photo",
  }) { 
  
  return (
    <li className={css.ImageGalleryItem}>
      <img
        onClick={(event) => {
          openModal(event.target.dataset.large);
          toggleOnLoading();
        }}
        src={webformatURL}
        data-large={largeImageURL}
        alt={tags}
        className={css.ImageGalleryItem__image}
      />
    </li>)
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  toggleOnLoading: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};
