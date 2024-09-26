const baseValue = sessionStorage.getItem('baseValue');
const targetValue = sessionStorage.getItem('targetValue');

const baseExchange = document.querySelector('#base-exchange');
const targetExchange = document.querySelector('#target-exchange');

function setSelectedAttr(currency) {
  currency.setAttribute('selected', 'selected');
}

// Find base and target currencies based on the selected buttons
const findBase = [...baseExchange.options].find((base) => base.value === baseValue);
const findTarget = [...targetExchange.options].find((target) => target.value === targetValue);

// Set selected attribute
setSelectedAttr(findBase);
setSelectedAttr(findTarget);

// Dynamic import of the FetchWrapper class
// const { default: FetchWrapper } = await import('...'); // Top-level await can be used without wrapping it into an async function
// const API = new FetchWrapper('https://v6.exchangerate-api.com/v6/REPLACE_YOUR_API_KEY_HERE');

const resultExchange = document.querySelector('#exchange__conversion');
