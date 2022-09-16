import './App.css';
import React, { useState, useEffect } from 'react';
import Card from './components/Card';
import Score from './components/Score';

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

  function shuffleDeck(array) {
    // Durstenfeld/Fisher-Yates shuffle implementation
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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
    function resetGame(resetBest = false) {
      console.log('Resetting game...');
      getCards().catch(console.error);
      setCardsGuessed([]);
      setScore(0);
      if (resetBest) { setBestScore(0) }
    }

    const allUnique = cardsGuessed.length === [...new Set(cardsGuessed)].length;

    if (!allUnique || cardsGuessed.length === 12) {
      if (cardsGuessed.length === 12) {
        alert('You won!');
        resetGame(true);
      }
      resetGame();
    } else {
      setScore(cardsGuessed.length);
      setBestScore(prevBest => {
        return cardsGuessed.length > prevBest ? cardsGuessed.length : prevBest
      });
      setCards(prevDeck => {
        return shuffleDeck(prevDeck);
      });
    }
  }, [cardsGuessed]);

  return (
    <div className="App">
      <div className="">
        <Score score={score} bestScore={bestScore} />
      </div>
      <div className="">
        {cards.map((card) => (
          <Card key={card.code} card={card} handleClick={handleClick} />
        ))}
      </div>
    </div>
  );
}

export default App;
