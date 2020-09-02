//Selector
const cards = document.querySelectorAll('.memory-card');
//variables for cards being flipped, locking board, and the cards themsevles
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function handleCardClick() {

  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add('flip');
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.picture === secondCard.dataset.picture;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', handleCardClick);
  secondCard.removeEventListener('click', handleCardClick);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', handleCardClick));

//need to add start game and restart game function as well as high and current score (research how)