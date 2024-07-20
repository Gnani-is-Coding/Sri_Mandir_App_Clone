import React from 'react'
import './index.css'

function Home() {
  return (
    <div className='home-container'> 
        <div className='head-container'>
        <h1 className='main-heading'>Pray daily with <span style={{color: "#f18912"}}>Sri Mandir.</span></h1>
        <h1 className='main-heading'>One App for all your devotional needs</h1>
        </div>

        <img src="images/img_hero_artwork_en.webp" alt="hero-img" className='hero-img'/>
    </div>
  )
}

export default Home