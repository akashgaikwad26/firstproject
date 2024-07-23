const { Pool, Client, DatabaseError } = require('pg');
let dbconfig = require('./dbconfig');
const pool = new Pool(dbconfig);
const dbconst = require('./dbConstants.js')
const dbErrorHandler=require('./dbErrorHandler');
const getUserDetails=dbconst.getUserDetails();
const getUserMasterTable = dbconst.getUserMasterTable();
const getGroupMasterTable = dbconst.getGroupMasterTable();

async function createNewUser(userid, password, role, user_group) {
    let code
    let message
    // console.log(userid);
    let set_status = 'active'
    let customQuery = "INSERT into " + getUserMasterTable + "(userid, password, role, user_group,date_created,status)values";

    let CheckForIf = (userid !== undefined && password !== undefined && role !== undefined && user_group !== undefined);


    if (CheckForIf) {
        customQuery += "('" + userid + "','" + password + "','" + role + "','" + user_group + "',current_timestamp,'" + set_status + "')";
    }
    console.log("Final Query : ", customQuery);

    try {
        const results = await pool.query(customQuery);
        return {
            message: "User created",
            status: 201,
        };
    } catch (error) {
        console.log(error.code);
        let result=await dbErrorHandler.ErrorHandler(error.code)
        return result
    }
}

async function deleteUser(userid) {
    let code
    let message
    // console.log(userid);
    let customQuery = "update " + getUserMasterTable + " set status='in-active'";


    if (userid !== undefined) {
        customQuery += " where userid='" + userid + "'"
        // + " and password=" + password + "and role=" + role + "'and user_group=" + user_group;
    }

    console.log("Final query: " + customQuery);
    try {
        const results = await pool.query(customQuery);
        return {
            message: "User has set to in-active",
            status: 204,
        };
    } catch (error) {
        console.log(error.code);
        let result=await dbErrorHandler.ErrorHandler(error.code)
        return result
    }
}

//Implement reset password
async function resetPassword(userid, currentPassword, password) {
    let code
    let message
    if (userid === undefined || password === undefined || currentPassword === undefined) {
        return {
            message: "Invalid details provided",
            status: 406,
        }
    }
    else if (password.includes("'") | userid.includes("'") | currentPassword.includes("'")) {
        return {
            message: `Password cannot contain special character`,
            status: 406,
        }
    }
    let result
    try {

        let query = `select count(userid) from ${getUserMasterTable} where userid='${userid}' and password='${currentPassword}'`;
         result = await pool.query(query)
        console.log(result.rows[0].count)
    } catch (error) {
        console.log(error.code);
        let result=await dbErrorHandler.ErrorHandler(error.code)
       return result
    }
    if (result.rows[0].count > 0) {

        let customQuery = "update " + getUserMasterTable + " set password='" + password + "'" + " where userid='" + userid + "'"
        console.log("Final query: " + customQuery);
        try {
            const results = await pool.query(customQuery);
            return {
                message: "Password Updated successfully",
                status: 204,
            };
        } catch (error) {
            console.log(error.code);
            let result=await dbErrorHandler.ErrorHandler(error.code)
       return result
        }
    }
    else{
        return{
            message:'Invalid details provided',
            status:406,
        }
    }
}
// returns the list of users along with user group type
async function userList() {
    let code
    let message
    let customQuery = "select userid, role, " + getUserMasterTable + ".user_group, " + getUserMasterTable + ".date_created, " + getUserMasterTable + ".status, type from " + getUserMasterTable + " inner join " + getGroupMasterTable + " on " + getUserMasterTable + ".user_group=" + getGroupMasterTable + ".user_group";
    try {
        const results = await pool.query(customQuery);
        return results.rows;
    } catch (error) {
        console.log(error.code);
        let result=await dbErrorHandler.ErrorHandler(error.code)
       return result
    }
}
async function AdduserDetails(data1)
{
   let data=JSON.parse(data1)
    try {
        // console.log(data)

        for(let i=0;i<data.length;i++){
     
            if(data[i].Email !==''){
                console.log(data[i])
              let  query=`insert into ${getUserDetails} values('${data[i].Email}','${data[i].First_Name}','${data[i].Last_Name}','${data[i].MobileNo}','${data[i].Gender}','${data[i].Country}','${data[i].State}','${data[i].City}','${data[i].College}','${data[i].Education}','${data[i].Degree}') `;
                let result= await pool.query(query);
    
            }
        }
        // console.log(result)
        return {
            message: "User data added successfully",
            status: 200
         }
    } catch (error) {
        console.log(error)
        let result = await dbErrorHandler.ErrorHandler(error.code)
        return result
    }
}
    
  
    



async function activateUser(userid, status) {
    let code
    let message
    let query = `update ` + getUserMasterTable + ` set status='${status}' where userid='${userid}' `;
    console.log("query ", query)
    try {
        const rsult = await pool.query(query)
        return {
            msg: `user ${userid} ${status} `,
            statuscode: 200
        }
    }
    catch (error) {
        console.log(error.code);
        let result=await dbErrorHandler.ErrorHandler(error.code)
       return result
    }
}
// AdduserDetails('debug2@gmail.com','intern','intern3','989898','male','India','Maharashtra','pune','sppu','PG','mcs').then((res)=>console.log("first",res));
module.exports = {
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    resetPassword: resetPassword,
    userList: userList,
    AdduserDetails:AdduserDetails,
    activateUser: activateUser
}