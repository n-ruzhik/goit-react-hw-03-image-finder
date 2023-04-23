import ImageGalleryItem from 'components/ImageGalleryItem';
import PropTypes from "prop-types";
import css from './ImageGallery.module.css';

export default function ImageGallery({ images, toggleOnLoading, openModal }) {
  return (
  <ul className={css.gallery}>
        {images.map(({ id, webformatURL, largeImageURL, tags }) => (
          <ImageGalleryItem
            key={id}
            openModal={openModal}
            toggleOnLoading={toggleOnLoading}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            tags={tags}
          />
        ))}
  </ul>    
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape).isRequired,
  toggleOnLoading: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
};