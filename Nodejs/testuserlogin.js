const { expect } = require('chai')
var user = require('./dbUserLogin.js')
var excel = require('./readExcel')

async function testUserLogin() {
    let excelData = await excel.GetData('testuserlogin.csv')
    // console.log((excelData));

    for(var i=0;i<excelData.length;i++){
        var username = excelData[i].username
        var password = excelData[i].password
        var operation = excelData[i].operation
        // console.log(username,password,operation);
        if(operation === "login"){
            var toAdd =  await user.userLogin(username,password);
        }
        else{
            var toAdd =  await user.userLogout(username,password);
        }
    }
    // console.log(toAdd)
    return toAdd;
}
// testuserhistory();
module.exports = {
    testUserLogin: testUserLogin,
}