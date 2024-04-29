// emailHelper.js
const nodemailer = require('nodemailer');

// Create a transporter object using SMTP transport
let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'bryansagarino222@gmail.com',
        pass: 'sfld srmj kclj vmgt'
    }
});

// Function to send email
exports.sendEmail = (to, subject, htmlContent) => {
    // Email options
    let mailOptions = {
        from: 'rybrybb@gmail.com',
        to: to,
        subject: subject,
        html: htmlContent  // Set the content type to HTML
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error occurred while sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};
