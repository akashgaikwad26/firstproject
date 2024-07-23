const { Pool, Client } = require('pg');
let dbconfig = require('./dbconfig');
const pool = new Pool(dbconfig);
let dbconst = require('./dbConstants.js')
const dbErrorHandler=require('./dbErrorHandler');

let getTrackSummaryTable = dbconst.getTrackSummaryTable();
let getModuleSummaryTable = dbconst.getModuleSummaryTable();

async function track_summary() {
    let message
    let code
    let sql = "select * from " + getTrackSummaryTable + "";
    try{

        const results = await pool.query(sql);
        return results.rows;
    }	catch (error) {
        console.log(error.code);
        let result=await dbErrorHandler.ErrorHandler(error.code)
        return result
    }
}

async function module_summary() {
    let message
    let code
    let sql = "select * from " + getModuleSummaryTable + " ";
    try{

        const results = await pool.query(sql);
        return results.rows;
    }	catch (error) {
        console.log(error.code);
        let result=await dbErrorHandler.ErrorHandler(error.code)
       return result
    }
}

module.exports = {
    track_summary: track_summary,
    module_summary: module_summary
}