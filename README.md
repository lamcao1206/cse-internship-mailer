# CSE Internship Mailer

This project is a Node.js application designed to monitor a webpage for new company logos, download their images, and send email notifications when new companies are detected.

Fun fact: This is a Node.js version of a [Spring Boot repository](https://github.com/example/spring-boot-internship-mailer) that implements similar functionality using Java and Spring Boot. While that project using Telegram Bot for notification, this project using Gmail, which is more convenient for notification.

---

## Features

- **Web Scraping**: Uses Puppeteer to scrape `div.logo-box` elements from a target webpage.
- **Image Downloading**: Downloads company logo images and stores them in a local `images` folder.
- **Email Notifications**: Sends an email with the details of new companies and attaches their logo images.process.

---

## Prerequisites

- **Node.js**: Ensure you have Node.js installed (v14 or higher recommended).
- **Environment Variables**:
  - `TARGET_URL`: The URL of the webpage to scrape.
  - `PORT`: (Optional) The port for the Express server (default: `3000`).
  - `EMAIL`: Your email that you want to get notificated.

---

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd cse-internship-mailer
   ```

2. Install dependencies:
   ```bash
   yarn
   ```
3. Create a `credentials.json` file in the root directory with the following structure:

```json
{
  "user": "your-email@gmail.com",
  "pass": "your-email-password"
}
```

3. Create a `credentials.json` file in the root directory with the following structure:

```bash
PORT=<your_post>
TARGET_URL=https://internship.cse.hcmut.edu.vn/
EMAIL=<your_email_you_want_to_get_notification>
```
