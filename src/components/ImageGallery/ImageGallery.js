import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button/Button';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import api from 'services/apiService';
import './ImageGallery.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function ImageGallery({ pictureName }) {
  const [pictures, setPictures] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const handleRenderPage = async () => {
      if (!pictureName) {
        return;
      }
      setStatus(Status.PENDING);
      setPage(1);

      try {
        const { hits } = await api.fetchImages(pictureName);
        setPictures([...hits]);
        setPage(prevState => prevState + 1);
        setStatus(Status.RESOLVED);
      } catch (e) {
        setStatus(Status.REJECTED);
      }
    };
    handleRenderPage();
  }, [pictureName]);

  const handleAddPage = async () => {
    try {
      const { hits } = await api.fetchImages(pictureName, page);
      setPictures([...pictures, ...hits]);
      setStatus(Status.RESOLVED);
      setPage(prevState => prevState + 1);
    } catch (e) {
      setStatus(Status.REJECTED);
    }
  };

  return (
    <>
      {status === 'idle' && (
        <p className="Phrase">Enter the word to start the search</p>
      )}

      {status === 'pending' && <Loader />}

      {!pictures.length && status === 'resolved' && (
        <p className="Phrase">No results</p>
      )}

      {pictures.length !== 0 && status === 'resolved' && (
        <>
          <ul className="ImageGallery">
            {pictures.map(picture => (
              <ImageGalleryItem picture={picture} key={picture.id} />
            ))}
          </ul>
          <Button onClick={handleAddPage} />
        </>
      )}
    </>
  );
}

ImageGallery.propTypes = {
  pictures: PropTypes.array,
  handleRenderPage: PropTypes.func,
  handleAddPage: PropTypes.func,
};
