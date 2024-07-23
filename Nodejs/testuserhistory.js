const { expect } = require('chai')
var user = require('./dbUserHistory.js')
var excel = require('./readExcel')

async function testuserhistory() {
    let excelData = await excel.GetData('testuserhistory.csv')
    // console.log((excelData));
    for(var i=0;i<excelData.length;i++){
        var username = excelData[i].username

        var operation = excelData[i].operation
        var timestamp = excelData[i].timestamp
        // console.log(username,operation,timestamp);
        if(operation === "login"){
            var toAdd =  await user.postLogin(username,timestamp)
        }
        else{
            var toAdd =  await user.postLogout(username,timestamp)
        }
    }
    // console.log(toAdd)

    return toAdd;
}
// testuserhistory();
module.exports = {
    testuserhistory: testuserhistory,
}