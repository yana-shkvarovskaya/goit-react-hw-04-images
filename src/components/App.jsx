import React, { useState } from "react";
import { ToastContainer } from 'react-toastify';
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import 'index.css'

export default function App () {
  const [pictureName, setPictureName] = useState('');


 const handleFormSubmit = pictureName => {
    setPictureName(pictureName );
  };
    return (
      <div className="App">
        <Searchbar onSubmit={handleFormSubmit} />
        <ImageGallery pictureName={pictureName}/>
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
