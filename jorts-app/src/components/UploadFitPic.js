import React, { useState } from 'react';
import axios from 'axios';

const UploadFitPic = () => {
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('fitPic', image);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData);
      console.log('Image uploaded:', response.data.filePath);
    } catch (err) {
      console.error('Upload Error:', err);
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload Fit Pic</button>
    </form>
  );
};

export default UploadFitPic;
