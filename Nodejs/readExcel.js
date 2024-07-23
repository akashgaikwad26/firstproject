const csv = require('csv-parser');
const fs = require('fs');

// total marks = 10 * level of that exercise id


async function toReadExcel(fileName) {
    const results = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream(fileName)
            .on('error', error => {
                reject(error);
            })
            .pipe(csv({}))
            .on('data', (data) => {
                results.push(data)
                // console.log(data);
                // return results;
            })
            .on('end', () => {
                resolve(results);
            });
    });
    // console.log(csvData);
}

async function GetData(fileName) {
    try {
        const data = await toReadExcel(fileName);
        // console.log("testGetData: parsed CSV data:", data);
        return data;
    } catch (error) {
        return error;
        // console.error("testGetData: An error occurred: ", error.message);
    }
}

// GetData('userGroup.csv');

module.exports = {
    GetData: GetData
}
