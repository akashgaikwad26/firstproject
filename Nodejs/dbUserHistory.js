const { Pool, Client } = require('pg');
let dbconfig = require('./dbconfig');
const pool = new Pool(dbconfig);
let dbconst = require('./dbConstants.js')
const dbErrorHandler=require('./dbErrorHandler');

let getUserHistoryTable = dbconst.getUserHistoryTable();

async function updatespenttime(username) {
    let code
    let message
    try{

        //find spent_hours
        let q = `select * from ` + getUserHistoryTable + ` where username = '${username}';`;
        const res = await pool.query(q);
        if (username != undefined) {
        var dt1 = new Date(res.rows[0].login);
        var dt2 = new Date(res.rows[0].logout);
        
        var diff = (dt2.getTime() - dt1.getTime()) / 1000;
        diff /= 60;
        //update spent_hours
        var spent_minutes = 0;
        spent_minutes += Math.abs(Math.round(diff));
        // console.log(res.rows[0].spent_hours)
        // console.log(diff)
        // console.log("spent hours ",spent_hours + res.rows[0].spent_hours)
        spent_minutes += res.rows[0].spent_minutes
        let updatespenttime = `update ` + getUserHistoryTable + ` set spent_minutes = '${spent_minutes}' where username = '${username}';`;
        const timeupdate = await pool.query(updatespenttime);
        return {
            message: "success",
            status: 200,
        };
    }
    else {
        return {
            message: "Not acceptable",
            status: 406,
        };
    }
}
catch (error) {
    console.log(error.code);
    let result=await dbErrorHandler.ErrorHandler(error.code)
    return result
}
}

async function postLogin(username) {
    let code
    let message
    try{

        
        let q = `select count (username) from ` + getUserHistoryTable + ` where username = '${username}';`;
        const res = await pool.query(q);
        var count = res.rows[0].count;
    }	catch (error) {
        console.log(error.code);
        let result=await dbErrorHandler.ErrorHandler(error.code)
        return result
    }
    //if user not present
    if (count == 0) {
        let insert = `INSERT INTO ` + getUserHistoryTable + `(username, first_login, login,logout,spent_minutes) VALUES ('${username}',current_timestamp,current_timestamp,current_timestamp,0);`;
        try {
            const record = await pool.query(insert);
            return {
                message: "success",
                status: 200,
            };
        }
        catch (error) {
            console.log(error.code);
            let result=await dbErrorHandler.ErrorHandler(error.code)
            return result
        }
    } else //if user is present
    {
        try{

            let update = `update ` + getUserHistoryTable + ` set login = current_timestamp where username = '${username}';`;
            const up = await pool.query(update);
            return {
                message: "success",
                status: 200,
            };
        }
        catch (error) {
            console.log(error.code);
            let result=await dbErrorHandler.ErrorHandler(error.code)
       return result
        }
    }
}

async function postLogout(username) {
    let code
    let message

    try {
        let update = `update ` + getUserHistoryTable + ` set logout = current_timestamp where username = '${username}';`;
        const up = await pool.query(update);
        console.log("update: " + up);
        let st = await updatespenttime(username);
        return {
            message: "success",
            status: 200,
        };
    }
    catch (error) {
        console.log(error.code);
        let result=await dbErrorHandler.ErrorHandler(error.code)
       return result
    }
}

module.exports = {
    postLogin: postLogin,
    postLogout: postLogout
}