import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Avatar3D from './Avatar3D';

function Home() {
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);

  const handleStart = () => {
    setShowOptions(true);
  };

  return (
    <div 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        height: '100vh',
        backgroundImage: "url('/eso2018a.jpg')", 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        textAlign: 'center',
        color: 'white' 
      }}
    >
      <Avatar3D width="300px" height="300px" />

      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Welcome to the AI-driven Learning Experience</h1>

      {!showOptions ? (
        <button 
          onClick={handleStart} 
          style={{
            padding: '15px 30px', 
            fontSize: '1.5rem', 
            borderRadius: '25px', 
            backgroundColor: '#FF5733', 
            color: 'white', 
            border: 'none',
            cursor: 'pointer',
            transition: 'transform 0.3s',
            boxShadow: '0px 4px 10px rgba(0,0,0,0.2)'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          Start
        </button>
      ) : (
        <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => navigate('/signup')} 
            style={{
              padding: '15px 30px', 
              fontSize: '1.2rem', 
              borderRadius: '25px', 
              backgroundColor: '#42A5F5', 
              color: 'white', 
              border: 'none',
              cursor: 'pointer',
              transition: 'transform 0.3s',
              boxShadow: '0px 4px 10px rgba(0,0,0,0.2)'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            Signup
          </button>

          <button 
            onClick={() => navigate('/login')} 
            style={{
              padding: '15px 30px', 
              fontSize: '1.2rem', 
              borderRadius: '25px', 
              backgroundColor: '#FFEB3B', 
              color: 'black', 
              border: 'none',
              cursor: 'pointer',
              transition: 'transform 0.3s',
              boxShadow: '0px 4px 10px rgba(0,0,0,0.2)'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
