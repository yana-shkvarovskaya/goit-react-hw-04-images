import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import './Searchbar.css';

export default function Searchbar({ onSubmit }) {
  const [pictureName, setPictureName] = useState('');

  const handleNameChange = event => {
    setPictureName(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (pictureName.trim() === '') {
      toast.error('Add picture name');
      return;
    }

    onSubmit(pictureName);
    setPictureName('');
  };
  return (
    <header className="Searchbar">
      <form onSubmit={handleSubmit} className="SearchForm">
        <button type="submit" className="SearchForm-button">
          <ImSearch style={{ marginRight: 8 }} />
          <span className="SearchForm-button-label">Search</span>
        </button>
        <input
          className="SearchForm-input"
          name="pictureName"
          value={pictureName}
          onChange={handleNameChange}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  pictureName: PropTypes.string,
  handleNameChange: PropTypes.func,
  handleSubmit: PropTypes.func,
};
