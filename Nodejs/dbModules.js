const { Pool, Client } = require('pg');
let dbconfig = require('./dbconfig');
let dbconst = require('./dbConstants.js')
const pool = new Pool(dbconfig);
const dbErrorHandler=require('./dbErrorHandler');

const getModulesTable = dbconst.getModulesTable();

async function getModules(moduleid, module) {
    let code
    let message
    let customQuery = "SELECT * FROM " + getModulesTable + " ";
    var addSuffixForAnd = false;
    if (moduleid != undefined) {
        var moduleidVal = parseInt(moduleid);
        customQuery += "where moduleid=" + moduleidVal + "";
        addSuffixForAnd = true;
        console.log("After moduleid: " + customQuery);
    }
    if (module != undefined) {
        if (addSuffixForAnd) {
            customQuery += " and module='" + module + "'";
        } else {
            customQuery += "where module='" + module + "'";
        }
        console.log("After module: " + customQuery);
        addSuffixForAnd = true;
    }
    try {

        const results = await pool.query(customQuery);
        console.log("Final query: " + customQuery);
        return results.rows;
    } catch (error) {
        console.log(error.code);
        let result=await dbErrorHandler.ErrorHandler(error.code)
       return result
    }
}

module.exports = {
    getModules: getModules
}