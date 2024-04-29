const sql = require("../config/config.js");


const Owner = function (Owner) {

  this.id = Owner.id;
  this.username = Owner.username;
  this.password = Owner.password;
  this.passcode = Owner.passcode;


};
const Video = function (video) {
  this.video_id = video.video_id;
  this.type = video.type;
  this.frame_1 = video.frame_1;
  this.frame_2 = video.frame_2;
  this.frame_3 = video.frame_3;
  this.frame_4 = video.frame_4;
  this.frame_5 = video.frame_5;
  this.frame_6 = video.frame_6;
  this.frame_7 = video.frame_7;
  this.frame_8 = video.frame_8;
  this.frame_9 = video.frame_9;
  this.frame_10 = video.frame_10;
  this.frame_11 = video.frame_11;
  this.frame_12 = video.frame_12;
  this.frame_13 = video.frame_13;
  this.frame_14 = video.frame_14;
  this.frame_15 = video.frame_15;
  this.frame_16 = video.frame_16;
  this.frame_17 = video.frame_17;
  this.frame_18 = video.frame_18;
  this.frame_19 = video.frame_19;
  this.frame_20 = video.frame_20;
  this.frame_21 = video.frame_21;
  this.frame_22 = video.frame_22;
  this.frame_23 = video.frame_23;
  this.frame_24 = video.frame_24;
  this.frame_25 = video.frame_25;
  this.frame_26 = video.frame_26;
  this.frame_27 = video.frame_27;
  this.frame_28 = video.frame_28;
  this.frame_29 = video.frame_29;
  this.frame_30 = video.frame_30;
  this.frame_31 = video.frame_31;
  this.frame_32 = video.frame_32;
  this.frame_33 = video.frame_33;
  this.frame_34 = video.frame_34;
  this.frame_35 = video.frame_35;
  this.frame_36 = video.frame_36;
  this.frame_37 = video.frame_37;
  this.frame_38 = video.frame_38;
  this.frame_39 = video.frame_39;
  this.frame_40 = video.frame_40;
  this.frame_41 = video.frame_41;
  this.frame_42 = video.frame_42;
  this.frame_43 = video.frame_43;
  this.frame_44 = video.frame_44;
  this.frame_45 = video.frame_45;
  this.frame_46 = video.frame_46;
  this.frame_47 = video.frame_47;
  this.frame_48 = video.frame_48;
  this.frame_49 = video.frame_49;
  this.frame_50 = video.frame_50;
};

// get owner

//getters
Owner.getUsers = (result) => {
  sql.query(
    "SELECT  * FROM owner",
    (err, res) => {
      if (err) {
        console.log("Error in executing getUsers query: ", err);
        result(err, null);
        return;
      }
      
      const details = res.map((row) => ({
        username: row.username,
        password: row.password,
        passcode: row.passcode,
      }));
      
      console.log(details);
      result(null, details);
    }
  );
};


Video.getVideo = (result) => {
  sql.query(
    "SELECT  video_id , type, timestamp, frame_1 FROM video",
    (err, res) => {
      if (err) {
        console.log("Error in executing getVideo query: ", err);
        result(err, null);
        return;
      }
      
      const details = res.map((row) => ({
        video_id: row.video_id,
        type: row.type,
        timestamp: row.timestamp,
        frame_1: row.frame_1,
      }));
      
      console.log(details);
      result(null, details);
    }
  );
};

Video.getVideoByID = (video_id, result) => {
  sql.query(
    "SELECT  * FROM video WHERE video_id= ? ",
    [video_id],
    (error, queryResult) => {
      if (error) {
        console.log("Error in  query", error);
        result(error, null);
        return;
      }
      const details = queryResult.map((row) => ({
        video_id: row.video_id,
        type: row.type,
        frame_1: row.frame_1,
        frame_2: row.frame_2,
        frame_3: row.frame_3,
        frame_4: row.frame_4,
        frame_5: row.frame_5,
        frame_6: row.frame_6,
        frame_7: row.frame_7,
        frame_8: row.frame_8,
        frame_9: row.frame_9,
        frame_10: row.frame_10,
        frame_11: row.frame_11,
        frame_12: row.frame_12,
        frame_13: row.frame_13,
        frame_14: row.frame_14,
        frame_15: row.frame_15,
        frame_16: row.frame_16,
        frame_17: row.frame_17,
        frame_18: row.frame_18,
        frame_19: row.frame_19,
        frame_20: row.frame_20,
        frame_21: row.frame_21,
        frame_22: row.frame_22,
        frame_23: row.frame_23,
        frame_24: row.frame_24,
        frame_25: row.frame_25,
        frame_26: row.frame_26,
        frame_27: row.frame_27,
        frame_28: row.frame_28,
        frame_29: row.frame_29,
        frame_30: row.frame_30,
        frame_31: row.frame_31,
        frame_32: row.frame_32,
        frame_33: row.frame_33,
        frame_34: row.frame_34,
        frame_35: row.frame_35,
        frame_36: row.frame_36,
        frame_37: row.frame_37,
        frame_38: row.frame_38,
        frame_39: row.frame_39,
        frame_40: row.frame_40,
        frame_41: row.frame_41,
        frame_42: row.frame_42,
        frame_43: row.frame_43,
        frame_44: row.frame_44,
        frame_45: row.frame_45,
        frame_46: row.frame_46,
        frame_47: row.frame_47,
        frame_48: row.frame_48,
        frame_49: row.frame_49,
        frame_50: row.frame_50,
      }));
      


      result(null, details);
    }
  );
};

//add video

Video.addVideo = (newVideo, result) => {
  sql.query(
      "INSERT INTO video SET ?", {
        type: newVideo.type,
        video_id: newVideo.video_id,
        frame_1: newVideo.frame_1,
        frame_2: newVideo.frame_2,
        frame_3: newVideo.frame_3,
        frame_4: newVideo.frame_4,
        frame_5: newVideo.frame_5,
        frame_6: newVideo.frame_6,
        frame_7: newVideo.frame_7,
        frame_8: newVideo.frame_8,
        frame_9: newVideo.frame_9,
        frame_10: newVideo.frame_10,
        frame_11: newVideo.frame_11,
        frame_12: newVideo.frame_12,
        frame_13: newVideo.frame_13,
        frame_14: newVideo.frame_14,
        frame_15: newVideo.frame_15,
        frame_16: newVideo.frame_16,
        frame_17: newVideo.frame_17,
        frame_18: newVideo.frame_18,
        frame_19: newVideo.frame_19,
        frame_20: newVideo.frame_20,
        frame_21: newVideo.frame_21,
        frame_22: newVideo.frame_22,
        frame_23: newVideo.frame_23,
        frame_24: newVideo.frame_24,
        frame_25: newVideo.frame_25,
        frame_26: newVideo.frame_26,
        frame_27: newVideo.frame_27,
        frame_28: newVideo.frame_28,
        frame_29: newVideo.frame_29,
        frame_30: newVideo.frame_30,
        frame_31: newVideo.frame_31,
        frame_32: newVideo.frame_32,
        frame_33: newVideo.frame_33,
        frame_34: newVideo.frame_34,
        frame_35: newVideo.frame_35,
        frame_36: newVideo.frame_36,
        frame_37: newVideo.frame_37,
        frame_38: newVideo.frame_38,
        frame_39: newVideo.frame_39,
        frame_40: newVideo.frame_40,
        frame_41: newVideo.frame_41,
        frame_42: newVideo.frame_42,
        frame_43: newVideo.frame_43,
        frame_44: newVideo.frame_44,
        frame_45: newVideo.frame_45,
        frame_46: newVideo.frame_46,
        frame_47: newVideo.frame_47,
        frame_48: newVideo.frame_48,
        frame_49: newVideo.frame_49,
        frame_50: newVideo.frame_50


      },
      (error, results) => {
          if (error) {
              console.log("Error: ", error);
              result(error, null);
              return;
          }

          result(null, {...newVideo });
      }
  );
};


















module.exports.Owner = Owner;
module.exports.Video = Video;

