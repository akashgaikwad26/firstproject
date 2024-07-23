const { Pool, Client, DatabaseError } = require('pg');
let dbconfig = require('./dbconfig');
const pool = new Pool(dbconfig);
const db_Questions = require('./dbExercises')
const fs = require('fs');
const read = require('./readExcel');

async function generateID(numOfJobes, startID, endID) {
    let arr = []
    var num
    while (arr.length < numOfJobes) {
        num = Math.floor(Math.random() * (endID - startID))
        if (arr.indexOf(num) == -1 && num != 0) {
            arr.push(num)

        }

    }
    return arr
}

async function generatetData(studentType) {

    let questions = await db_Questions.getExercises(undefined, undefined, 1)
    // console.log(questions.rows[0].exid)
    var result = [];
    // fs.writeFileSync('UserResponseTestData.csv',`${questions.rows[0].exid},`)
    // for(i=0;i<1;i++)
    var noOfQ = []
    if (studentType == 'scholar') {
        noOfQ = [5, 10, 10, 5]
    }

    else if (studentType == 'intermediate') {
        noOfQ = [5, 10, 5, 5]
    }
    else if (studentType == 'beginner') {
        noOfQ = [10, 5, 5]
    }
    for (i = 0; i < noOfQ[0]; i++) {

        if (questions[i].level < 2) {
            let exid = questions[i].exid;
            let level = questions[i].level;
            result.push({ exid: exid, level: level })
            // console.log(questions[i].exid)
        }

    }
    questions = await db_Questions.getExercises(undefined, undefined, 2)
    let arr = await generateID(noOfQ[1], 1, 80)
    for (j = 0; j < arr.length; j++) {
        // console.log(arr[j])
        // result.push(questions[arr[j]].exid,questions[arr[j]].level)
        let exid = questions[arr[j]].exid;
        let level = questions[arr[j]].level;
        result.push({ exid: exid, level: level })

    }
    questions = await db_Questions.getExercises(undefined, undefined, 3)
    arr = await generateID(noOfQ[2], 1, 50)
    for (j = 0; j < arr.length; j++) {
        // console.log(arr[j])
        // result.push(questions[arr[j]].exid,questions[arr[j]].level)
        let exid = questions[arr[j]].exid;
        let level = questions[arr[j]].level;
        result.push({ exid: exid, level: level })

    }
    questions = await db_Questions.getExercises(undefined, undefined, 4)
    arr = await generateID(noOfQ[3], 1, 27)
    for (j = 0; j < arr.length; j++) {
        // console.log(arr[j])

        // result.push(questions[arr[j]].exid,questions[arr[j]].level)
        let exid = questions[arr[j]].exid;
        let level = questions[arr[j]].level;
        result.push({ exid: exid, level: level })

    }
    return result

}
// generatetData().then(result=>{
//     // console.log(result)
//     console.log(result)
// });

// generatetData('scholar').then(result=>{
//     // console.log(result)
//     console.log(result)
// });
// generatetData('intermediate').then(result=>{
//     // console.log(result)
//     console.log(result)
// });


// console.log(res);

module.exports = {
    generatetData: generatetData
}