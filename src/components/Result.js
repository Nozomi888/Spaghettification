import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import Avatar3D from "./Avatar3D"; // Import the animated avatar

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total } = location.state || { score: 0, total: 0 };
  const [feedback, setFeedback] = useState('');
  const [badge, setBadge] = useState('');

  useEffect(() => {
    // Calculate percentage and provide feedback
    const percentage = (score / total) * 100;
    let message = '';
    let badgeType = '';

    if (percentage >= 75) {
      message = "🏆 Awesome job, space hero! You earned a **Gold Badge!**";
      badgeType = "/gold-badge.png"; 
    } else if (percentage >= 50) {
      message = "⭐ Good work! You earned a **Silver Badge!** Keep reaching for the stars!";
      badgeType = "/silver-badge.png"; 
    } else {
      message = " Keep learning! You earned a **Bronze Badge** – You're on your way to greatness!";
      badgeType = "/bronze-badge.png"; 
    }

    setFeedback(message);
    setBadge(badgeType);

    // Update user progress in Firestore
    const user = auth.currentUser;
    if (user) {
      db.collection('users').doc(user.uid).update({
        "progress.lessonCompleted": true,
        "progress.badge": badgeType
      });
    }
  }, [score, total]);

  const handleExit = () => {
    navigate('/lesson');
  };

  return (
    <div 
      style={{ 
        padding: '30px', 
        textAlign: 'center',
        backgroundImage: "url('/eso2018a.jpg')", 
        backgroundSize: 'cover',
        minHeight: '100vh',
        color: 'white'
      }}
    >
      <h2 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '20px' }}>🚀 Quiz Results!</h2>
      <p style={{ fontSize: '1.8rem' }}>You scored **{score} out of {total}** 🎉</p>
      <p style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '20px', color: '#FFD700' }}>{feedback}</p>

      {/* Badge Display */}
      <img 
        src={badge} 
        alt="Badge" 
        style={{ width: '200px', height: '200px', marginTop: '20px', boxShadow: '0px 4px 10px rgba(255,255,255,0.5)' }}
      />

      {/* Animated Avatar12 */}
      <div style={{ marginTop: '20px' }}>
        <Avatar3D width="250px" height="250px" />
      </div>

      <p style={{ fontSize: '1.5rem', marginTop: '20px' }}>⭐ Keep up the great work, future astronaut! ⭐</p>

      {/* Exit Button */}
      <div style={{ marginTop: '30px' }}>
        <button 
          onClick={handleExit} 
          style={{ 
            padding: '15px 30px', 
            fontSize: '1.5rem', 
            borderRadius: '25px', 
            backgroundColor: '#FFEB3B', 
            color: 'black', 
            border: 'none',
            cursor: 'pointer',
            transition: 'transform 0.3s',
            boxShadow: '0px 4px 10px rgba(0,0,0,0.3)',
            fontWeight: 'bold'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          🚀 Continue Learning!
        </button>
      </div>
    </div>
  );
}

export default Result;
