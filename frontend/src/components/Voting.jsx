import React, { useState } from 'react';
import { assets } from '../assets/assets'; // Adjust path if needed

const styles = {
  body: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f8f8f5', // Pearl-like background
    textAlign: 'center',
    padding: '20px',
  },
  container: {
    width: '80%',
    margin: '0 auto',
  },
  h1: {
    color: '#555',             // Match vote results
    fontSize: '18px',          // Match vote results
    fontWeight: 'normal',      // Softer header
    marginBottom: '30px',
  },
  voteOptions: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '30px',
    flexWrap: 'wrap',
  },
  voteOption: {
    textAlign: 'center',
    width: '30%',
    minWidth: '150px',
    maxWidth: '200px',
    margin: '10px',
  },
  voteOptionImage: {
    width: '100%',
    maxWidth: '200px',
    borderRadius: '10px',
    marginBottom: '15px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#c0a060', // Luxury muted gold
    color: '#fffaf0',           // Ivory text
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  results: {
    marginTop: '40px',
  },
  resultText: {
    fontSize: '18px',
    margin: '10px 0',
    color: '#555',
  },
};

const Voting = () => {
  const [disneyVotes, setDisneyVotes] = useState(0);
  const [sweetCoolVotes, setSweetCoolVotes] = useState(0);
  const [comfyVotes, setComfyVotes] = useState(0);

  const handleVote = (collection) => {
    if (collection === 'disney') {
      setDisneyVotes((prev) => prev + 1);
    } else if (collection === 'sweetcool') {
      setSweetCoolVotes((prev) => prev + 1);
    } else if (collection === 'comfy') {
      setComfyVotes((prev) => prev + 1);
    }
    alert('Thank you for voting!');
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1 style={styles.h1}>Vote for Your Favorite Collection!</h1>

        <div style={styles.voteOptions}>
          <div style={styles.voteOption}>
            <img
              style={styles.voteOptionImage}
              src={assets.disney}
              alt="Disney Collection"
            />
            <button
              style={styles.button}
              onClick={() => handleVote('disney')}
            >
              Vote for Disney
            </button>
          </div>

          <div style={styles.voteOption}>
            <img
              style={styles.voteOptionImage}
              src={assets.sweetCool}
              alt="SweetCool Collection"
            />
            <button
              style={styles.button}
              onClick={() => handleVote('sweetcool')}
            >
              Vote for SweetCool
            </button>
          </div>

          <div style={styles.voteOption}>
            <img
              style={styles.voteOptionImage}
              src={assets.comfy}
              alt="Comfy Collection"
            />
            <button
              style={styles.button}
              onClick={() => handleVote('comfy')}
            >
              Vote for Comfy
            </button>
          </div>
        </div>

        <div style={styles.results}>
          <h2 style={{ color: '#333' }}>Voting Results:</h2>
          <p style={styles.resultText}>Disney: {disneyVotes}</p>
          <p style={styles.resultText}>SweetCool: {sweetCoolVotes}</p>
          <p style={styles.resultText}>Comfy: {comfyVotes}</p>
        </div>
      </div>
    </div>
  );
};

export default Voting;
