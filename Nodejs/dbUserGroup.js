const { Pool, Client, DatabaseError } = require('pg');
let dbconfig = require('./dbconfig');
let dbconst = require('./dbConstants.js')
const dbErrorHandler=require('./dbErrorHandler');

const getGroupMasterTable = dbconst.getGroupMasterTable();
const getUserMasterTable = dbconst.getUserMasterTable();
const pool = new Pool(dbconfig);

async function newUserGroup(user_group, type) {
  let code
    let message
  let set_status = 'active'
  let customQuery = "INSERT into " + getGroupMasterTable + "(user_group,type,date_created,status) values "

  let CheckForIf = (user_group != undefined && type != undefined)

  if (CheckForIf) {
    customQuery += "('" + user_group + "','" + type + "',current_timestamp,'" + set_status + "')";
  }

  console.log("Final Query : ", customQuery);
  try {
    const results = await pool.query(customQuery);
    return ({
      message: "New usergroup created",
      status: 201,
    })
  } catch (error) {
    console.log(error.code);
    let result=await dbErrorHandler.ErrorHandler(error.code)
       return result
}
}


async function deleteUserGroup(user_group) {
  let code
    let message

  let groupCountQuery = "SELECT count(userid) from " + getUserMasterTable + " where user_group='" + user_group + "'"

  const userGruopCount = await pool.query(groupCountQuery);
  // console.log("count:", userGruopCount);

  let customQuery = "DELETE from " + getGroupMasterTable + " "
  if (user_group != undefined) {
    customQuery += "where user_group='" + user_group + "'"
  }

   message = user_group + " deleted. " + userGruopCount.rows[0].count + " users deleted"

  console.log("Final Query : ", customQuery);
  try {
    const results = await pool.query(customQuery);
    // console.log(results);
    return ({
      message: message,
      status: 204,
    })
  } catch (error) {
    console.log(error.code);
    let result=await dbErrorHandler.ErrorHandler(error.code)
       return result
}

}


async function getUserGroup() {
  let message
  let code
  let query = 'select user_group from ' + getGroupMasterTable + ''
  try {

    let result = await pool.query(query)
    console.log(result.rows)
    return result.rows
  }
  catch (error) {
    console.log(error.code);
    let result=await dbErrorHandler.ErrorHandler(error.code)
    return result
}
}




module.exports = {
  newUserGroup: newUserGroup,
  deleteUserGroup: deleteUserGroup,
  getUserGroup: getUserGroup
}