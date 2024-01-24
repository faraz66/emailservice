const express = require('express');
const sgMail = require('@sendgrid/mail');

const app = express();
const port = 3000; // You can use any port that is free on your system

// Replace with your actual SendGrid API Key
const key = "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";
sgMail.setApiKey(key);

// Middleware to parse JSON requests
app.use(express.json());

app.post('/send-emails', async (req, res) => {
  const { to, from, subject, text } = req.body;

  if (!to || !from || !subject || !text) {
    return res.status(400).send({ message: 'Missing required fields' });
  }

  const msg = {
    to: to,
    from: from,
    subject: subject,
    text: text
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent');
    res.send({ message: 'Email sent successfully.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send({ message: 'Error sending email', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
