const { expect } = require('chai')
var user = require('./dbUser')
var excel = require('./readExcel')

async function testAddUser() {
    let excelData = await excel.GetData('singleUser.csv')
    var userid = excelData[0].userid
    var password = excelData[0].password
    var role = excelData[0].role
    var user_group = excelData[0].user_group

    let toAdd = await user.createNewUser(userid, password, role, user_group)
    var status = toAdd.status
    let message = toAdd.message
    if (status == 201) {
        console.log("success");
        expect(message).to.equal("User created")
        expect(status).to.equal(201)
    } else {
        console.log('failure')
        expect(message).to.equal('Invalid details provided')
        expect(status).to.equal(406)
    }
    return toAdd

}

async function testDeleteUser() {
    let excelData = await excel.GetData('singleUser.csv')

    var userid = excelData[0].userid

    let userData = await user.deleteUser(userid)

    console.log(userData);

    var message = userData.message
    var status = userData.status
    expect(message).to.equal(message)
    expect(status).to.equal(204)

    return userData
}

module.exports = {
    testAddUser: testAddUser,
    testDeleteUser: testDeleteUser,
}