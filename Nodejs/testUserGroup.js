const { expect } = require('chai');
const { assert } = require('chai');
var user = require('./dbUserGroup')
var excel = require('./readExcel')

async function testAddUserGroup() {
    let excelData = await excel.GetData('userGroup.csv')

    let user_group = excelData[5].user_group
    let type = excelData[5].type

    let toAdd = await user.newUserGroup(user_group, type)
    let message = toAdd.message
    let status = toAdd.status
    if (status == 201) {
        console.log('success')
        expect(message).to.equal('New usergroup created')
        expect(status).to.equal(201)
    } else {
        console.log('failure')
        expect(message).to.equal('Invalid Data Provided')
        expect(status).to.equal(406)
    }
    // console.log(usergroup);
    return toAdd;
}

async function testDeleteUserGroup() {
    let excelData = await excel.GetData('userGroup.csv')

    let user_group = excelData[2].user_group

    let toDelete = await user.deleteUserGroup(user_group)
    console.log("delete ", toDelete);
    var message = toDelete.message
    expect(message).to.equal(message)
    return toDelete;
}

module.exports = {
    testAddUserGroup: testAddUserGroup,
    testDeleteUserGroup: testDeleteUserGroup,
}