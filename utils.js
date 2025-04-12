import puppeteer from 'puppeteer';
import os from 'node:os';

export async function investigateDOM() {
  const browser = await puppeteer.launch();
  await browser.close();
}

export function getIPAddress() {
  const interfaces = os.networkInterfaces();

  for (const iface of Object.values(interfaces)) {
    for (const config of iface) {
      if (config.family === 'IPv4' && !config.internal) {
        return config.address;
      }
    }
  }

  return 'localhost';
}
