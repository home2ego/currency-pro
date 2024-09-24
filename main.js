const baseCurrency = document.querySelector('#base-currency');
const targetCurrency = document.querySelector('#target-currency');
const trackBtn = document.querySelector('#track-btn');

const baseCards = [...baseCurrency.querySelectorAll('.card')];
const targetCards = [...targetCurrency.querySelectorAll('.card')];

// Function to handle active card in the corresponding container
function handleActiveCard(container, clickedCard) {
  const active = container.querySelector('.card.active');
  active?.classList.remove('active');
  clickedCard.classList.add('active');
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

  checkTrackButtonState();
}

// Function to add the active state to a new card in the target currency container
function setTargetCurrencyCard(event) {
  const clickedCard = event.target.closest('.card');
  if (!clickedCard) return; // Exit if click is not on a card

  handleActiveCard(targetCurrency, clickedCard);

  checkTrackButtonState();
}

// Function to check if both base and target currencies are selected
function checkTrackButtonState() {
  const baseActive = baseCurrency.querySelector('.card.active');
  const targetActive = targetCurrency.querySelector('.card.active');

  if (baseActive && targetActive) {
    trackBtn.classList.remove('disabled'); // Enable the link by removing the class
    trackBtn.setAttribute('tabindex', '0');
  } else {
    trackBtn.classList.add('disabled'); // Disable the link by adding the class
    trackBtn.setAttribute('tabindex', '-1');
  }
}

// Event listeners for the card selections
baseCurrency.addEventListener('click', setBaseCurrencyCard);
targetCurrency.addEventListener('click', setTargetCurrencyCard);
