import express from 'express';
import { getIPAddress } from './utils.js';
import { startInvestigation, stopInvestigation } from './interval.js';

const app = express();
const port = process.env.PORT || 3000;
const host = getIPAddress();

startInvestigation();

const cleanup = () => {
  stopInvestigation();
  console.log('Shutting down server...');
  process.exit();
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
process.on('exit', cleanup);

app.listen(port, host, () => {
  console.log(`Server is listening on http://${host}:${port}...`);
});
