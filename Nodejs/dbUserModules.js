const { Pool } = require('pg');
const dbconfig = require('./dbconfig');
const pool = new Pool(dbconfig);
const dbconst = require('./dbConstants')
const dbErrorHandler = require('./dbErrorHandler');
const db_exercises = require('./dbExercises')
const getUserModulesTable = dbconst.getUserModulesTable()
const getMduleExidTable = dbconst.getMduleExidTable();
const getExercisesTable = dbconst.getExercisesTable()
async function CreateChallange(userid, module, track, module_name, total,duration) {
    let code
    let message
     if(userid!==undefined && duration!==undefined)
    {
        try {
            let query = `insert into ${getUserModulesTable} (module_name,module_type,userid,expiry_date) values('${module_name}','${module}','${userid}',current_timestamp +'${duration} days')`;
            let result = await pool.query(query);
            console.log(result)
            if (result.rowCount == 1) {
                let exidarr = await db_exercises.getRandomExercises(userid, module, track, total)
                console.log(exidarr)
                for (let i = 0; i < exidarr.result.length; i++) {

                    query = `insert into ${getMduleExidTable} (module_name,exid) values('${module_name}','${exidarr.result[i].exid}');`;
                    let result = await pool.query(query);
                }

                return {
                    message: "challenge created successfully",
                    status: 201
                }
            }
            else {
                return {
                    message: 'challenge not created',
                    status: 200
                }
            }
        }
        catch (error) {
            console.log(error);
            let result = await dbErrorHandler.ErrorHandler(error.code)
            return result
        }
        
    }
    else if (userid != undefined ) {

        try {
            let query = `insert into ${getUserModulesTable} (module_name,module_type,userid) values('${module_name}','${module}','${userid}')`;
            let result = await pool.query(query);
            console.log(result)
            if (result.rowCount == 1) {
                let exidarr = await db_exercises.getRandomExercises(userid, module, track, total)
                console.log(exidarr)
                for (let i = 0; i < exidarr.result.length; i++) {

                    query = `insert into ${getMduleExidTable} (module_name,exid) values('${module_name}','${exidarr.result[i].exid}');`;
                    let result = await pool.query(query);
                }

                return {
                    message: "challenge created successfully",
                    status: 201
                }
            }
            else {
                return {
                    message: 'challenge not created',
                    status: 200
                }
            }
        }
        catch (error) {
            console.log(error);
            let result = await dbErrorHandler.ErrorHandler(error.code)
            return result
        }
    }
   

    else {
        let query=''
        if(duration!==undefined){
            query=`insert into ${getUserModulesTable}(module_name,module_type,expiry_date) values('${module_name}','${module}',current_timestamp + '${duration} days')`
        }else
        {

            query = `insert into ${getUserModulesTable}(module_name,module_type) values('${module_name}','${module}')`;
        }

        try {

            let result = await pool.query(query);
            // console.log(result)
            if (result.rowCount == 1) {
                let exidarr = await db_exercises.getRandomExercises(userid, module, track, total)
                // console.log(exidarr)
                for (let i = 0; i < exidarr.result.length; i++) {

                    query = `insert into ${getMduleExidTable} (module_name,exid) values ('${module_name}','${exidarr.result[i].exid}');`;
                    let result = await pool.query(query);
                }

                return {
                    message: "challenge created successfully",
                    status: 201
                }
            }
            else {
                return {
                    message: 'challenge not created',
                    status: 200
                }
            }
        }
        catch (error) {
            console.log(error);
            let result = await dbErrorHandler.ErrorHandler(error.code)
            return result
        }
    }
}



async function getUserChallanges(userid, module, module_name) {
    let code
    let message

    if (userid != undefined) {
        let query = `select * from ${getUserModulesTable} where userid in ('${userid}','system')`;
        try {
            let result = await pool.query(query)
            // console.log(result.rows)
            return {
                result: result.rows,
                status: 200

            }
        } catch (error) {
            console.log(error);
            let result = await dbErrorHandler.ErrorHandler(error.code)
            return result
        }

    }
    else if (userid != undefined, module != undefined) {
        let query = `select * from ${getUserModulesTable} where userid in ('${userid}','system') and module='${module} '`;
        try {
            let result = await pool.query(query)
            // console.log(result.rows)
            return {
                result: result.rows,
                status: 200

            }
        } catch (error) {
            console.log(error);
            let result = await dbErrorHandler.ErrorHandler(error.code)
            return result
        }

    }

    else if (userid != undefined, module != undefined, module_name != undefined) {
        let query = `select * from ${getUserModulesTable} where userid in ('${userid}','system') and module='${module} and module_name= '${module_name}'`;
        try {

            let result = await pool.query(query)
            // console.log(result.rows)
            return {
                result: result.rows,
                status: 200

            }
        } catch (error) {
            console.log(error);
            let result = await dbErrorHandler.ErrorHandler(error.code)
            return result
        }
    }
    else if (module != undefined & module_name != undefined) {
        let query = `select * from ${getUserModulesTable} where userid ='system' and module='${module}' and module_name='${module_name}'`;
        try {

            let result = await pool.query(query)
            // console.log(result.rows)
            return {
                result: result.rows,
                status: 200

            }
        } catch (error) {
            console.log(error);
            let result = await dbErrorHandler.ErrorHandler(error.code)
            return result
        }

    }

    else {
        let query = `select * from ${getUserModulesTable} where userid='system'`;
        try {

            let result = await pool.query(query)
            // console.log(result.rows)
            return {
                result: result.rows,
                status: 200

            }
        } catch (error) {
            console.log(error);
            let result = await dbErrorHandler.ErrorHandler(error.code)
            return result
        }
    }

}
async function showChallenge(module_name) {
    if (module_name !== undefined) {

        let query = `select * from ${getExercisesTable} where exid in(select exid from ${getMduleExidTable} where module_name='${module_name}')`;
        try {

            let result = await pool.query(query);
            // console.log(result.rows)

            return {
                result: result.rows,
                status: 200
            }
        }
        catch (error) {
            // console.log(error)
            let result = await dbErrorHandler.ErrorHandler(error.code)
            return result

        }
    }
}



// CreateChallange('Amit.Schholar@gmail.com','reader','test3').then(res=>{
//     console.log(res)
// })

// getUserChallanges().then(res=>{
//     console.log(res)
// })
// showChallenge('test9').then(res=>{
//     console.log(res)
// })

module.exports = {
    CreateChallange: CreateChallange,
    getUserChallanges: getUserChallanges,
    showChallenge: showChallenge,
}