# Implementation
The goal of the game is to click all the unique cards once, in which case you "win" the round and the game restarts.

Components:
* App
* Header
* ScoreDisplay
* Card

Likely have App component keep most of the state.

## Source cards
Maybe we can use the deckofcardsapi.com to source playing cards. Then we can generate a deck, and draw 12 cards. Each API response for the drawn cards includes an image we can use in the Card component.

We probably want to fetch the data inside `useEffect` after we set up the state.

State representation:
```js
// App.js
const [cards, setCards] = useState();

const getCards = async () => {
  const deckResponse = await fetch(
    "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
  ).then((response) => response.json());

  let deckID = deckResponse.deck_id;
  const cardsResponse = await fetch(
    `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=12`
  ).then((response) => response.json());

  setCards(cardsResponse);
}

useEffect(() => {
  getCards().catch(console.error);
}, []);
```

I think this should load all the card data into the react component. I think I'm not using the promise properly, as the cards state array is not set by the time the main component hits it.

I think my issue was that I was not providing a default value for cards, which was causing some issues with it being "undefined" - adding the empty array to `useState` seemed to do the trick.

Now that I have my data, I can move on to the game components.

# Cards
So, the card data is sorted now and the next component to build is the "Card" component. I'm currently thinking about how to handle "already guessed" cards. Should the state object for each card have a flag?

Another option is to store the guessed card codes and just check against that to reset the score. I feel this is a little easier because then I don't have to read and adjust the card objects as I go. It's simply a matter of

```
set up displayArray
shuffle displayArray
listen for guess
on guess
  does guesses already contain this value?
    yes, reset score
    no, add 1 to score
  add guess to guessStore
  Shuffle display
```

I think this way, I can just make a copy of the state array, shuffle it, use it to map and display the card components without worrying about the underlying state detail.

How do I go about actually doing this?

```js
<Card onClick={() => setPlayerGuesses(card.code)} />
```

I'm not sure.