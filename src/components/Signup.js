import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      await db.collection('users').doc(user.uid).set({
        name,
        email,
        progress: { lessonCompleted: false, badge: false }
      });
      setSuccessMessage(" Signup successful! Please login.");
      setTimeout(() => navigate('/'), 2000); 
    } catch (error) {
      setSuccessMessage(error.message);
    }
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
      {/* Big Signup Heading */}
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '20px' }}>Signup</h1>

      <form 
        onSubmit={handleSubmit} 
        style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '15px' }}
      >
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
          style={{ 
            padding: '12px', 
            borderRadius: '15px', 
            fontSize: '1rem', 
            border: 'none',
            boxShadow: '0px 4px 8px rgba(0,0,0,0.2)'
          }}
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          style={{ 
            padding: '12px', 
            borderRadius: '15px', 
            fontSize: '1rem', 
            border: 'none',
            boxShadow: '0px 4px 8px rgba(0,0,0,0.2)'
          }}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          style={{ 
            padding: '12px', 
            borderRadius: '15px', 
            fontSize: '1rem', 
            border: 'none',
            boxShadow: '0px 4px 8px rgba(0,0,0,0.2)'
          }}
        />
        <button 
          type="submit" 
          style={{ 
            padding: '15px 30px', 
            fontSize: '1.2rem', 
            borderRadius: '25px', 
            backgroundColor: '#42A5F5', 
            color: 'white', 
            border: 'none',
            cursor: 'pointer',
            transition: 'transform 0.3s',
            boxShadow: '0px 4px 10px rgba(0,0,0,0.3)'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          Submit
        </button>
      </form>

      {/* Success Message Below Button */}
      {successMessage && (
        <p 
          style={{ 
            marginTop: '20px', 
            fontSize: '1.2rem', 
            fontWeight: 'bold', 
            color: '#00FF00', 
            transition: 'opacity 0.5s ease-in-out'
          }}
        >
          {successMessage}
        </p>
      )}
    </div>
  );
}

export default Signup;
