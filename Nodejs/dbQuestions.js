const { Pool, Client } = require('pg');
let dbconfig = require('./dbconfig');
var toReplaceKeys = require('./toReplaceKeys');

const pool = new Pool(dbconfig);

const cqadata = require('./dbConstants');
const dbErrorHandler=require('./dbErrorHandler');

const getQATable = cqadata.getQATable();

async function getQuestions(exercise, answers) {
  let code
    let message
  let customQuery = "SELECT key, label, type, options FROM " + getQATable + " ";
  if (exercise != undefined && answers != undefined) {
    var ans = answers === "true";
    if (ans) {
      customQuery = "SELECT key, answer FROM " + getQATable + " ";
      customQuery += "where exid='" + exercise + "'ORDER BY key";
      console.log("After answer = true: " + customQuery);
      try {
        const results = await pool.query(customQuery);
        console.log("Final query: " + customQuery);
        let result = toReplaceKeys.toReplaceAnsKeys(results.rows, exercise)
        return result;
      } catch (error) {
        console.log(error)
        let result=await dbErrorHandler.ErrorHandler(error.code)
       return result
      }
    } else {
      customQuery += "where exid='" + exercise + "'ORDER BY key";
      console.log("After answer = false: " + customQuery);
    }
  } else if (exercise != undefined) {
    customQuery += "where exid='" + exercise + "'ORDER BY key";
    console.log("After exercise: " + customQuery);
  } else {
    return ([]);
  }
  try {
    const results = await pool.query(customQuery);
    console.log("Final query: " + customQuery);
    let result = toReplaceKeys.toReplaceKeys(results.rows, exercise);
    return result;
  } catch (error) {
    console.log(error.code);
    let result=await dbErrorHandler.ErrorHandler(error.code)
       return result
}

}
module.exports = {
  getQuestions: getQuestions
}