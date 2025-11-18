import React, { useState, useEffect } from 'react';
import './Welcome.css';

const Welcome = ({ user, onLogout }) => {
  const [emoji, setEmoji] = useState('🎉');
  const [clickCount, setClickCount] = useState(0);
  const [isDancing, setIsDancing] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState('');

  const emojis = ['🎉', '🎊', '🎈', '🚀', '⭐', '💫', '🌟', '🎁', '🎯', '🏆', '🎪', '🎨'];

  useEffect(() => {
  
    document.title = 'DOJO IS GREAT';
    
    const hour = new Date().getHours();
    if (hour < 12) {
      setTimeOfDay('morning');
    } else if (hour < 18) {
      setTimeOfDay('afternoon');
    } else {
      setTimeOfDay('evening');
    }
  }, []);

  const handleEmojiClick = () => {
    setClickCount(prev => prev + 1);
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    setEmoji(randomEmoji);
    setIsDancing(true);
    setTimeout(() => setIsDancing(false), 1000);
  };

  const getGreeting = () => {
    const greetings = {
      morning: ['Good morning', 'Rise and shine', 'Morning sunshine'],
      afternoon: ['Good afternoon', 'Hey there', 'Afternoon champ'],
      evening: ['Good evening', 'Evening star', 'Night owl']
    };
    const options = greetings[timeOfDay] || greetings.afternoon;
    return options[Math.floor(Math.random() * options.length)];
  };

  const getFunnyMessage = () => {
    const messages = [
      "You're officially awesome! 🚀",
      "Look at you, being all logged in! 👀",
      "You made it! The internet is proud! 🌐",
      "Welcome to the cool kids club! 😎",
      "You're in! Now what? 🤔",
      "Success! You're a digital wizard! 🧙‍♂️",
      "You did it! High five! ✋",
      "Welcome! You're now part of the matrix! 🔴",
      "You're logged in! Time to celebrate! 🎊",
      "You're here! The future is now! ⚡"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const getRandomFacts = () => {
    const allFacts = [
      "Octopuses have three hearts! 🐙",
      "A group of flamingos is called a 'flamboyance'! 🦩",
      "Bananas are berries, but strawberries aren't! 🍌",
      "Honey never spoils - you could eat 3000-year-old honey! 🍯",
      "A day on Venus is longer than its year! 🪐",
      "Wombat poop is cube-shaped! 💩",
      "Sharks have been around longer than trees! 🦈",
      "A single cloud can weigh more than a million pounds! ☁️",
      "Dolphins have names for each other! 🐬",
      "The human brain uses about 20% of the body's total energy! 🧠",
      "There are more possible chess games than atoms in the observable universe! ♟️",
      "A group of crows is called a 'murder'! 🐦‍⬛",
      "Polar bears have black skin under their white fur! 🐻‍❄️",
      "A shrimp's heart is in its head! 🦐",
      "The first computer bug was an actual bug (a moth)! 🐛",
      "A group of owls is called a 'parliament'! 🦉",
      "Humans share 50% of their DNA with bananas! 🍌",
      "A day on Mercury lasts 59 Earth days! ☿️",
      "The human nose can detect over 1 trillion different scents! 👃",
      "A group of pandas is called an 'embarrassment'! 🐼",
      "The speed of light is about 186,282 miles per second! ⚡",
      "A group of jellyfish is called a 'smack'! 🪼",
      "The human body contains enough iron to make a 3-inch nail! 🔩",
      "A day on Jupiter is only 10 hours long! 🪐",
      "The first email was sent in 1971! 📧",
      "A group of hedgehogs is called a 'prickle'! 🦔",
      "The human brain generates about 12-25 watts of electricity! ⚡",
      "A day on Mars is almost the same as Earth (24.6 hours)! 🔴",
      "The first computer was the size of a room! 💻",
      "A group of ravens is called an 'unkindness'! 🐦‍⬛"
    ];

    // Shuffle array and pick 3 random facts
    const shuffled = [...allFacts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  const [randomFacts] = useState(() => getRandomFacts());

  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <div className="welcome-header">
          <h1 className={`welcome-title ${isDancing ? 'dance' : ''}`}>
            {getGreeting()}, {user.fullName || user.email?.split('@')[0]}!
          </h1>
          <div 
            className={`emoji-display ${isDancing ? 'spin' : ''}`}
            onClick={handleEmojiClick}
            title="Click me for a surprise! 🎁"
          >
            {emoji}
          </div>
        </div>
        
        <div className="welcome-content">
          <p className="funny-message">{getFunnyMessage()}</p>
          
          {clickCount > 0 && (
            <div className="click-counter">
              <p>You've clicked the emoji <span className="count-number">{clickCount}</span> time{clickCount !== 1 ? 's' : ''}!</p>
              {clickCount >= 10 && <p className="achievement">🏆 Achievement Unlocked: Emoji Master!</p>}
              {clickCount >= 20 && <p className="achievement">👑 Achievement Unlocked: Emoji Legend!</p>}
              {clickCount >= 50 && <p className="achievement">💎 Achievement Unlocked: Emoji God!</p>}
            </div>
          )}

          <div className="stats-box">
            <div className="stat-item">
              <span className="stat-label">Status:</span>
              <span className="stat-value online">● Online</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Level:</span>
              <span className="stat-value">Pro User</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Power Level:</span>
              <span className="stat-value">Over 9000!</span>
            </div>
          </div>

          <div className="fun-facts">
            <h3>Random Fun Facts:</h3>
            <ul>
              {randomFacts.map((fact, index) => (
                <li key={index}>{fact}</li>
              ))}
            </ul>
          </div>

          <div className="action-buttons">
            <button 
              onClick={onLogout} 
              className="btn btn-logout"
            >
              🚪 Logout
            </button>
            <button 
              onClick={() => window.location.reload()} 
              className="btn btn-refresh"
            >
              🔄 Refresh Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
