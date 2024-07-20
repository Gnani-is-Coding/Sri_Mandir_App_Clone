import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react'; 
import './index.css';
import PujaDetailsPopup from '../PujaDetailsPopUp';

const pujaDetails = [
  {
    id: 1,
    image: '/images/1720715847294.webp',
    title: 'Ganesh Puja',
    tagline: 'Invoke the blessings of Lord Ganesha',
    address: 'Sri Mandir Temple, 123 Devotion St',
    date: 'Every Tuesday',
    details: 'Detailed information about Ganesh Puja...'
  },
];

const packageDetails = [
  {
    price: '851',
    title: 'Family + Bhog',
    tagline: 'Puja for 4 People',
    description: [
      'Pandit ji will call out your name and gotra during the puja sankalp.',
      'Bhog consisting of fruits, sweets, and dry fruits will be offered to Maa Bagalamukhi at Maa Bagalamukhi Temple.',
      'Opt for additional offerings like Vastra Daan, Anna Daan, Gau Seva, or Deep Daan to be done in your name.',
      'Upon completion, a video of your puja and offering will be shared with you on your registered WhatsApp number or can be found in your booking history within 3-4 days.',
      'Sacred tirth prasad will be sent to your address within 8-10 days.'
    ]
  },
  {
    price: '1251',
    title: 'Extended Family + Bhog',
    tagline: 'Puja for 6 People',
    description: [
      'Pandit ji will call out your name and gotra during the puja sankalp.',
      'Bhog consisting of fruits, sweets, and dry fruits will be offered to Maa Durga at Maa Durga Temple.',
      'Opt for additional offerings like Vastra Daan, Anna Daan, Gau Seva, or Deep Daan to be done in your name.',
      'Upon completion, a video of your puja and offering will be shared with you on your registered WhatsApp number or can be found in your booking history within 3-4 days.',
      'Sacred tirth prasad will be sent to your address within 8-10 days.'
    ]
  },
  {
    price: '2001',
    title: 'Special Bhog',
    tagline: 'Puja for 8 People',
    description: [
      'Pandit ji will call out your name and gotra during the puja sankalp.',
      'Bhog consisting of fruits, sweets, and dry fruits will be offered to Lord Shiva at Lord Shiva Temple.',
      'Opt for additional offerings like Vastra Daan, Anna Daan, Gau Seva, or Deep Daan to be done in your name.',
      'Upon completion, a video of your puja and offering will be shared with you on your registered WhatsApp number or can be found in your booking history within 3-4 days.',
      'Sacred tirth prasad will be sent to your address within 8-10 days.'
    ]
  },
  {
    price: '3001',
    title: 'Deluxe Bhog',
    tagline: 'Puja for 10 People',
    description: [
      'Pandit ji will call out your name and gotra during the puja sankalp.',
      'Bhog consisting of fruits, sweets, and dry fruits will be offered to Maa Lakshmi at Maa Lakshmi Temple.',
      'Opt for additional offerings like Vastra Daan, Anna Daan, Gau Seva, or Deep Daan to be done in your name.',
      'Upon completion, a video of your puja and offering will be shared with you on your registered WhatsApp number or can be found in your booking history within 3-4 days.',
      'Sacred tirth prasad will be sent to your address within 8-10 days.'
    ]
  }
];

const PujaDetail = () => {
  const packageSectionRef = useRef(null);
  const { id } = useParams();
  const puja = pujaDetails.find(p => p.id === parseInt(id)) || pujaDetails[0];
  const [showPopup, setShowPopup] = useState(false);

  const handleSelectPackageClick = () => {
    packageSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNext = (userDetails) => {
    console.log('User Details:', userDetails);
    setShowPopup(false);
  }

  return (
    <div className="puja-detail-container">
      <img src={puja.image} alt={puja.title} className="puja-detail-image" />
      <div className="puja-detail-content">
        <h1 className="puja-detail-title">{puja.title}</h1>
        <p className="puja-detail-tagline">{puja.tagline}</p>
        <p className="puja-detail-info">
          <strong>Address:</strong> {puja.address}
        </p>
        <p className="puja-detail-info">
          <strong>Date:</strong> {puja.date}
        </p>
        <p className="puja-detail-description">{puja.details}</p>
        <button className="puja-select-package-btn" onClick={handleSelectPackageClick}>
          Select Puja Package
        </button>
      </div>
      <div ref={packageSectionRef} className="package-section">
        <h2 className="package-section-title">Available Packages</h2>

        <div className="package-cards-container">
          {packageDetails.map((pkg, index) => (
            <div key={index} className="package-card">
              <h3 className="package-price">{pkg.price}</h3>
              <h4 className="package-title">{pkg.title}</h4>
              <p className="package-tagline">{pkg.tagline}</p>
              <ul className="package-description">
                {pkg.description.map((desc, idx) => (
                  <li key={idx}>{desc}</li>
                ))}
              </ul>
              <button className="package-participate-btn" onClick={() => setShowPopup(true)}>
                Participate
                <ArrowRight size={16} className="package-btn-icon" />
              </button>
            </div>
          ))}
        </div>
      </div>
      {showPopup && <PujaDetailsPopup onClose={() => setShowPopup(false)} onNext={handleNext} />}
    </div>
  );
};

export default PujaDetail;
