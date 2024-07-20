import React, { useState, useEffect } from 'react'
import { ChevronDown, AlignJustify, User, Settings, LogOut, Calendar, BookOpen, LogIn } from 'lucide-react';
import { Link } from "react-router-dom"
import Cookies from 'js-cookie' 
import './index.css'
import LoginPopup from '../LoginPopup'

function Navbar() {
    const [openMenu, setOpenMenu] = useState(false)
    const [openProfileDropdown, setOpenProfileDropdown] = useState(false)
    const [hasJwtToken, setHasJwtToken] = useState(false)
    const [showLoginPopup, setShowLoginPopup] = useState(false)

    useEffect(() => {
        const jwtToken = Cookies.get("jwt_token")
        setHasJwtToken(!!jwtToken)
    }, [])

    const toggleProfileDropdown = () => {
        setOpenProfileDropdown(!openProfileDropdown)
    }

    const handleLoginClick = (e) => {
        e.preventDefault()
        setShowLoginPopup(true)
        setOpenProfileDropdown(false)
    }

    const handleLoginSuccess = () => {
        setHasJwtToken(true)
    }

    const handleLogOut = () => {
        Cookies.remove("jwt_token")
        setHasJwtToken(false)
    }

    return (
        <div>
            <div className="navbar-container">
                <img src="/images/img_puja_seva_logo_en.svg" alt="logo"/>
                <div className='link-container'>
                    <Link to="/" className="links">Home</Link>
                    <Link to="/puja" className="links">Puja</Link>
                    <Link to="/panchang" className="links">Panchang</Link>
                    <Link to="/temples" className="links">Temples</Link>
                    <Link to="/" className="links" style={{display: "flex", alignItems: "center", gap:'10px'}}>Library <ChevronDown/></Link>
                </div>
                <div className="profile-container">
                    <img 
                        src="/images/Default_Profile.svg" 
                        className="profile-img" 
                        alt="profile" 
                        onClick={toggleProfileDropdown}
                    />
                    {openProfileDropdown && (
                        <div className="profile-dropdown">
                            <p className='drop-down-para'>Hello, Sri Mandir Bhakt</p>
                            <p className='drop-down-para'>Welcome to Sri Mandir Puja Seva</p>
                            <hr/>
                            <Link to="/my-puja-booking" className="dropdown-item">
                                <Calendar size={16} />
                                <span style={{"fontWeight": "500"}}>My Puja Booking</span>
                            </Link>
                            <Link to="/profile" className="dropdown-item">
                                <User size={16} />
                                <span style={{"fontWeight": "500"}}>My Profile</span>
                            </Link>
                            <Link to="/book-puja" className="dropdown-item">
                                <BookOpen size={16} />
                                <span style={{"fontWeight": "500"}}>Book a Puja</span>
                            </Link>
                            <Link to="/settings" className="dropdown-item">
                                <Settings size={16} />
                                <span style={{"fontWeight": "500"}}>Settings</span>
                            </Link>
                            {hasJwtToken ? (
                                <a onClick={handleLogOut} href="#logout" className="dropdown-item">
                                    <LogOut size={16} />
                                    <span style={{"fontWeight": "500"}}>Logout</span>
                                </a>
                            ): (
                                <a href="#home" className="dropdown-item" onClick={handleLoginClick}>
                                    <LogIn size={16} />
                                    <span style={{"fontWeight": "500"}}>LogIn</span>
                                </a>
                            )}
                        </div>
                    )}
                </div>
                <AlignJustify className='menu-icon' onClick={() => setOpenMenu(!openMenu)}/>
            </div>

            <div className='sm-links-container' style={{display: openMenu ? "block" : "none"}}>
                <p className="sm-links">Home</p>
                <p className="sm-links">Puja</p>
                <p className="sm-links">Panchang</p>
                <p className="sm-links">Temples</p>
                <p className="sm-links" style={{display: "flex", alignItems: "center", gap:'10px'}}>Library <ChevronDown/></p>
            </div>

            {showLoginPopup && (
                <LoginPopup 
                    onClose={() => setShowLoginPopup(false)} 
                    onLoginSuccess={handleLoginSuccess}
                />
            )}
        </div>
    )
}

export default Navbar