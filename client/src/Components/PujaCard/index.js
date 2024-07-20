import React from 'react';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';
import './index.css';

const PujaCard = ({ image, title, tagline, address, date }) => {
  return (
    <div className="puja-card">
      <img src={image} alt={title} className="puja-image" />
      <h3 className="puja-title">{title}</h3>
      <p className="puja-tagline">{tagline}</p>
      <p className="puja-info">
        <MapPin size={16} className="puja-icon" />
        <span>{address}</span>
      </p>
      <p className="puja-info">
        <Calendar size={16} className="puja-icon" />
        <span>{date}</span>
      </p>
      <button className="puja-participate-btn">
        Participate
        <ArrowRight size={16} className="puja-btn-icon" />
      </button>
    </div>
  );
};

export default PujaCard;