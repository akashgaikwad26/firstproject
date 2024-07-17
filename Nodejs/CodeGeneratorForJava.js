const assertFunctionString = `

public class __Main {

    public static int javaAssert(boolean condition, String str) {
        if (condition) {
            return 1;
        } else {
            System.out.println("Assertion Failed: " + str);
            return 0;
        }
    }

    public static List<Integer> test() {
        List<Integer> resultList = new ArrayList<>();
`;

const testEndString = `        return resultList;
    }

    public static void main(String[] args) {
        System.out.println("Assertion Result: " + test());
    }
}
`;

function getAssertStatement(assertStr, n) {
    let first = assertStr.indexOf('(');
    let last = assertStr.lastIndexOf(')');
    return 'javaAssert(' + assertStr.slice(first + 1, last) + ', ' + '"Test case ' + (n + 1) + '")';
}

function getAssertFunctionName(assertStr) {
    let condition = assertStr;
    let first = condition.indexOf('(');
    let last = condition.lastIndexOf(')');
    let assertString = condition.slice(first + 1, last);
    first = assertString.indexOf('(');
    return assertString.slice(0, first);
}


function getAssertionJSONjava(results) {
    console.log("resultsee",results)
    let code = assertFunctionString;
    let assertStatement;
    let questionType;
    let numTests = 0;
    let asserts;
    let functionName = undefined;

    for (let i = 0; i < results.length; i++) {
        questionType = results[i].type;
        if (questionType !== 'assert') {
            continue;
        }
        assertStatement = results[i].answer;
        asserts = assertStatement.split(';');
        for (let j = 0; j < asserts.length; j++) {
            if (asserts[j].replace(/\s/g, '').length) {
                if (asserts[j].includes('assert')) {
                    code += `        resultList.add(${getAssertStatement(asserts[j], i) });\n`;
                    if (functionName === undefined) {
                        functionName = getAssertFunctionName(asserts[j]);
                    }
                } else {
                    code += '        ' + asserts[j] + ';\n';
                }
            }
        }
        numTests++;
    }
    code += testEndString;

    const assertJSON = {
        numTests: numTests,
        assertCode: code,
        assertFunction: functionName
    };
    return assertJSON;
}

// Example usage
// const results = {
//     rows: [
//         { type: 'assert', answer: 'assert (SummationOfNumbers.Add(3, 5) == 8);' },
//         { type: 'assert', answer: 'assert (SummationOfNumbers.Add(2, 4) == 6);' }
//     ]
// };

module.exports={
    getAssertionJSONjava:getAssertionJSONjava
}
// const assertionResult = getAssertionJSONjava(results);
// console.log("Code Generated",assertionResult.assertCode)
// console.log(Buffer.from(assertionResult.assertCode, 'base64').toString('utf-8'));
