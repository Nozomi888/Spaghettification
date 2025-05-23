import React, { useState } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      navigate('/lesson');
    } catch (error) {
      alert(error.message);
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
      {/* New Login Heading */}
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '20px' }}>Login</h1>

      <form 
        onSubmit={handleSubmit} 
        style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '15px' }}
      >
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
            backgroundColor: '#FFEB3B', 
            color: 'black', 
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
    </div>
  );
}

export default Login;
