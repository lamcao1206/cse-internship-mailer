import { investigateDOM } from './utils.js';
import { transporter } from './mailer.js';

let intervalId = null;

export async function runInvestigation() {
  try {
    const newCompanies = await investigateDOM();

    if (newCompanies.length > 0) {
      const emailSubject = `${newCompanies.length} new Companies Found`;
      const emailBody = `
        <h1>${newCompanies.length} New Companies Found</h1>
      `;

      const attachments = newCompanies.map((filePath) => ({
        filename: filePath.split('/').pop(),
        path: filePath,
      }));

      await transporter.sendMail({
        from: process.env.EMAIl,
        to: process.env.EMAIl,
        subject: emailSubject,
        html: emailBody,
        attachments,
      });

      console.log('[INFO] Email sent successfully with attachments.');
    }
  } catch (error) {
    console.error('[ERROR] Error during DOM investigation:', error);
  }
}

export function startInvestigation() {
  runInvestigation();
  intervalId = setInterval(runInvestigation, 10000);
  console.log('[INFO] Investigation interval started.');
}

export function stopInvestigation() {
  if (intervalId) {
    clearInterval(intervalId);
    console.log('[INFO] Investigation interval stopped.');
  }
}
