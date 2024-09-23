// Cache all the selectors to avoid repeated DOM searches
const baseCurrency = document.querySelector('#base-currency');
const targetCurrency = document.querySelector('#target-currency');

// Function to activate a new card and disable already selected
function setActiveCard(event, container) {
  const clickedCard = event.target.closest('.card');
  if (!clickedCard) return; // Exit if click is not on a card

  const active = container.querySelector('.card.active');
  active?.classList.remove('active');
  clickedCard.classList.add('active');
}

// Combine event listeners for both containers
baseCurrency.addEventListener('click', (event) => setActiveCard(event, baseCurrency));
targetCurrency.addEventListener('click', (event) => setActiveCard(event, targetCurrency));
