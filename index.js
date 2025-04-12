import express from 'express';
import { getIPAddress } from './utils.js';

const app = express();
const port = process.env.PORT || 3000;
const host = getIPAddress();

app.listen(port, host, () => {
  console.log(`Server is listening on http://${host}:${port}..."`);
});
