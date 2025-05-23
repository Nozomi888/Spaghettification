import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    question: " What is spaghettification?",
    options: [
      " A process of cooking pasta",
      " A phenomenon where objects are stretched by gravitational forces",
      " A science fiction concept with no basis in reality",
      " A type of mathematical equation"
    ],
    answer: " A phenomenon where objects are stretched by gravitational forces"
  },
  {
    question: " Where does spaghettification typically occur?",
    options: [
      " In deep oceans",
      " In a kitchen",
      " Near a black hole",
      " Far away from any massive object"
    ],
    answer: " Near a black hole"
  },
  {
    question: " Why is it called spaghettification?",
    options: [
      " Because it makes objects look like spaghetti",
      " Because it stretches objects into long, thin shapes",
      " It involves cooking pasta in space",
      " It is just a humorous term"
    ],
    answer: " Because it stretches objects into long, thin shapes"
  },
  {
    question: " Which force is responsible for spaghettification?",
    options: [
      " Electromagnetic force",
      " Nuclear force",
      " Gravitational force",
      " Frictional force"
    ],
    answer:  " Gravitational force"
  }
];

function Quiz() {
  const [responses, setResponses] = useState(Array(questions.length).fill(null));
  const navigate = useNavigate();

  const handleOptionChange = (qIndex, optionIndex) => {
    const newResponses = [...responses];
    newResponses[qIndex] = optionIndex;
    setResponses(newResponses);
  };

const handleSubmit = (e) => {
    e.preventDefault();
    let score = 0;
    responses.forEach((response, index) => {
      if (questions[index].options[response] === questions[index].answer) {
        score++;
      }
    });
    navigate('/result', { state: { score, total: questions.length } });
};


  return (
    <div 
      style={{ 
        padding: '30px',
        textAlign: 'center',
        backgroundImage: "url('/eso2018a.jpg')", 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        color: 'white'
      }}
    >
      <h2 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '20px' }}>🚀 Quiz Time!</h2>
      <p style={{ fontSize: '1.5rem' }}>Answer the questions and become a **space genius**! 🏆</p>

      <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', background: 'rgba(0, 0, 0, 0.7)', borderRadius: '15px' }}>
        {questions.map((q, index) => (
          <div key={index} style={{ marginBottom: '30px', fontSize: '1.2rem' }}>
            <p style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{q.question}</p>
            {q.options.map((option, oIndex) => (
              <div key={oIndex} style={{ textAlign: 'left', padding: '10px' }}>
                <label 
                  style={{ 
                    display: 'block', 
                    padding: '10px', 
                    backgroundColor: 'rgba(255, 255, 255, 0.2)', 
                    borderRadius: '10px',
                    cursor: 'pointer',
                    transition: '0.3s'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.4)'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
                >
                  <input 
                    type="radio"
                    name={`question-${index}`}
                    value={oIndex}
                    onChange={() => handleOptionChange(index, oIndex)}
                    required
                    style={{ marginRight: '10px' }}
                  />
                  {option}
                </label>
              </div>
            ))}
          </div>
        ))}
        <button 
          type="submit" 
          style={{ 
            padding: '15px 30px', 
            fontSize: '1.5rem', 
            borderRadius: '20px', 
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
          🚀 Submit Answers!
        </button>
      </form>
    </div>
  );
}

export default Quiz;
