// // Import any necessary modules, such as nodemailer for sending emails
// const nodemailer = require('nodemailer');

// // Function to send OTP to user's email
// const sendOTP = (email, otp) => {
//   // Create a nodemailer transporter
//   const transporter = nodemailer.createTransport({
//     // Specify your email service provider, SMTP credentials, etc.
//     // Example:
//     service: 'gmail',
//     auth: {
//       user: 'rybrybb@gmail.com',
//       pass: 'Wybwybb031117'
//     }
//   });

//   // Email message options
//   const mailOptions = {
//     from: 'your-email@gmail.com',
//     to: email,
//     subject: 'OTP Verification Code',
//     text: `Your OTP (One-Time Password) is: ${otp}`
//   };

//   // Send email
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log('Error sending email:', error);
//     } else {
//       console.log('Email sent:', info.response);
//     }
//   });
// };

// // Export the sendOTP function
// module.exports = { sendOTP };
