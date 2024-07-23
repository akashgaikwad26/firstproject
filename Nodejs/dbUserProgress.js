const { Pool, Client } = require('pg');
let dbconfig = require('./dbconfig');
let db_exercises = require('./dbExercises');
let db_UserProgressHelper = require('./dbUserProgresshelper')
let dbconst = require('./dbConstants.js')
const dbErrorHandler=require('./dbErrorHandler');

let getUserCategorySummaryTable = dbconst.getUserCategorySummaryTable();

const pool = new Pool(dbconfig);

async function getTracksSubscribed(userId) {
  let message
  let code
  if (userId != undefined) {
    try{

      let result = await db_UserProgressHelper.user_track_progress(userId);
      return result
    }
    catch (error) {
      console.log(error.code);
      let result=await dbErrorHandler.ErrorHandler(error.code)
      return result
  }


  } else {
    return [];
  }
}

async function getTotalExercises(module, tracks) {
  let message
  let code
  if (module != undefined && tracks != undefined) {
    return db_exercises.getExercises(module, tracks)
  } else {
    return db_exercises.getExercises()
  }

}

async function getDateEnrolled(tracks, userId) {
  let message
  let code
  if (userId != undefined && tracks != undefined) {
    var d = new Date();
    return [
      {
        "tracksSubscribed": tracks,
        "dateEnrolled": d.getFullYear() + "/" + ('0' + (d.getMonth() + 1)).slice(-2) + "/" + ('0' + (d.getDate() - 5)).slice(-2)
      }
    ]
    // (d.getDate() + 5) + "/" + d.getFullYear() + "/" + d.getMonth();
  } else {
    return false;
  }
}

async function getExercisesCompleted(tracks, userId) {
  let message
  let code
  var arr = await getModuleWiseProgerss(tracks, userId);
  console.log(arr.completedReader);
  var totalComplExercises = arr[0].completedReader + arr[0].completedeDebug + arr[0].completedSolver
  return [
    {
      "exerciseCompleted": totalComplExercises
    }
  ];

}

async function getModuleWiseProgerss(tracks, userId) {
  let message
  let code
  let readerPerc, debugPerc, solverPerc, reader, solver, debug;
  if (userId != undefined && tracks != undefined) {
    var arrReader = await getTotalExercises("reader", tracks);
    var arrDebug = await getTotalExercises("debug", tracks);
    var arrSolver = await getTotalExercises("solver", tracks);
    console.log("arr length ", arrReader.length)
    let percentToGetReader = 10;
    let percentToGetDebug = 50;
    let percentToGetSolver = 50;

    let arrReaderlength = arrReader.length;
    let arrDebuglength = arrDebug.length;
    let arrSolverlength = arrSolver.length;

    reader = (percentToGetReader / 100) * arrReaderlength
    debug = (percentToGetDebug / 100) * arrDebuglength
    solver = (percentToGetSolver / 100) * arrSolverlength

    readerPerc = (reader / arrReaderlength) * 100
    debugPerc = (debug / arrDebuglength) * 100
    solverPerc = (solver / arrSolverlength) * 100
  }

  return [
    {
      "readerPerc": Math.floor(readerPerc),
      "debugPerc": Math.floor(debugPerc),
      "solverPerc": Math.floor(solverPerc),
      "completedReader": reader,
      "completedeDebug": debug,
      "completedSolver": solver,
    }
  ]
}
async function getConceptsLearned(userid) {
  let message
  let code
  let query = `select distinct category, count(userid) from ` + getUserCategorySummaryTable + `  where userid='${userid}' group by category ;`
  try {
    console.log(query);
    let result = await pool.query(query);
    console.log(result.rowCount)
    return result.rowCount;
  }
  catch (error) {
    console.log(error.code);
    let result=await dbErrorHandler.ErrorHandler(error.code)
    return result
}

}

module.exports = {
  getTracksSubscribed: getTracksSubscribed,
  getDateEnrolled: getDateEnrolled,
  getExercisesCompleted: getExercisesCompleted,
  getModuleWiseProgerss: getModuleWiseProgerss,
  getConceptsLearned: getConceptsLearned,
}
