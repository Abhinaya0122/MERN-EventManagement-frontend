import React from 'react';
// import Navbar from './Navbar';
import '../css/home.css';

function HomePage() {
  return (
    <>
      <div className='home-container'>
        <div className='center-container'>
          <div className='left-container'>
            <h2>Embrace Your Technical Empathy</h2>
            <p>Through this platform, register for your interested event and win awards to build your profile. Success is not final, failure is not fatal.</p>
            <button >GetStarted</button>
          </div>
          <div className='right-container'>
            <img src='/college project-cuate.png' alt='college project'></img>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
