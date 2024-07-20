const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Configure the email transport using the default SMTP transport and a GMail account.
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'gregeorge.gg@gmail.com', // Replace with your email
        pass: 'gajh qjna xehz dizz' // Replace with your password
    }
});

// POST route to send email
app.post('/send', (req, res) => {
    const { name, email, phone } = req.body;

    const mailOptions = {
        from: 'gregeorge.gg@gmail.com',
        to: 'wisgeorge.wg@gmail.com', // The recipient email
        subject: 'Wedding Invitation Confirmation',
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.send('Email sent: ' + info.response);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});