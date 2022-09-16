import './App.css';
import React, { useState, useEffect } from 'react';
import Card from './components/Card';

function App() {
  const [cards, setCards] = useState([]);
  const [cardsGuessed, setCardsGuessed] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const getCards = async () => {
    const cardsResponse = await fetch(
      `https://deckofcardsapi.com/api/deck/new/draw/?count=12`
    ).then((response) => response.json());

    setCards(cardsResponse.cards);
  }

  useEffect(() => {
    if (cards.length > 0) return // Only run this if cards is empty.

    getCards().catch(console.error);
  }, [cards]);

  function handleClick(newGuess) {
    console.log(`Got ${newGuess}`);
    setCardsGuessed([...cardsGuessed, newGuess]);
  }

  useEffect(() => {
    /*
      Here is where we should do a bunch of core app functionality.
      Is there a duplicate? If so, reset the game: get new cards, set score to 0.
      If not, up score by one and call "updateBestScore" function.
      Shuffle the cards.
    */
    function resetGame() {
      console.log('Resetting game...');
      getCards().catch(console.error);
      setCardsGuessed([]);
      setScore(0);
      setBestScore(0);
    }
  
    function updateBestScore(score) {
      if (score === bestScore) {
        setBestScore(score + 1);
        console.log(`Best score +1'd`);
      };
    }

    const allUnique = cardsGuessed.length === [...new Set(cardsGuessed)].length;

    if (!allUnique) {
      console.log('Duplicate guess detected, resetting game.');
      resetGame();
    } else {
      console.log(`Updated guesses: ${cardsGuessed}`);
      console.log('Current score: ', score);
      console.log('Current best score: ', bestScore);
      setScore(score + 1);
      updateBestScore(score);
    }
    // eslint-disable-next-line
  }, [cardsGuessed]);

  return (
    <div className="App">
      <ul>
        {cards.map((card) => (
          <Card key={card.code} card={card} handleClick={handleClick} />
        ))}  
      </ul>
    </div>
  );
}

export default App;
