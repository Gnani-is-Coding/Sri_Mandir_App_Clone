import React from 'react'
import Carousel from '../Carousal'
import PujaCard from '../PujaCard'
import './index.css'

const pujaTypes = [
  {
    image: '/images/1720715847294.webp',
    title: 'Ganesh Puja',
    tagline: 'Invoke the blessings of Lord Ganesha',
    address: 'Sri Mandir Temple, 123 Devotion St',
    date: 'Every Tuesday'
  },
  {
    image: '/images/1720883338524.webp',
    title: 'Lakshmi Puja',
    tagline: 'Seek prosperity and abundance',
    address: 'Sri Mandir Temple, 123 Devotion St',
    date: 'Every Friday'
  },
  {
    image: '/images/1720890969814.webp',
    title: 'Shiva Puja',
    tagline: 'Connect with the divine consciousness',
    address: 'Sri Mandir Temple, 123 Devotion St',
    date: 'Every Monday'
  },
  {
    image: '/images/1721208690418.webp',
    title: 'Durga Puja',
    tagline: 'Celebrate the divine feminine power',
    address: 'Sri Mandir Temple, 123 Devotion St',
    date: 'Annual festival'
  }
];

function Puja() {
  return (
    <div className="puja-container">
      <Carousel/>
      <h1 className="puja-section-title">Upcoming Pujas on Sri Mandir.</h1>
      <div className="puja-cards-container">
        {pujaTypes.map((puja, index) => (
          <PujaCard key={index} {...puja} />
        ))}
      </div>
    </div>
  )
}

export default Puja