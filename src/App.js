import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [cards, setCards] = useState([]);

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
          <li key={card.code}><img src={card.image} alt={`${card.value} OF ${card.suit}`} /></li>
        ))}  
      </ul>
    </div>
  );
}

export default App;
