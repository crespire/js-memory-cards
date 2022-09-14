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

  return (
    <div className="App">
      <ul>
        {cards.map((card) => (
          <Card key={card.code} card={card} />
        ))}  
      </ul>
    </div>
  );
}

export default App;
