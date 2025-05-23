import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import Webcam from "react-webcam";
import Avatar12 from "./Avatar12";

const slides = [
  {
    title: "Welcome to Spaghettification!",
    text: "Welcome, space explorer! Today, we’re diving into the mysterious world of black holes. Ever wondered what happens if you fall into one? Let’s find out!",
    image: "/bl.jpg",
    question: "What do you think would happen if you got too close to a black hole?",
    placeholder: "Type your answer here..."
  },
  {
    title: " What is Spaghettification?",
    text: "Spaghettification is a process where objects get stretched into long, thin shapes—just like spaghetti! This happens when something gets too close to a black hole.",
    image: "/blackhole.jpeg",
    question: "Can you imagine being stretched like spaghetti? How would that feel?",
    placeholder: "Describe your thoughts!"
  },
  {
    title: " Why Does This Happen?",
    text: "Black holes have SUPER strong gravity—so strong that even light can’t escape! The closer you get, the stronger the pull.",
    image: "/explain.jpeg",
    question: "What do you think would happen to a spaceship near a black hole?",
    placeholder: "Your opinion!"
  },
  {
    title: " The Stretching Effect",
    text: "Imagine pulling on a piece of dough. One end stretches faster than the other. That’s what happens near a black hole!",
    image: "/rolling.jpg",
    question: "Can you think of other things that stretch like this?",
    placeholder: "Name something similar!"
  },
  {
    title: " What Happens Next?",
    text: "If you keep falling in, you’ll stretch more and more… until you become cosmic spaghetti! Scientists call this spaghettification.",
    image: "/spa.jpg",
    question: "Would you ever want to visit a black hole? Why or why not?",
    placeholder: "Your answer!"
  },
  {
    title: "🤯 Fun Fact!",
    text: "Did you know? If Earth were turned into a black hole, it would be just the size of a marble!",
    image: "/b.jpg",
    question: "Can you believe our whole planet could shrink so much? What do you think?",
    placeholder: "React to this fact!"
  },
  {
    title: "✨ Quiz Time!",
    text: "You did great! Now, let’s test your knowledge. Ready for the quiz?",
    image: "/qu.jpg",
    question: "Are you excited to take the quiz?",
    placeholder: "Type YES or NO!"
  }
];

function Lesson() {
  const navigate = useNavigate();
  const [slideIndex, setSlideIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const [response, setResponse] = useState("");

  useEffect(() => {
    setFadeIn(true);
    const utterance = new SpeechSynthesisUtterance(slides[slideIndex].text);
    utterance.rate = 0.9;
    utterance.pitch = 2.4;

    const voices = speechSynthesis.getVoices();
    const femaleVoice = voices.find(voice => voice.name.includes("Female"));
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    speechSynthesis.speak(utterance);
  }, [slideIndex]);

  const nextSlide = () => {
    setFadeIn(false);
    setTimeout(() => {
      if (slideIndex < slides.length - 1) {
        setSlideIndex(slideIndex + 1);
      } else {
        navigate('/quiz');
      }
      setFadeIn(true);
      setResponse(""); // Reset input on next slide
    }, 500);
  };

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/');
  };

  return (
    <div 
      style={{ 
        height: '180vh', 
        backgroundImage: "url('/eso2018a.jpg')", 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'opacity 0.5s ease-in-out',
        opacity: fadeIn ? 1 : 0
      }}
    >
      {/* Logout Button */}
      <button 
        onClick={handleLogout} 
        style={{ 
          position: 'absolute', top: '30px', right: '40px', padding: '6px 11px', borderRadius: '10px', background: '#FF5733', color: 'white', border: 'none' 
        }}
      >
        Logout
      </button>

      {/* Lesson Content */}
      <div 
        style={{ 
          width: '80%', 
          background: 'rgba(0, 0, 0, 0.8)', 
          padding: '30px', 
          borderRadius: '15px', 
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        {/* Avatar & Lesson Visual */}
        <div style={{ flex: '0.2', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar12 width="80px" height="80px" />
          <img 
            src={slides[slideIndex].image} 
            alt="Lesson visual" 
            style={{ width: '650px', height: '500px', borderRadius: '15px', marginTop: '10px' }} 
          />
        </div>

        {/* Lesson Text & Input in the Center */}
        <div style={{ flex: '0.6', fontSize: '2rem', lineHeight: '2.5', textAlign: 'justify' }}>
          <h2 style={{ fontSize: '4rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>
            {slides[slideIndex].title}
          </h2>
          <p>{slides[slideIndex].text}</p>
          <p style={{ fontSize: '1.5rem', fontStyle: 'italic', marginTop: '20px' }}>💡 {slides[slideIndex].question}</p>
          <input 
            type="text" 
            placeholder={slides[slideIndex].placeholder}
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            style={{
              width: '100%', padding: '10px', borderRadius: '10px',
              fontSize: '1.2rem', textAlign: 'center'
            }}
          />
        </div>
      </div>

     {/* Fixed Webcam Feed */}
      <div style={{ position: 'absolute', bottom: '10px', right: '10px' }}>
        <Webcam width={160} height={120} />
      </div>

      {/* Next Button for Slide Navigation */}
      <div style={{ marginTop: '30px' }}>
        <button onClick={nextSlide} style={{ padding: '15px 30px', fontSize: '1.2rem', borderRadius: '25px', backgroundColor: '#FFEB3B', color: 'black', border: 'none', cursor: 'pointer' }}>
          {slideIndex === slides.length - 1 ? "Go to Quiz" : "Next"}
        </button>
      </div>
    </div>
  );
}

export default Lesson;
