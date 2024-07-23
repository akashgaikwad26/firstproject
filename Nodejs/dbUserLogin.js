const { Pool, Client } = require('pg');
let dbconfig = require('./dbconfig');
let data = require('./readExcel');
const dbUserHistory = require('./dbUserHistory');
const pool = new Pool(dbconfig);
let dbconst = require('./dbConstants.js')
const dbErrorHandler = require('./dbErrorHandler');

let getUserMasterTable = dbconst.getUserMasterTable();
let getUserHistoryTable = dbconst.getUserHistoryTable()
let getGroupMasterTable=dbconst.getGroupMasterTable()
async function userLogin(username, password) {
    //validate user and return 
    let minutes = 0
    let hours = 0
    let seconds = 0
    let message
    let code
    console.log('username ', username, password)
    let count = 0
    q2 = `select count(userid) from ` + getUserMasterTable + ` where userid = '${username}' and password ='${password}';`;
    console.log("query ", q2)
    try {

        const ress = await pool.query(q2);
        var count2 = ress.rows[0].count;
        if (count2 == 0) {
            console.log("inside if")
            return {
                message: "Not acceptable",
                status: 406,
            };
        }
    }
    catch (error) {
        console.log(error);
        let result = await dbErrorHandler.ErrorHandler(error.code)
        return result
    }
    // try {


        let query = `select user_group,role from ${getUserMasterTable} where userid='${username}';`
        let usergroup
        try {

            usergroup = await pool.query(query)
        } catch (error) {
            console.log(error)
            let result = await dbErrorHandler.ErrorHandler(error.code)
            return result
        }
        let Group_type
        try{
            query=`select type from  ${getGroupMasterTable}  where user_group =(select user_group from ${getUserMasterTable} where userid='${username}')`;
            Group_type=await pool.query(query)
            console.log("group type",Group_type.rows[0].type)

        }
        catch(error)
        {
            console.log(error)
            let result = await dbErrorHandler.ErrorHandler(error.code)
            return result
        }
        // let hours=new Date()
        if(Group_type.rows[0].type!== 'academics' ){
           
                    try{
                    var toCall = await dbUserHistory.postLogin(username);
                    return {
                        message: "success",
                        status: 200,
                        session: false,
                    };
                }
             catch (error) {
                console.log(error);
                let result = await dbErrorHandler.ErrorHandler(error.code)
                return result
            }
        }
        else if (usergroup.rows[0].role === 'teacher') {
            let currenthours = new Date()
            if (currenthours.getHours() < 19) {
                let q2 = `select count(userid) from ` + getUserMasterTable + ` where userid = '${username}' and password ='${password}';`;
                console.log("query ", q2)
                try {

                    const ress = await pool.query(q2);
                    var count2 = ress.rows[0].count;
                    if (count2 == 0) {
                        console.log("inside if")
                        return {
                            message: "Not acceptable",
                            status: 406,
                        };
                    }
                    else {
                        // query = `select  CURRENT_TIMESTAMP -(select login from public.userhistory where username='${teacherid.rows[0].userid}') as session`;
                        // try {

                        //     let sessionTime = await pool.query(query)
                        //     // console.log(sessionTime.rows[0].session.seconds)
                        //     // console.log(sessionTime.rows[0].session.minutes)
                        //     if (sessionTime.rows[0].session.minutes != undefined) {
                        //         minutes = sessionTime.rows[0].session.minutes

                        //     }
                        //     if (sessionTime.rows[0].session.hours != undefined) {
                        //         hours = sessionTime.rows[0].session.hours
                        //     }
                        //     seconds = sessionTime.rows[0].session.seconds;
                        //     console.log("seconds ", seconds)
                        //     // console.log(sessionTime.rows[0].session.minutes)
                        //     console.log("minutes ", minutes)
                        //     console.log("hours ", hours)
                        // } catch (err) {
                        //     console.log(err)
                        //     return {
                        //         message: 'server error',
                        //         status: 500,
                        //         err: err,
                        //     }
                        // }

                        var toCall = await dbUserHistory.postLogin(username);
                        return {
                            message: "success",
                            status: 200,
                            session: true,
                            seconds: seconds,
                            minutes: minutes,
                            hours: hours,
                        };
                    }
                } catch (error) {
                    console.log(error);
                    let result = await dbErrorHandler.ErrorHandler(error.code)
                    return result
                }
            }
            else {
                return {
                    message: "you can not login after 7pm",
                    status: 406
                }
            }
        }
        else if (usergroup.rows[0].role === 'student') {


          let sessionTimequery= `select username,login ,(current_timestamp -login) as session   from ${getUserHistoryTable} where login > logout and username in(select userid from ${getUserMasterTable} where user_group in(select user_group from ${getUserMasterTable} where userid='${username}') and role='teacher') group by username order by login desc`
          let sessionTime
          try{
                 sessionTime=await pool.query(sessionTimequery)
                 
           }catch (error) {
            console.log(error);
            let result = await dbErrorHandler.ErrorHandler(error.code)
            return result
        } 


            if ( sessionTime.rowCount >=1) {
            
                try {

                   
                    if (sessionTime.rows[0].session.minutes != undefined) {
                        minutes = sessionTime.rows[0].session.minutes

                    }
                    if (sessionTime.rows[0].session.hours != undefined) {
                        hours = sessionTime.rows[0].session.hours
                    }
                    seconds = sessionTime.rows[0].session.seconds;
                    console.log("seconds ", seconds)
                    // console.log(sessionTime.rows[0].session.minutes)
                    console.log("minutes ", minutes)
                    console.log("hours ", hours)
                } catch (error) {
                    console.log(error);
                    let result = await dbErrorHandler.ErrorHandler(error.code)
                    return result
                }
                // if (((3600 * hours) + (60 * minutes) + seconds) <= 5400) {

                    let q2 = `select count(userid) from ` + getUserMasterTable + ` where userid = '${username}' and password ='${password}';`;
                    console.log("query ", q2)
                    try {

                        const ress = await pool.query(q2);
                        var count2 = ress.rows[0].count;
                        if (count2 == 0) {
                            console.log("inside if")
                            return {
                                message: "Not acceptable",
                                status: 406,
                            };
                        }
                        else {

                            var toCall = await dbUserHistory.postLogin(username);
                            return {
                                message: "success",
                                status: 200,
                                session: true,
                                seconds: seconds,
                                minutes: minutes,
                                hours: hours,
                            };
                        }
                    } catch (error) {
                        console.log(error);
                        let result = await dbErrorHandler.ErrorHandler(error.code)
                        return result
                    }
                // }
                // else {
                //     console.log("Your session time is over")
                //     return {
                //         message: "Your session time is over",
                //         status: 403,
                //     }
                // }
            }
            else {
                console.log("Your teacher is not logged in")

                return {
                    message: 'Your teacher is not logged in',
                    status: 403
                };
            }
        }
        else
        {
            try{
                var toCall = await dbUserHistory.postLogin(username);
                return {
                    message: "success",
                    status: 200,
                    session: false,
                };
            }
         catch (error) {
            console.log(error);
            let result = await dbErrorHandler.ErrorHandler(error.code)
            return result
        }
        }
     
      
        // 
    // }
    // catch (error) {
    //     console.log(error.code);
    //     let result = await dbErrorHandler.ErrorHandler(error.code)
    //     return result
    // }

}

async function userLogout(username) {
    let code
    let message

    try {

        var toCall = await dbUserHistory.postLogout(username);
        return {
            message: "success",
            status: 200,
        };
    }
    catch (error) {
        console.log(error.code);
        let result = await dbErrorHandler.ErrorHandler(error.code)
        return result
    }

}

module.exports = {
    userLogin: userLogin,
    userLogout: userLogout
}