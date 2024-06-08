const emojis = [
  "🐼",
  "🐤",
  "🦆",
  "🐉",
  "🦕",
  "🦖",
  "🐳",
  "🐬",
  "🐟️",
  "🐠",
  "🐡",
  "🦈",
  "🐙",
  "🦑",
  "🦀",
  "🦞",
  "🦐",
  "🦪",
];

// buttons
const btnEasy = document.querySelector('.btn easy-level');
const btnMedium = document.querySelector('.btn medium-level');
const btnHard = document.querySelector('.btn hard-level');

const container = document.querySelector('.container')
const cards = document.querySelector('.cards');
const cardsPicksList = [...emojis, ...emojis]
const cardsCount = cardsPicksList.length;
//console.log(cardsCount)

let gameOn = false;
let activeCard = null;
let revealedCards = 0;
let awaitngEndOfMove = false;

const buildCard = (emoji) => {
  const cardElement = document.createElement('div');
  cardElement.classList.add('card');
  cardElement.setAttribute('data-emoji', emoji)
  //cardElement.innerHTML = emoji;

  cardElement.addEventListener('click', () => {
    if (awaitngEndOfMove) {
      return;
    }
    cardElement.innerHTML = emoji;

    if (!activeCard) {
      activeCard = cardElement;
    }
   
  })

  return cardElement;
}


for (let i = 0; i < cardsCount; i++) {
  const randomIdx = Math.floor(Math.random() * cardsPicksList.length)
  const emoji = cardsPicksList[randomIdx];
  cardsPicksList.splice(randomIdx, 1);
  const card = buildCard(emoji);
  cards.append(card);
  cards.style.gridTemplateColumns = `repeat(${cardsCount / 6}, 1fr)`
}

