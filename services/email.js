const sendgrid = require('@sendgrid/mail');
const Mailgen = require('mailgen');
require('dotenv').config;

class EmailService {
  #sender = sendgrid;
  #GenerateTemplate = Mailgen;
  constructor(env) {
    switch (env) {
      case 'development':
        this.link = 'http://localhost:3000';
        break;
      case 'production':
        this.link = 'link for production';
        break;
      default:
        this.link = 'http://localhost:3000';
        break;
    }
  }
  #createTemplateVerifyEmail(verifyToken) {
    const mailGenerator = new this.#GenerateTemplate({
      theme: 'cerberus',
      product: {
        name: 'Phonebook',
        link: this.link,
      },
    });
    const email = {
      body: {
        name: 'Phonebook verification',
        intro: "Welcome to Phonebook! We're very excited to have you on board.",
        action: {
          instructions: 'To get started with Phonebook, please click here:',
          button: {
            color: '#22BC66', // Optional action button color
            text: 'Confirm your account',
            link: `${this.link}/api/users/verify/${verifyToken}`,
          },
        },
      },
    };

    const emailBody = mailGenerator.generate(email);
    return emailBody;
  }
  async sendVerifyEmail(verifyToken, email) {
    this.#sender.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: email, // Change to your recipient
      from: 'streltsovyurii86@gmail.com', // Change to your verified sender
      subject: 'Verify email',
      html: this.#createTemplateVerifyEmail(verifyToken),
    };

    this.#sender.send(msg);
  }
}

module.exports = EmailService;
