import React, { useState, useEffect } from 'react';

function UploadPage() {
  const [image, setImage] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [dailyUpload, setDailyUpload] = useState(false);

  useEffect(() => {
    const lastUploadDate = localStorage.getItem('lastUploadDate');
    const today = new Date().toLocaleDateString();
    if (lastUploadDate === today) {
      setDailyUpload(true);
    }
  }, []);

  const handleImageUpload = (e) => {
    if (!dailyUpload) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result);
          setUploadSuccess(true);
          setDailyUpload(true);
          localStorage.setItem('lastUploadDate', new Date().toLocaleDateString());
        };
        reader.readAsDataURL(file);
      }
    } else {
      alert('You can only upload one outfit per day!');
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Your Outfit</h2>
      {uploadSuccess ? (
        <p>Image uploaded successfully!</p>
      ) : (
        <div>
          <input type="file" onChange={handleImageUpload} disabled={dailyUpload} />
          {dailyUpload && <p>You have already uploaded an outfit today!</p>}
        </div>
      )}
      {image && <img src={image} alt="Uploaded outfit" style={{ width: '200px', marginTop: '20px' }} />}
    </div>
  );
}

export default UploadPage;
