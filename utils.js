import puppeteer from 'puppeteer';
import os from 'node:os';
import fs from 'node:fs';
import path from 'node:path';
import https from 'https';
import http from 'http';

export async function investigateDOM() {
  console.log('[INFO] Starting DOM investigation...');
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const targetUrl = process.env.TARGET_URL;
  console.log(`[INFO] Navigating to: ${targetUrl}`);

  try {
    await page.goto(targetUrl, {
      waitUntil: 'networkidle0',
    });
    console.log('[INFO] Page loaded successfully.');
  } catch (error) {
    console.error('[ERROR] Failed to load the page:', error);
    await browser.close();
    return;
  }

  const logoBoxData = await page.$$eval(
    'div.logo-box',
    (elements) =>
      elements
        .map((el) => {
          const id = el.querySelector('figure')?.getAttribute('data-id');
          const backgroundImage = el.style.backgroundImage.match(/url\(["']?(.*?)["']?\)/)?.[1];
          return { id, backgroundImage };
        })
        .filter((data) => data.id && data.backgroundImage) // Filter out invalid entries
  );

  console.log(`[INFO] Extracted logo-box data: ${JSON.stringify(logoBoxData, null, 2)}`);

  const filePath = './text.txt';
  let existingIds = [];
  let newCompanies = [];
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    existingIds = fileContent.split('\n').filter((id) => id);
    console.log(`[INFO] Existing IDs: ${existingIds.length > 0 ? existingIds : 'None found'}`);
  } else {
    console.log('[INFO] text.txt file does not exist. Creating a new one...');
  }

  const newLogoBoxes = logoBoxData.filter((data) => !existingIds.includes(data.id));
  if (newLogoBoxes.length > 0) {
    console.log(`[INFO] New logo-boxes found: ${newLogoBoxes.map((data) => data.id)}`);

    fs.appendFileSync(filePath, newLogoBoxes.map((data) => data.id).join('\n') + '\n');
    console.log('[INFO] New IDs appended to text.txt.');

    const imagesFolder = './images';
    if (!fs.existsSync(imagesFolder)) {
      fs.mkdirSync(imagesFolder);
      console.log('[INFO] Created images folder.');
    }

    for (const { id, backgroundImage } of newLogoBoxes) {
      const imageUrl = backgroundImage.startsWith('/') ? `${targetUrl}${backgroundImage}` : backgroundImage;
      const imagePath = path.join(imagesFolder, `${id}.png`);

      console.log(`[INFO] Downloading image for ID ${id} from ${imageUrl}...`);
      await downloadImage(imageUrl, imagePath);
      newCompanies.push(imagePath);

      console.log(`[INFO] Image for ID ${id} saved to ${imagePath}.`);
    }
  } else {
    console.log('[INFO] No new logo-boxes found.');
  }

  await browser.close();
  console.log('[INFO] Browser closed. DOM investigation completed.');
  return newCompanies;
}

async function downloadImage(url, filePath) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client
      .get(url, (response) => {
        if (response.statusCode === 200) {
          const fileStream = fs.createWriteStream(filePath);
          response.pipe(fileStream);
          fileStream.on('finish', () => {
            fileStream.close(resolve);
          });
        } else {
          reject(new Error(`Failed to download image: ${response.statusCode}`));
        }
      })
      .on('error', (err) => {
        reject(err);
      });
  });
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
