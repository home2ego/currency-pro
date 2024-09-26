import FetchWrapper from './FetchWrapper.js';

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

// Instantiate API
const API = new FetchWrapper('https://v6.exchangerate-api.com/v6/64a8977b260387cdf33333bf');

const result = document.querySelector('#exchange__conversion');

function getConversionRates() {
  API.get(`/latest/${baseExchange.value}`).then((data) => {
    result.textContent = data.conversion_rates[targetExchange.value];
  });
}

// Fetch conversion rates immediately
getConversionRates();

// Event listeners for base and target currency changes
baseExchange.addEventListener('change', getConversionRates);
targetExchange.addEventListener('change', getConversionRates);
