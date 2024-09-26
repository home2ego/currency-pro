const baseValue = sessionStorage.getItem('baseValue');
const targetValue = sessionStorage.getItem('targetValue');

const baseExchange = document.querySelector('#base-exchange');
const targetExchange = document.querySelector('#target-exchange');

function setSelectedAttr(currency) {
  currency.setAttribute('selected', 'selected');
}

// Find base and target currencies based on the selected buttons
const findBase = [...baseExchange].find((base) => base.value === baseValue);
const findTarget = [...targetExchange].find((target) => target.value === targetValue);

// Set selected attribute
setSelectedAttr(findBase);
setSelectedAttr(findTarget);

// Declare API and result variables
let API;
const result = document.querySelector('#exchange__conversion');

async function initializeAPI() {
  // Dynamic import of the FetchWrapper class
  const { default: FetchWrapper } = await import('./FetchWrapper.js');
  API = new FetchWrapper('https://v6.exchangerate-api.com/v6/64a8977b260387cdf33333bf');

  // Call getConversionRates after the API is initialized
  getConversionRates();
}

function getConversionRates() {
  API.get(`/latest/${baseExchange.value}`).then((data) => {
    result.textContent = data.conversion_rates[targetExchange.value];
  });
}

// Call the initialize function to set up the API
initializeAPI();

baseExchange.addEventListener('change', () => {
  getConversionRates();
});

targetExchange.addEventListener('change', () => {
  getConversionRates();
});
