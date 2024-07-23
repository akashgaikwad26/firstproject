const { Pool, Client } = require('pg');
let dbconfig = require('./dbconfig');
const pool = new Pool(dbconfig);
let dbconst = require('./dbConstants.js');
const dbErrorHandler=require('./dbErrorHandler');

let getExercisesTable = dbconst.getExercisesTable();
let getUserTrackProgressTable = dbconst.getUserTrackProgressTable();
let getUserModuleProgressTable = dbconst.getUserModuleProgressTable();
let dbExStatus = require('./dbExerciseStatus');

async function user_track_progress(userid) {
    let message
  let code
    if(userid!=undefined)
    {

        let sql = `select * from ` + getUserTrackProgressTable + ` where userid = '${userid}';`;
        try{

            const results = await pool.query(sql);
            console.log("results ", results.rows)
            return results.rows;
        }
        catch (error) {
            console.log(error.code);
            let result=await dbErrorHandler.ErrorHandler(error.code)
       return result
        }
    }
    else{
        return{
            message:'please provide vali details',
            status:406,
        }
    }
}



async function user_module_progress(userid) {
    let message
  let code
    let sql = `select * from ` + getUserModuleProgressTable + ` where userid = '${userid}';`;
    try{

        const results = await pool.query(sql);
        console.log("results ", results.rows)
        return results.rows;
    }catch (error) {
        console.log(error.code);
        let result=await dbErrorHandler.ErrorHandler(error.code)
       return result
    }
}

async function user_lock_count(userid, track, module) {
    let message
  let code

    if (userid === undefined ) {
        return {
          message: "Not acceptable",
          status: 406,
        };
    }

    let locklevel = await dbExStatus.getUserProgressLevel(userid);
    let lockCountQuery = "select count(exid) from " + getExercisesTable + " where level > " + locklevel;
    if (track !== undefined)
    {
        lockCountQuery += " and language='" + track + "'";
    }
    if (module !== undefined)
    {
        lockCountQuery += " and module='" + module + "'";
    }
    console.log("Filter Query = " + lockCountQuery);
   try{
    const lockedCount = await pool.query(lockCountQuery);
    console.log(lockedCount.rows[0].count);
    return lockedCount.rows[0].count;

    } catch (error) {
        console.log(error.code);
        let result=await dbErrorHandler.ErrorHandler(error.code)
        return result
    }
}
// user_track_progress('Amit.Scholar@gmail.com');
// user_module_progress('Amit.Scholar@gmail.com');
module.exports = {
    user_track_progress: user_track_progress,
    user_module_progress: user_module_progress,
    user_lock_count: user_lock_count
}

// async function test()
// {
//    // let lockCnt = await user_lock_count('Amit.Scholar@gmail.com', 'C');

//    // let lockCnt = await user_lock_count('Amit.Scholar@gmail.com', 'C', 'reader');
//     let lockCnt = await user_lock_count('Amit.Scholar@gmail.com', 'C', 'debug');
//     console.log("Number of locked exercises = " + lockCnt);
// }

// test();