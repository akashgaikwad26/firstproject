const { Pool, Client } = require('pg');
let dbconfig = require('./dbconfig');
let dbExercises = require('./dbExercises');
let userResponse = require('./dbUserResponse');
const dbErrorHandler=require('./dbErrorHandler');

let exercise_status = require('./dbConstants.js');
let getExercisesTable = exercise_status.getExercisesTable();
let getUserResponseTable = exercise_status.getUserResponseTable();
let getLevelSummaryTable = exercise_status.getLevelSummaryTable();
let getUserLevelSummaryTable = exercise_status.getUserLevelSummaryTable();

const pool = new Pool(dbconfig);
const DEFAULT_OPEN_LEVEL = 4;
const MIN_AVERAGE = 75.0;
const MIN_THRESHOLD_RATIO = 0.4;

async function exerciseStatus(userid, module) {
  if (userid === undefined || module === undefined) {
    return {
      message: "Not acceptable",
      status: 406,
    };
  }
  else {
    try {

      let userLevel = await getUserProgressLevel(userid);
    }
    catch (error) {
      console.log(error.code);
      let result=await dbErrorHandler.ErrorHandler(error.code)
      return result
  }
    console.log("USER PROGRESS LEVEL for user: " + userid + " = " + userLevel);
    try {

      let data = await dbExercises.getExercises(module);
      getExercisesStatusWithDefaultLevel(data, userLevel);
      return data;
    }
    catch (error) {
      console.log(error.code);
      let result=await dbErrorHandler.ErrorHandler(error.code)
      return result
  }

  }
};

async function exercisesWithFilter(userid, module, status, locklevel) {
  let message
  let code
  if (userid === undefined || module === undefined || status === undefined || locklevel === undefined) {
    return {
      message: "Not acceptable",
      status: 406,
    };
  }
  let filterQuery = "";
  let toStatus;
  var unlockedUserIds = ["javed.inamdar@datasciencelab.in", "anjum@datasciencelab.in", "dpapte@gmail.com", "yasmeen.sayyed@gmail.com"];
  //, "demo1@gmail.com", "demo2@gmail.com"
  

  if (!(unlockedUserIds.includes(userid))) {
    switch (status) {
      case 'available':
        filterQuery = "(select * from " + getExercisesTable + " where module='" + module + "' and exid not in (select exid from " + getUserResponseTable + " where userid='" + userid + "') and level <= " + locklevel + ") union (select * from " + getExercisesTable + " where module='" + module + "' and exid in (select exid from " + getUserResponseTable + " where userid='" + userid + "' and status!='complete' ))";
        toStatus = status;
        break;
      case 'locked':
        filterQuery = "select * from " + getExercisesTable + " where module='" + module + "' and level > " + locklevel;
        toStatus = status;
        break;
      case 'inprogress':
        filterQuery = "select * from " + getExercisesTable + " where module='" + module + "' and exid in (select exid from " + getUserResponseTable + " where userid='" + userid + "' and status='in-complete')";
        toStatus = status;
        break;
      case 'ready':
        filterQuery = "select * from " + getExercisesTable + " where module='" + module + "' and exid in (select exid from " + getUserResponseTable + " where userid='" + userid + "' and status='ready')";
        toStatus = status;
        break;
      case 'complete':
        filterQuery = "select * from " + getExercisesTable + " where module='" + module + "' and exid in (select exid from " + getUserResponseTable + " where userid='" + userid + "' and status='complete')";
        toStatus = status;
        break;
      default:
        filterQuery = "select * from " + getExercisesTable + " where module='reader' and level <= " + DEFAULT_OPEN_LEVEL;

    }
    filterQuery += " order by cat_seq,subcat_seq,ex_seq;";
  } else {
    switch (status) {
      case 'available':
        filterQuery = "(select * from " + getExercisesTable + " where module='" + module + "' and exid not in (select exid from " + getUserResponseTable + " where userid='" + userid + "') and level > 0 " + ") union (select * from " + getExercisesTable + " where module='" + module + "' and exid in (select exid from " + getUserResponseTable + " where userid='" + userid + "' and status!='complete' ))";
        toStatus = status;
        break;
      case 'locked':
        filterQuery = "select * from " + getExercisesTable + " where module='" + module + "' and level < 0 ";
        toStatus = status;
        break;
      case 'inprogress':
        filterQuery = "select * from " + getExercisesTable + " where module='" + module + "' and exid in (select exid from " + getUserResponseTable + " where userid='" + userid + "' and status='in-complete')";
        toStatus = status;
        break;
      case 'ready':
        filterQuery = "select * from " + getExercisesTable + " where module='" + module + "' and exid in (select exid from " + getUserResponseTable + " where userid='" + userid + "' and status='ready')";
        toStatus = status;
        break;
      case 'complete':
        filterQuery = "select * from " + getExercisesTable + " where module='" + module + "' and exid in (select exid from " + getUserResponseTable + " where userid='" + userid + "' and status='complete')";
        toStatus = status;
        break;
      default:
        filterQuery = "select * from " + getExercisesTable + " where module='reader' and level <= " + DEFAULT_OPEN_LEVEL;

    }
    filterQuery += " order by cat_seq,subcat_seq,ex_seq;";
  }

  console.log("Filter Query = " + filterQuery);

  try {
    // let key = userid + "" + toStatus
    // const filteredExercises = await toSetCache.toSetCache(key, async () => {
    //   const results = await pool.query(filterQuery);
    //   // console.log(results.rows.length)
    //   return results.rows;
    // });
    // // console.log(toStatus, filteredExercises.length)
    // return filteredExercises;

    const filteredExercises = await pool.query(filterQuery);
    console.log(toStatus, filteredExercises.rows.length)
    return filteredExercises.rows
    // return {
    //   data: filteredExercises.rows,
    //   status: toStatus,
    // };
  } catch (error) {
    console.log(error.code);
    let result=await dbErrorHandler.ErrorHandler(error.code)
       return result
}

}

function getExercisesStatusWithDefaultLevel(exercisedata, level) {
  console.log("Inside Default Level");
  let count = 0;

  for (var i = 0; i < exercisedata.length; i++) {
    if (exercisedata[i].level < level) {
      console.log(exercisedata[i].exid + "is UNLOCKED");
      count++;
    } else {
      console.log(exercisedata[i].exid + "is LOCKED");
    }
  }
  console.log("# of ex unlocked = " + count);
  console.log("# of ex locked = " + (exercisedata.length - count));

}


async function getUserProgressLevel(userid) {
  var level = DEFAULT_OPEN_LEVEL;
  if (userid === undefined) {
    return DEFAULT_OPEN_LEVEL;
  }
  let userResponseData = await userResponse.getUserResponse(userid);
  if (userResponseData === undefined || userResponseData.length === 0) {
    return DEFAULT_OPEN_LEVEL;
  } else {
    let tempTableName = "_temp_userid_" + Math.round(Math.random() * 100);
    let createQuery = "CREATE TABLE if not exists " + tempTableName + " as select userid, level, usercount, round(avg(percentscore)over (order by level asc rows between unbounded preceding and current row ), 2) as average, sum(usercount) over (order by level asc rows between unbounded preceding and current row ) as usertotal from " + getUserLevelSummaryTable + " where userid='" + userid + "' order by userid, level;"
    try {
      await pool.query(createQuery);
      let selectQuery = "select userid, " + tempTableName + ".level, usercount, average, total, usertotal, cumulative from " + tempTableName + " inner join " + getLevelSummaryTable + " on " + tempTableName + ".level=" + getLevelSummaryTable + ".level;"
      const userProgData = await pool.query(selectQuery);
      level = getUserLevelFromProgress(userProgData.rows);
      let deleteQuery = "DROP TABLE " + tempTableName + ";";
      await pool.query(deleteQuery);
    } catch (error) {
      console.log(error);
      return DEFAULT_OPEN_LEVEL;
    }
    return level;
  }
}

function getUserLevelFromProgress(progdata) {
  if (progdata === undefined || progdata.length === 0) {
    return DEFAULT_OPEN_LEVEL;
  } else {
    //     console.log("No of rows = " + progdata.length);
    //     console.log(progdata[0].average);
    //     console.log(progdata[0].usertotal);
    //     console.log(progdata[0].cumulative);
    //     let average, usertotal, cumulative = 0;
    //   //  console.log(progdata);
    var i = 0;
    for (i = 0; i < progdata.length; i++) {
      average = progdata[i].average;
      usertotal = progdata[i].usertotal;
      cumulative = progdata[i].cumulative;
      //console.log(average, usertotal, cumulative);
      if (average > MIN_AVERAGE && usertotal > MIN_THRESHOLD_RATIO * cumulative) {
        continue;
      } else {
        break;
      }

    }
    if (i <= 2) {
      return DEFAULT_OPEN_LEVEL;
    } else {
      return i + 2;
    }
  }
}

// async function test()
// {
//     let results = await exerciseStatus('Bob.Beginner@gmail.com', 'reader');
//     //console.log(results);
//     //getExercisesStatusWithDefaultLevel(results);

// }

// test();

module.exports = {
  getUserProgressLevel: getUserProgressLevel,
  exercisesWithFilter: exercisesWithFilter
}