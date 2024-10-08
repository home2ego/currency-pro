const baseCurrency = document.querySelector('#base-currency');
const targetCurrency = document.querySelector('#target-currency');
const trackBtn = document.querySelector('#track-btn');
const hintBtn = document.querySelector('#hint-btn');

const baseCards = [...baseCurrency.querySelectorAll('.card')];
const targetCards = [...targetCurrency.querySelectorAll('.card')];

// Function to handle active card in the corresponding container
function handleActiveCard(container, clickedCard) {
  const active = container.querySelector('.card.active');

  if (active) {
    // If there is an active button(card), remove its active class and update its aria-checked attribute
    active.classList.remove('active');
    active.setAttribute('aria-checked', 'false');
  }

  // Add active class and set aria-checked to true for the clicked button(card)
  clickedCard.classList.add('active');
  clickedCard.setAttribute('aria-checked', 'true');
}

// Function to add the active state to a new card and disable corresponding card in the target container
function setBaseCurrencyCard(event) {
  const clickedCard = event.target.closest('.card');
  if (!clickedCard) return; // Exit if click is not on a card

  // Get the index of the clicked card
  const index = baseCards.indexOf(clickedCard);

  // Find the corresponding card in the target container by index
  const targetCard = targetCards[index];

  // Enable previously disabled card in the target container
  const disabledTargetCard = targetCurrency.querySelector('.card[disabled]');
  if (disabledTargetCard) {
    disabledTargetCard.removeAttribute('disabled');
  }

  // Disable the corresponding card in the target container
  if (targetCard) {
    targetCard.setAttribute('disabled', 'disabled'); // Disable the new corresponding card
  }

  // If the target card is active, remove its active state
  if (targetCard.classList.contains('active')) {
    targetCard.classList.remove('active');
  }

  handleActiveCard(baseCurrency, clickedCard);

  const baseValue = clickedCard.querySelector('[data-symbol]').dataset.symbol; // contains a symbol representing the selected currency
  sessionStorage.setItem('baseValue', baseValue);

  checkTrackButtonState();
}

// Function to add the active state to a new card in the target currency container
function setTargetCurrencyCard(event) {
  const clickedCard = event.target.closest('.card');
  if (!clickedCard) return; // Exit if click is not on a card

  handleActiveCard(targetCurrency, clickedCard);

  const targetValue = clickedCard.querySelector('[data-symbol]').dataset.symbol; // contains a symbol representing the selected currency
  sessionStorage.setItem('targetValue', targetValue);

  checkTrackButtonState();
}

// Function to check if both base and target currencies are selected
function checkTrackButtonState() {
  const baseActive = baseCurrency.querySelector('.card.active');
  const targetActive = targetCurrency.querySelector('.card.active');

  if (baseActive && targetActive) {
    hintBtn.classList.add('hidden'); // Hide the hint by adding the class
    trackBtn.classList.remove('disabled'); // Enable the link by removing the class
    trackBtn.removeAttribute('tabindex'); // Recover focus
    trackBtn.removeAttribute('aria-disabled'); // Remove aria-disabled
    trackBtn.setAttribute('aria-label', 'Track exchange rate, currently active');
    hintBtn.setAttribute('aria-hidden', 'true'); // Hide hint from screen readers
  } else {
    hintBtn.classList.remove('hidden'); // Show the hint by removing the class
    trackBtn.classList.add('disabled'); // Disable the link by adding the class
    trackBtn.setAttribute('tabindex', '-1'); // Remove focus
    trackBtn.setAttribute('aria-disabled', 'true'); // Enable aria-disabled
    trackBtn.setAttribute('aria-label', 'Track exchange rate, currently inactive');
    hintBtn.setAttribute('aria-hidden', 'false'); // Make hint accessible again
  }
}

// Event listeners for the card selections
baseCurrency.addEventListener('click', setBaseCurrencyCard);
targetCurrency.addEventListener('click', setTargetCurrencyCard);
