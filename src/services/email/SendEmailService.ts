/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  createTestAccount,
  createTransport,
  getTestMessageUrl,
} from 'nodemailer';

async function sendEmailService(emails: string[]) {
  const to = emails.join(',');

  const testAccount = await createTestAccount();

  const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>',
    to,
    subject: 'Hello ✔',
    text: 'Hello world?',
    html: '<b>Hello world?</b>',
  });

  console.log(`Message sent: ${info.messageId}`);
  console.log(`Message sent to ${to}`);
  console.log(`Check the sent email HERE ->>> URL: ${getTestMessageUrl(info)}`);
}

export { sendEmailService };
