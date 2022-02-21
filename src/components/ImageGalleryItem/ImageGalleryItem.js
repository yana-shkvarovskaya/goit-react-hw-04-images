import React, { useState } from 'react';
import Modal from 'components/Modal/Modal';
import PropTypes from 'prop-types';

import './ImageGalleryItem.css';

export default function ImageGalleryItem({ picture }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <li key={picture.id} className="ImageGalleryItem">
      <img
        onClick={toggleModal}
        src={picture.webformatURL}
        alt=""
        className="ImageGalleryItem-image"
      />
      {showModal && (
        <Modal
          onClose={toggleModal}
          src={picture.largeImageURL}
          alt={picture.tags}
        />
      )}
    </li>
  );
}

ImageGalleryItem.propTypes = {
  showModal: PropTypes.func,
};
