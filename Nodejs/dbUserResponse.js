const { request } = require('express');
const { Pool, Client } = require('pg');
let dbconfig = require('./dbconfig');
const pool = new Pool(dbconfig);
let dbconst = require('./dbConstants.js')
const dbErrorHandler=require('./dbErrorHandler');

let getUserResponseTable = dbconst.getUserResponseTable();

function getMaxScore(level) {
  let message
  let code
  let totalmarks = 0.0
  if (level >= 1 && level <= 3) {
    totalmarks = 10.0
  }
  if (level >= 4 && level <= 6) {
    totalmarks = 20.0
  }
  if (level >= 7 && level <= 10) {
    totalmarks = 30.0
  }
  return totalmarks
}

function calcBadges(level, no_of_attempts) {
  let newBadge = 0
  if (level >= 1 && level <= 3) {
    if (no_of_attempts == 1) {
      newBadge = level * 5
    }
  }

  if (level >= 4 && level <= 6) {
    if (no_of_attempts == 1) {
      newBadge = level * 10
    }
    if (no_of_attempts == 2) {
      newBadge = level * 5
    }
  }

  if (level >= 7 && level <= 10) {
    if (no_of_attempts == 1) {
      newBadge = level * 10
    }
    if (no_of_attempts == 2) {
      newBadge = level * 5
    }
    if (no_of_attempts == 3) {
      newBadge = level * 3
    }
  }
  // console.log("new badge", newBadge);
  return newBadge;
}

function formater(dateVal) {
  let date = dateVal.getFullYear() + "-" + ("0" + (dateVal.getMonth() + 1)).slice(-2) + "-" + ("0" + dateVal.getDate()).slice(-2);

  return (date);
}

function getThresholdForCompletion(level) {
  const percentThreshold = 75;
  return percentThreshold;
}

function canMarkComplete(score, level) {
  return (parseFloat(score) / getMaxScore(level)) * 100 >= getThresholdForCompletion(level)
}


async function userResponse(exid, model, correct_value, questions, level, userid) {
  console.log("exid", exid);
  console.log("model", model);
  console.log("userid", userid);
  console.log("level", level);
  console.log("correct_value", correct_value);
  console.log("questions", questions);
  // let exid = request.body.exid;
  // let userid = request.query.userId
  // let countuserids = CheckForUserIds(userid, exid);
  // console.log(userid);
  let sql = "SELECT count('" + userid + "') from " + getUserResponseTable + " where exid='" + exid + "'and userid='" + userid + "'";
  console.log("Final sql : ", sql);
  let countIds
  try{

     countIds = await pool.query(sql)
    console.log(countIds.rows);
  }
 catch(error)
 {
   let result =await dbErrorHandler.ErrorHandler(error.code)
   return result
 }
  let QAdetails = []
  QAdetails.push(JSON.stringify(model));

  let first_attempt = formater(new Date());
  let last_attempt = formater(new Date());
  // let no_of_attempts = 1;
  let status = "in-complete";
  let badgePoints = 0;

  // let level = level;
  // console.log("level", typeof parseInt(level));
  let totalmarks = getMaxScore(parseInt(level));
  // console.log("tot marks : ", totalmarks);
  let score = Math.ceil(correct_value * (totalmarks / questions)).toFixed(1);
  // console.log("score : ", score);
  let message;
  let data = [];
  let statusCode = 0;


  let CheckForIf = (userid != undefined && correct_value != undefined && questions != undefined && QAdetails != undefined && score != undefined && first_attempt != undefined && last_attempt != undefined && status != undefined && totalmarks != undefined)

  if (CheckForIf) {
    if (countIds.rows[0].count == 0) {
      if (canMarkComplete(score, level)) {
        status = "ready"
      }
      var customQuery = "INSERT into " + getUserResponseTable + "(userid,exid,no_of_correct_answers ,no_of_total_questions,QA_details,first_attempt,last_attempt, no_of_attempts, score, badge_points, status,total_marks)values"
      // var customQuery = "INSERT into public.toTestDateTime(checkDate,checkTime)values"
      var no_of_attempts = 1
      badgePoints = calcBadges(level, no_of_attempts)
      // status = "in-complete"

      customQuery += "('" + userid + "','" + exid + "','" + correct_value + "','" + questions + "','" + QAdetails + "','" + first_attempt + "','" + last_attempt + "'," + no_of_attempts + "," + score + "," + badgePoints + ",'" + status + "'," + totalmarks + ")";

      message = "Data inserted into user response table";
      statusCode = 201;

      data = {
        "userid": userid,
        "exid": exid,
        "noOfCorrectAnswers": correct_value,
        "noOfTotalQues": questions,
        "qaDetails": QAdetails,
        "firstAttempt": first_attempt,
        "lastAttempt": last_attempt,
        "numbOfAttempts": no_of_attempts,
        "score": score,
        "badges": badgePoints,
        "status": status,
        "total_marks": totalmarks,
      }

      // customQuery += "(" + formater(new Date()) + "," + checkDate + ")";
    } else {
      if (canMarkComplete(score, level)) {
        status = "ready"
      }
      var no_of_attempts_sql = "SELECT no_of_attempts from " + getUserResponseTable + " where exid='" + exid + "'and userid='" + userid + "'";
      try{

        const get_attempts = await pool.query(no_of_attempts_sql);
        
        var no_of_attempts = get_attempts.rows[0].no_of_attempts;
        
        no_of_attempts = no_of_attempts + 1;
      }
      catch (error) {
        console.log(error.code);
        let result=await dbErrorHandler.ErrorHandler(error.code)
       return result
    }
      if (no_of_attempts <= 3) {
        badges = calcBadges(level, no_of_attempts);
      }

      var customQuery = "UPDATE " + getUserResponseTable + " SET ";


      customQuery += "no_of_correct_answers='" + correct_value + "',QA_details='" + QAdetails + "',last_attempt='" + last_attempt + "',no_of_attempts=" + no_of_attempts + ",badge_points=" + badgePoints + ",score=" + score + ",status='" + status + "' where userid='" + userid + "' and exid='" + exid + "'";

      message = "Data updated into user response table"
      statusCode = 200;

      data = {
        "userid": userid,
        "exid": exid,
        "noOfCorrectAnswers": correct_value,
        "noOfTotalQues": questions,
        "qaDetails": QAdetails,
        "lastAttempt": last_attempt,
        "numbOfAttempts": no_of_attempts,
        "score": score,
        "badges": badgePoints,
        "status": status,
      }
    }
  }

  console.log("Final Query : ", customQuery);

  try {
    const results = await pool.query(customQuery);
    // console.log(results);
    return ({
      message: message,
      status: statusCode,
      data: data,
    })
  }catch (error) {
    console.log(error.code);
    let result=await dbErrorHandler.ErrorHandler(error.code)
    return result
}
}


async function markComplete(exid, level, userid) {
  let message
  let code

  let customQuery = "UPDATE " + getUserResponseTable + " SET "

   
  let statusCode;

  let status = "complete"

  customQuery += "status='" + status + "' where userid='" + userid + "' and exid='" + exid + "'";

  message = "Status updated"
  statusCode = 200;

  console.log("Final Query : ", customQuery);

  try {
    const results = await pool.query(customQuery);
    // console.log(results);
    return ({
      message: message,
      status: statusCode,
    })
  } catch (error) {
    console.log(error.code);
    let result=await dbErrorHandler.ErrorHandler(error.code)
       return result
}

}

// returns the response for the specified exid or response for all exercises submitted
// based on whether exid is specified or not
async function getUserResponse(userid, exid) {
  let message
  let code
  if (userid === undefined) {
    return {
      message: "Not acceptable",
      status: 406,
    };
  }
  let responseQuery = "SELECT * from " + getUserResponseTable + " where userid='" + userid + "'";
  if (exid !== undefined) {
    responseQuery += " and exid='" + exid + "'";
  }

  try {
    const userResponseData = await pool.query(responseQuery);
    // console.log("SCORE : ", score.rows[0].score);
    return userResponseData.rows;
  } catch (error) {
    console.log(error.code);
    let result=await dbErrorHandler.ErrorHandler(error.code)
    return result
}
}

// userResponse();
// markComplete();
// getUserResponse('Amit.Scholar@gmail.com').then(res=>{
//   console.log(res);
// });
module.exports = {
  userResponse: userResponse,
  markComplete: markComplete,
  getUserResponse: getUserResponse,
}