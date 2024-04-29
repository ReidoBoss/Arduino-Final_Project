const { Owner,Video } = require("../models/models.js");
const { sendEmail } = require('../emailHelper/emailHelper'); // Adjust the path accordingly

exports.getUsers= (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content cannot be empty",
    });
  }
  Owner.getUsers((err, users) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error occurred",
      });
    }
    res.send(users);
  });
};

exports.getVideo = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content cannot be empty",
    });
  }
  Video.getVideo((err, users) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error occurred",
      });
    }
    res.send(users);
  });
};

exports.getVideoByID = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty",
    });
    return;
  }
  Video.getVideoByID(req.params.id, (err, blog) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error occured",
      });
    }
    res.send(blog);
  });
};

exports.addVideo = (req, res) => {
  if (!req.body) {
      res.status(400).send({
          message: "Content cannot be empty",
      });
  }

  const { 
    frame_1,
    frame_2,
    frame_3,
    frame_4,
    frame_5,
    frame_6,
    frame_7,
    frame_8,
    frame_9,
    frame_10,
    frame_11,
    frame_12,
    frame_13,
    frame_14,
    frame_15,
    frame_16,
    frame_17,
    frame_18,
    frame_19,
    frame_20,
    frame_21,
    frame_22,
    frame_23,
    frame_24,
    frame_25,
    frame_26,
    frame_27,
    frame_28,
    frame_29,
    frame_30,
    frame_31,
    frame_32,
    frame_33,
    frame_34,
    frame_35,
    frame_36,
    frame_37,
    frame_38,
    frame_39,
    frame_40,
    frame_41,
    frame_42,
    frame_43,
    frame_44,
    frame_45,
    frame_46,
    frame_47,
    frame_48,
    frame_49,
    frame_50,
    
  } = req.files;

  const details = new Video({

      type:req.body.type,
      frame_1: frame_1[0] ? frame_1[0].buffer : null,
      frame_2: frame_2[0] ? frame_2[0].buffer : null,
      frame_3: frame_3[0] ? frame_3[0].buffer : null,
      frame_4: frame_4[0] ? frame_4[0].buffer : null,
      frame_5: frame_5[0] ? frame_5[0].buffer : null,
      frame_6: frame_6[0] ? frame_6[0].buffer : null,
      frame_7: frame_7[0] ? frame_7[0].buffer : null,
      frame_8: frame_8[0] ? frame_8[0].buffer : null,
      frame_9: frame_9[0] ? frame_9[0].buffer : null,
      frame_10: frame_10[0] ? frame_10[0].buffer : null,
      frame_11: frame_11[0] ? frame_11[0].buffer : null,
      frame_12: frame_12[0] ? frame_12[0].buffer : null,
      frame_13: frame_13[0] ? frame_13[0].buffer : null,
      frame_14: frame_14[0] ? frame_14[0].buffer : null,
      frame_15: frame_15[0] ? frame_15[0].buffer : null,
      frame_16: frame_16[0] ? frame_16[0].buffer : null,
      frame_17: frame_17[0] ? frame_17[0].buffer : null,
      frame_18: frame_18[0] ? frame_18[0].buffer : null,
      frame_19: frame_19[0] ? frame_19[0].buffer : null,
      frame_20: frame_20[0] ? frame_20[0].buffer : null,
      frame_21: frame_21[0] ? frame_21[0].buffer : null,
      frame_22: frame_22[0] ? frame_22[0].buffer : null,
      frame_23: frame_23[0] ? frame_23[0].buffer : null,
      frame_24: frame_24[0] ? frame_24[0].buffer : null,
      frame_25: frame_25[0] ? frame_25[0].buffer : null,
      frame_26: frame_26[0] ? frame_26[0].buffer : null,
      frame_27: frame_27[0] ? frame_27[0].buffer : null,
      frame_28: frame_28[0] ? frame_28[0].buffer : null,
      frame_29: frame_29[0] ? frame_29[0].buffer : null,
      frame_30: frame_30[0] ? frame_30[0].buffer : null,
      frame_31: frame_31[0] ? frame_31[0].buffer : null,
      frame_32: frame_32[0] ? frame_32[0].buffer : null,
      frame_33: frame_33[0] ? frame_33[0].buffer : null,
      frame_34: frame_34[0] ? frame_34[0].buffer : null,
      frame_35: frame_35[0] ? frame_35[0].buffer : null,
      frame_36: frame_36[0] ? frame_36[0].buffer : null,
      frame_37: frame_37[0] ? frame_37[0].buffer : null,
      frame_38: frame_38[0] ? frame_38[0].buffer : null,
      frame_39: frame_39[0] ? frame_39[0].buffer : null,
      frame_40: frame_40[0] ? frame_40[0].buffer : null,
      frame_41: frame_41[0] ? frame_41[0].buffer : null,
      frame_42: frame_42[0] ? frame_42[0].buffer : null,
      frame_43: frame_43[0] ? frame_43[0].buffer : null,
      frame_44: frame_44[0] ? frame_44[0].buffer : null,
      frame_45: frame_45[0] ? frame_45[0].buffer : null,
      frame_46: frame_46[0] ? frame_46[0].buffer : null,
      frame_47: frame_47[0] ? frame_47[0].buffer : null,
      frame_48: frame_48[0] ? frame_48[0].buffer : null,
      frame_49: frame_49[0] ? frame_49[0].buffer : null,
      frame_50: frame_50[0] ? frame_50[0].buffer : null,

      


  });

  Video.addVideo(details, (err, result) => {
      if (err) {
          res.status(500).send({
              message: err.message || 'Internal Server Error',
          });
          return;
      }

      res.status(201).send(result);
  });
};



exports.sendMail = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty",
    });
  }
  
  const newUserEmail = req.body.email;
  const welcomeSubject = req.body.subject;
  const welcomeMessage = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Our App</title>
      <style>
          /* Reset styles */
          body, h1, p {
              margin: 0;
              padding: 0;
          }
  
          /* Container styles */
          .container {
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              font-family: Arial, sans-serif;
              background: #f5f5f5; /* Light gray */
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
              color: #333;
              position: relative;
              overflow: hidden;
              border: 2px solid #007bff; /* Blue border */
          }
  
          /* Header styles */
          .header {
              text-align: center;
          }
  
          /* Logo styles */
          .logo {
              width: 150px;
              height: auto;
              margin-bottom: 20px;
          }
  
          /* Content styles */
          .content {
              background-color: #fff; /* White */
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              color: #333;
          }
  
          /* Title styles */
          .title {
              font-size: 32px;
              margin-bottom: 20px;
              text-align: center;
              color: #007bff; /* Blue */
              font-weight: bold;
          }
  
          /* Message styles */
          .message {
              font-size: 22px; /* Increased font size */
              line-height: 1.6;
              color: #555;
              margin-bottom: 20px;
          }
  
          /* Button styles */
          .button {
              display: inline-block;
              background-color: #007bff; /* Blue */
              color: #fff;
              text-decoration: none;
              padding: 15px 30px;
              border-radius: 10px;
              transition: background-color 0.3s ease;
              font-size: 20px;
              margin-top: 20px;
              text-align: center;
          }
  
          .button:hover {
              background-color: #0056b3; /* Darker blue */
          }
  
          /* Decorative styles */
          .decor {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-image: url('https://i.ibb.co/N9h5kXt/stars.png');
              background-size: cover;
              background-position: center;
              z-index: -1;
              pointer-events: none;
              animation: twinkle 10s linear infinite;
          }
  
          @keyframes twinkle {
              0% { opacity: 1; }
              50% { opacity: 0.8; }
              100% { opacity: 1; }
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="decor"></div>
          <div class="header">
              <img src="https://cdn.freebiesupply.com/logos/large/2x/mrs-logo-png-transparent.png" alt="Logo" class="logo">
          </div>
          <div class="content">
              <p class="title">M.R.S SECURITY MESSAGE</p>
              <p class="message" style="font-size: 24px;">${req.body.letter}</p> <!-- Increased font size -->
              <p class="message" style="font-size: 24px;">${req.body.message}</p> <!-- Increased font size -->
          </div>
      </div>
  </body>
  </html>
  
  `;

  sendEmail(newUserEmail, welcomeSubject, welcomeMessage);

  res.status(201).send(); 
};

