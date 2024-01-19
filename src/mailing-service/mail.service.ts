import axios from 'axios';
import { MailgunMessageData } from 'mailgun.js';

export class MailService {
  static instance = new MailService();
  async send({ from = `Cabsol <info@comsoftltd.com>`, ...data }: MailgunMessageData) {
    const key = process.env['MAILGUN_KEY'] as string;
    const domain = process.env['MAILGUN_DOMAIN'] as string;
    try {
      const dt = { from, ...data };
      const mail = await axios({
        url: `https://api.mailgun.net/v3/${domain}/messages`,
        method: 'POST',
        auth: {
          username: 'api',
          password: key, //using firebase functions here
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: new URLSearchParams(dt as any),
      });
      return mail;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
