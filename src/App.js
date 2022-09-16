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
    getCards().catch(console.error);
  }, []);

  function handleClick(newGuess) {
    console.log(`Got ${newGuess}`);
    setCardsGuessed([...cardsGuessed, newGuess]);
  }

  useEffect(() => {
    /*
      Consider if useEffect is really needed here, could shovel this all into handleClick.
    */
    function resetGame() {
      console.log('Resetting game...');
      getCards().catch(console.error);
      setCardsGuessed([]);
      setScore(0);
    }

    const allUnique = cardsGuessed.length === [...new Set(cardsGuessed)].length;

    if (!allUnique) {
      resetGame();
    } else {
      setScore(cardsGuessed.length);
      setBestScore(prevBest => {
        return cardsGuessed.length > prevBest ? cardsGuessed.length : prevBest
      });

    }
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
