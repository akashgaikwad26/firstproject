const { Pool, Client } = require('pg');
let dbconfig = require('./dbconfig');
const pool = new Pool(dbconfig);
const exercieses = require('./dbConstants');
const dbErrorHandler = require('./dbErrorHandler');

const getExercisesTable = exercieses.getExercisesTable();
const getUserResponseTable = exercieses.getUserResponseTable()

async function getExercises(module, lang, level) {
  let code
  let message
  // console.log(getExercisesTable);
  let customQuery = "SELECT * FROM " + getExercisesTable + " ";
  var addSuffixForAnd = false;
  if (module != undefined) {
    customQuery += "where module='" + module + "'";
    addSuffixForAnd = true;
    console.log("After moddule: " + customQuery);
  }
  if (lang != undefined) {
    if (addSuffixForAnd) {
      customQuery += " and language='" + lang + "'";
    } else {
      customQuery += "where language='" + lang + "'";
    }
    console.log("After lang: " + customQuery);
    addSuffixForAnd = true;
  }
  if (level != undefined) {
    var levelVal = parseFloat(level);
    if (addSuffixForAnd) {
      customQuery += " and level=" + levelVal + "";
    } else {
      customQuery += "where level=" + levelVal + "";
    }
    console.log("After level: " + customQuery);
    addSuffixForAnd = true;
  }

  try {
    const exercises = await pool.query(customQuery);
    console.log("Final query: " + customQuery);
    return exercises.rows;
  } catch (error) {
    console.log(error);
    let result = await dbErrorHandler.ErrorHandler(error.code)
    return result
  }
}


async function getRandomExercises(userid, module, track, total) {
  let code
  let message

  try {

    if (userid !== undefined && total !== undefined) {

      query = `select * from ${getExercisesTable} where exid in(select exid from ${getUserResponseTable} where userid='${userid}'  order by random() limit ${total})and module='${module}' and  language='${track}' and level<6;`;
      let result = await pool.query(query)
      // console.log("result ",result.rows)
      return {
        result: result.rows,
        status: 200,
      }
    }
    else if (total !== undefined) {
      query = `select * from ${getExercisesTable} where module='${module}' and  language='${track}' and level<6 order by random() limit ${total} `;
      let result = await pool.query(query)
      // console.log("result ",result.rows[0].exid)
      return {
        result: result.rows,
        status: 200,
      }
    }

  }
  catch (error) {
    console.log(error);
    let result = await dbErrorHandler.ErrorHandler(error.code)
    return result
  }
}

async function CheckEligibility(userid, module) {
  let code
  let message
  try {

    let query = `select count(userid) from ${getUserResponseTable} where userid='${userid}' and status='ready'`;
    let count = await pool.query(query)
    console.log(count.rows[0])
    if (count.rows[0].count > 65) {
      return {
        message: 'you are eligible',
        status: 200
      }
    }
    else {
      return {
        message: 'you are not eligible',
        status: 403
      }
    }
  }
  catch (error) {
    console.log(error);
    let result = await dbErrorHandler.ErrorHandler(error.code)
    return result
  }

}

// getRandomExercises('Amit.Scholar@gmail.com','reader').then(res=>{
//   console.log(res.length)
// })
module.exports = {
  getExercises: getExercises,
  getRandomExercises: getRandomExercises,
  CheckEligibility: CheckEligibility
}
