const { Pool, Client } = require('pg');
let dbconfig = require('./dbconfig');
const pool = new Pool(dbconfig);
//const { utf8ToAnsi } = require('utf8-to-ansi');
let dbconst = require('./dbConstants.js')
let getModulesTable = dbconst.getModulesTable();
let getExercisesTable = dbconst.getExercisesTable();
let getQATable = dbconst.getQATable();

const { S3Client, ListObjectsCommand } = require("@aws-sdk/client-s3");
//const fs = require("fs");
const client = new S3Client({
    endpoint: "https://fra1.digitaloceanspaces.com",
    //endpoint: "https://nyc3.digitaloceanspaces.com",
    region: "us-east-1",
    credentials: {
        accessKeyId: process.env.SPACES_KEY,
        secretAccessKey: process.env.SPACES_SECRET
    }
});

async function runDiagnostics() {
    // List modules, which do not have any exercises
    var moduleNames = [];
    let customQuery = "SELECT module from " + getModulesTable + " WHERE module NOT IN (select module from " + getExercisesTable + ")";
    try {

        const results = await pool.query(customQuery);
        console.log("Final query: " + customQuery);
        moduleNames = results.rows;
        for (var i = 0; i < moduleNames.length; i++)
            console.log("Modules =" + moduleNames[i].module);
    } catch (error) {
        console.log("Error while getting module names" + error);
    }

    // Diagnostic query to find out which exercises do not have questions populated
    var exwithNoQuestions = [];
    customQuery = "SELECT exid FROM " + getExercisesTable + " where TRIM(exid) NOT in (select DISTINCT exid from " + getQATable + ")";
    try {

        const results = await pool.query(customQuery);
        console.log("Final query: " + customQuery);
        exwithNoQuestions = results.rows;
        for (var i = 0; i < exwithNoQuestions.length; i++)
            console.log("Exercises =" + exwithNoQuestions[i].exid);
    } catch (error) {
        console.log("Error while getting exercise ids" + error);
    }
    //Diagnostic service to find out any mismatch between uploaded file and qlocation specified in cexercises
    // table will first use the basic diagnostics
    // Check if qlocation is NULL for any of the exercises
    var exWithNoCode = [];
    customQuery = "SELECT exid FROM " + getExercisesTable + " where qlocation is NULL";
    try {

        const results = await pool.query(customQuery);
        console.log("Final query: " + customQuery);
        exWithNoCode = results.rows;
        for (var i = 0; i < exWithNoCode.length; i++)
            console.log("Exercises with code  location NULL =" + exWithNoCode[i].exid);
    } catch (error) {
        console.log("Error while getting exercise ids" + error);
    } //

    // Next get all code locations(file names) in the cexercises table
    var codeLocation = [];
    customQuery = "SELECT qlocation FROM " + getExercisesTable + "";
    try {

        const results = await pool.query(customQuery);
        console.log("Final query: " + customQuery);
        // exWithNoCode = results.rows;
        for (var i = 0; i < results.rows.length; i++) {
            codeLocation.push(results.rows[i].qlocation);
        }
        //   console.log("All locations: \n" + codeLocation);
    } catch (error) {
        console.log("Error while getting code locations" + error);
    }


    // Next get the list of files available in spaces (File blob)
    const bucketParams = { Bucket: "pravinyam-programs" };
    var listOfFiles = [];
    var content;
    try {
        const data = await client.send(new ListObjectsCommand(bucketParams));
        content = data.Contents;
        // console.log("Success", data.Contents);
        //  console.log("Data Contents is of type: " + typeof(data.Contents));
        for (var i = 0; i < content.length; i++) {
            listOfFiles.push(content[i].Key)
        }
        // console.log("List of Files: \n" + listOfFiles);
        // return data;
    } catch (err) {
        console.log("Error", err);
    }

    // Verify that listOfFiles contains all codeLocation
    for (var j = 0; j < codeLocation.length; j++) {
        if (!contains(listOfFiles, codeLocation[j])) {
            console.log("File : " + codeLocation[j] + " missing from Source Location");
        }
    }

}

function contains(anArray, anElement) {
    for (var i = 0; i < anArray.length; i++) {
        if (anArray[i] === anElement)
            return true;
    }
    return false;
}

runDiagnostics();