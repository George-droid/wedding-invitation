const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define a route to serve the index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Email sending route
app.post('/send-email', (req, res) => {
  const { name, email, phone } = req.body;

  // Set up nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'gregeorge.gg@gmail.com',
      pass: 'bsba xjqh byfm jssd' // Your app-specific password here
    }
  });

  // Email options
  const mailOptions = {
    from: email,
    to: 'wisgeorge.wg@gmail.com', // replace with recipient email
    subject: 'New RSVP Confirmation',
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}`
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ status: 'error', message: error.toString() });
    }
    res.json({ status: 'success', message: 'Email sent successfully!' });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});