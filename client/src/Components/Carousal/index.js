import React, { useState, useEffect } from 'react';
import './index.css'

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const images = [
    '/images/img_desktop_banner_devotees.webp',
    '/images/img_desktop_banner_puja.webp',
    '/images/img_desktop_banner_review.webp'
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const toggleAutoPlay = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    let intervalId;
    if (isPlaying) {
      intervalId = setInterval(() => {
        nextSlide();
      }, 3000); // Change slide every 3 seconds
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPlaying]);

  return (
    <div style={{"padding": "30px"}}>
    <h1 className="puja-heading">Perform your Puja as per Vedic rituals at Famous Hindu Temples in India with Sri Mandir</h1>
       
    <div className="carousel-wrapper">
      <div className="carousel-container">
        <div className="slide-container">
          <div 
            className="slide-wrapper"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {images.map((src, index) => (
              <img key={index} src={src} alt={`Slide ${index + 1}`} className="slide" />
            ))}
          </div>
        </div>
        <button 
          onClick={toggleAutoPlay} 
          className="play-pause-button"
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
      </div>
      <div className="dots-container">
        {images.map((_, index) => (
          <button
            key={index}
            className={`dot ${currentIndex === index ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            alt="dot"
            type="button"
          />
        ))}
      </div>
    </div>
    </div>
  );
};

export default Carousel;