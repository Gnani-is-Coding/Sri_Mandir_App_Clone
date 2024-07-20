import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { ArrowRight } from 'lucide-react';
import './index.css'
import { useNavigate } from 'react-router-dom';

const PujaDetailsPopup = ({ onClose, onNext }) => {
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
      fetchUserDetails()
  }, []);

  const fetchUserDetails = async () => {
    try {
        const token = Cookies.get("jwt_token")

      const response = await fetch('http://localhost:3000/user-details', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }

      const data = await response.json();
      console.log(data[0], "user data")
      if(data[0].whatsappNumber) setWhatsappNumber(data.whatsappNumber);
      if(data[0].username) setUserName(data.userName) 

    } catch (err) {
      console.error(err.message);
    } 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext({ whatsappNumber, userName });
  };

  return (
    <div className="puja-details-popup-overlay">
      <div className="puja-details-popup">
        <button className="close-button" onClick={onClose}>X</button>
        <h3>Fill your details for Puja</h3>
        <hr/>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="whatsappNumber">Enter Your WhatsApp Mobile Number</label>
            <p>Your Puja booking updates like Puja Photos, Videos, and other details will be sent on WhatsApp on the below number.</p>
            <input
              type="text"
              id="whatsappNumber"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              required
              placeholder="+91 6309711722"
            />
          </div>
            <div className="form-group">
              <label htmlFor="userName">Enter Your Name</label>
              <input
                type="text"
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                placeholder="Sri Mandir Bhakt"
              />
            </div>
        
          <button type="submit" className="next-button" onClick={() => navigate("/puja")}>
            Next
            <ArrowRight size={16} className="next-button-icon" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default PujaDetailsPopup;
