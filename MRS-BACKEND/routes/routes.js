module.exports = (app) => {
  const router = require('express').Router();
  const multer = require('multer');
  const storage = multer.memoryStorage(); 
  const upload = multer({ storage: storage });

  const controller = require('../controllers/controllers.js');

  // GETTERS
  router.get("/getUsers", controller.getUsers);
  router.get("/getVideo", controller.getVideo);
  router.get("/getVideoByID/:id", controller.getVideoByID);


  
  // POSTERS
  router.post('/sendMail', upload.fields([]), controller.sendMail);
  router.post('/addVideo', upload.fields([
    { name: 'frame_1', maxCount: 1 },
    { name: 'frame_2', maxCount: 1 },
    { name: 'frame_3', maxCount: 1 },
    { name: 'frame_4', maxCount: 1 },
    { name: 'frame_5', maxCount: 1 },
    { name: 'frame_6', maxCount: 1 },
    { name: 'frame_7', maxCount: 1 },
    { name: 'frame_8', maxCount: 1 },
    { name: 'frame_9', maxCount: 1 },
    { name: 'frame_10', maxCount: 1 },
    { name: 'frame_11', maxCount: 1 },
    { name: 'frame_12', maxCount: 1 },
    { name: 'frame_13', maxCount: 1 },
    { name: 'frame_14', maxCount: 1 },
    { name: 'frame_15', maxCount: 1 },
    { name: 'frame_16', maxCount: 1 },
    { name: 'frame_17', maxCount: 1 },
    { name: 'frame_18', maxCount: 1 },
    { name: 'frame_19', maxCount: 1 },
    { name: 'frame_20', maxCount: 1 },
    { name: 'frame_21', maxCount: 1 },
    { name: 'frame_22', maxCount: 1 },
    { name: 'frame_23', maxCount: 1 },
    { name: 'frame_24', maxCount: 1 },
    { name: 'frame_25', maxCount: 1 },
    { name: 'frame_26', maxCount: 1 },
    { name: 'frame_27', maxCount: 1 },
    { name: 'frame_28', maxCount: 1 },
    { name: 'frame_29', maxCount: 1 },
    { name: 'frame_30', maxCount: 1 },
    { name: 'frame_31', maxCount: 1 },
    { name: 'frame_32', maxCount: 1 },
    { name: 'frame_33', maxCount: 1 },
    { name: 'frame_34', maxCount: 1 },
    { name: 'frame_35', maxCount: 1 },
    { name: 'frame_36', maxCount: 1 },
    { name: 'frame_37', maxCount: 1 },
    { name: 'frame_38', maxCount: 1 },
    { name: 'frame_39', maxCount: 1 },
    { name: 'frame_40', maxCount: 1 },
    { name: 'frame_41', maxCount: 1 },
    { name: 'frame_42', maxCount: 1 },
    { name: 'frame_43', maxCount: 1 },
    { name: 'frame_44', maxCount: 1 },
    { name: 'frame_45', maxCount: 1 },
    { name: 'frame_46', maxCount: 1 },
    { name: 'frame_47', maxCount: 1 },
    { name: 'frame_48', maxCount: 1 },
    { name: 'frame_49', maxCount: 1 },
    { name: 'frame_50', maxCount: 1 },
  ]), controller.addVideo);
  



  // get owner [0]
  //get all video
  // get video by id
  //get chat
  //history

  app.use('/', router);
};
  