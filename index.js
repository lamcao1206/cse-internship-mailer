import express from 'express';
import { getIPAddress, investigateDOM } from './utils.js';

const app = express();
const port = process.env.PORT || 3000;
const host = getIPAddress();

(async () => {
  try {
    const newCompanies = await investigateDOM();
    console.log(newCompanies);
  } catch (error) {
    console.error('Error during DOM investigation:', error);
  }
})();

app.listen(port, host, () => {
  console.log(`Server is listening on http://${host}:${port}..."`);
});
