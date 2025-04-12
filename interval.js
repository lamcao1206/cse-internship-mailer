import { investigateDOM } from './utils.js';

let intervalId = null;

export async function runInvestigation() {
  try {
    const newCompanies = await investigateDOM();
    console.log(newCompanies);
  } catch (error) {
    console.error('Error during DOM investigation:', error);
  }
}

export function startInvestigation() {
  runInvestigation();
  intervalId = setInterval(runInvestigation, 10000);
  console.log('Investigation interval started.');
}

export function stopInvestigation() {
  if (intervalId) {
    clearInterval(intervalId);
    console.log('Investigation interval stopped.');
  }
}
