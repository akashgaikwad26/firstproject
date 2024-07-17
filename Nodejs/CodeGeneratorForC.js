
const assertFunctionString = 'int _c_assert(int condition, char* conditionStatement)\n{\n\tif (! condition) {\n\t\tprintf("Assertion failed: %s\\n", conditionStatement);\n\t}\n\treturn condition;\n}'
const testStartString = '\nvoid test(int *result)\n{\n';


function generateMainFunctionCode(numtests) {
    const mainStartString = '\n}\nvoid main()\n{\n'
    const mainBody = '\tint numTest = ' + numtests + ';\n' +
        '\tint testResult[numTest];\n\ttest(testResult);\n\tint i;\n\tprintf("Assertion Result:  [");\n\tfor (i = 0; i < numTest; i++){\n\t\tprintf(" %d ", testResult[i]);\n\t}\n\tprintf("]\\n");\n'
    const mainEndString = '\n}\n';
    return mainStartString + mainBody + mainEndString;
}

function getAssertStatement(assertStr) {
    let condition = assertStr;
    let first = condition.indexOf('(');
    let last = condition.lastIndexOf(')');
    let assertString = condition.slice(first + 1, last);
    let statement = '_c_assert(' + assertString + ', ' + '"' + assertString.replace(/"/g, '') + '"' + ')'
    return statement;
}

function getAssertFunctionName(assertStr) {
    let condition = assertStr;
    let first = condition.indexOf('(');
    let last = condition.lastIndexOf(')');
    let assertString = condition.slice(first + 1, last);
    first = assertString.indexOf('(');
    return assertString.slice(0, first);
}

function getAssertionJSON(results) {
    // console.log('Inside C Code generator: Results = ', results.rows);
    var code = assertFunctionString + testStartString;
    var assertStatement;
    var questionType;
    var numTests = 0;
    var asserts;
    var functionName = undefined;

    for (var i = 0; i < results.rows.length; i++) {
        questionType = results.rows[i].type;
        if (!(questionType === 'assert')) {
            continue;
        }
        assertStatement = results.rows[i].answer;
        asserts = assertStatement.split(';');
        for (var j = 0; j < asserts.length; j++) {
            if (asserts[j].replace(/\s/g, '').length) {
                if (asserts[j].includes('assert')) {
                    //code += '\t' + 'result[' + i + '] = ' + asserts[j] + ';\n';
                    code += '\t' + 'result[' + i + '] = ' + getAssertStatement(asserts[j]) + ';\n';
                    if (functionName === undefined) {
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
    const assertJSON = {
        "numTests": numTests,
        "assertCode": Buffer.from(code, 'utf-8').toString(),
        "assertFunction": functionName
    };
    return assertJSON;

}

module.exports = {
    getAssertionJSON: getAssertionJSON
}