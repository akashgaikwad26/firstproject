const { Pool, Client } = require('pg');
let dbconfig = require('./dbconfig');

const pool = new Pool(dbconfig);
const cqadata = require('./dbConstants');
const getQATable = cqadata.getQATable();
const dbErrorHandler=require('./dbErrorHandler');


const assertFunctionString = 'int _c_assert(int condition, char* conditionStatement)\n{\n\tif (! condition) {\n\t\tprintf("Assertion failed: %s\\n", conditionStatement);\n\t}\n\treturn condition;\n}'
const testStartString = '\nvoid test(int *result)\n{\n';


function generateMainFunctionCode(numtests)
{
    const mainStartString = '\n}\nvoid main()\n{\n'
    const mainBody = '\tint numTest = '+ numtests +';\n'+ 
    '\tint testResult[numTest];\n\ttest(testResult);\n\tint i;\n\tprintf("Assertion Result: [");\n\tfor (i = 0; i < numTest; i++){\n\t\tprintf(" %d ", testResult[i]);\n\t}\n\tprintf("]\\n");\n'
    const mainEndString =  '\n}\n';
    return mainStartString + mainBody + mainEndString;
}

function getAssertStatement(assertStr)
{
    let condition = assertStr;
    let first = condition.indexOf('(');
    let last = condition.lastIndexOf(')');
    let assertString = condition.slice(first + 1, last);
    //console.log(assertString);
   // let condition = assertStr.slice(7, assertStr.length-1);
    let statement = '_c_assert(' + assertString + ', ' + '"' + assertString + '"' + ')'
    return statement;
}

function getAssertFunctionName(assertStr)
{
    let condition = assertStr;
    let first = condition.indexOf('(');
    let last = condition.lastIndexOf(')');
    let assertString = condition.slice(first + 1, last);
    first = assertString.indexOf('(');
    return assertString.slice(0, first);
}

async function getAssertionCode(exercise) {
    let customQuery = "SELECT answer, type FROM " + getQATable + " " + "where exid='" + exercise +"';";
    try {
        const results = await pool.query(customQuery);
        console.log("Final query: " + customQuery); 
        var code = assertFunctionString + testStartString;
        var assertStatement;
        var questionType;
        var numTests = 0;
        var asserts;
        var functionName = undefined;

        for (var i =0; i < results.rows.length; i++ )
        {
            questionType = results.rows[i].type;
            if (!(questionType === 'assert'))
            {
                continue;
            }
            assertStatement = results.rows[i].answer;
            asserts = assertStatement.split(';');
            for (var j = 0; j < asserts.length; j++)
            {
                if (asserts[j].replace(/\s/g, '').length) {
                    if (asserts[j].includes('assert'))
                    {
                        //code += '\t' + 'result[' + i + '] = ' + asserts[j] + ';\n';
                        code += '\t' + 'result[' + i + '] = ' + getAssertStatement(asserts[j]) + ';\n';
                        if(functionName === undefined)
                        {
                            functionName = getAssertFunctionName(asserts[j]);
                        }
                    }
                    else {
                        code += '\t' + asserts[j] + ';\n';
                    }
                    
                }
            }
            numTests++;
        }
        code += generateMainFunctionCode(numTests);
        const assertJSON = { "numTests" : numTests,
         "assertCode" : Buffer.from(code, 'utf-8').toString(),
         "assertFunction" : functionName
        };
        return assertJSON;
    } catch (error) {
      console.log(error); 
       let result=await dbErrorHandler.ErrorHandler(error.code)
      return result
    }
}

module.exports = {
    getAssertionCode: getAssertionCode
}

// async function test() {
//  //
 
//   var assertionResult = await getAssertionCode('CBEG1');
//   //var assertionResult = await getAssertionCode('CBO15');
//   console.log("Number of tests = " + assertionResult.numTests);
//   console.log("Assertion code is:\n" + assertionResult.assertCode);
//   console.log("Assertion function is:" + assertionResult.assertFunction);
// }

// test();