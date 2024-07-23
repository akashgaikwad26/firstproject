const db_userResponse = require('./dbUserResponse');
const readExcel = require('./readExcel');


async function insertUserResponse(filename) {
    let data = await readExcel.GetData(filename)
    console.log("userid123345 " + data[0].userid)
    let cnt = 0;
    for (i = 0; i < data.length; i++) {
        let model = '';
        for (j = 0; j < data[i].no_of_attempts; j++) {
            let result = await db_userResponse.userResponse(data[i].exid, model, data[i].score, data[i].totalScore, data[i].level, data[i].userid)
            // console.log(data[i].userid,data[i].exid);

            //  if(result.status===200)
            cnt = cnt + 1;


        }
    }

    // console.log(data)
    let result2 = {
        msg: 'data inserted sucessfully',
        cnt: cnt,
    }
    return result2
}

insertUserResponse('out.csv').then(result => {
    console.log(result);
})