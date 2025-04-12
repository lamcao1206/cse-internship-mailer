import { createTransport } from 'nodemailer';
import path from 'node:path';
import fs from 'node:fs';

const credentialsPath = path.join('credentials.json');

const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf-8'));

const transporter = createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: credentials.user,
    pass: credentials.pass,
  },
});
