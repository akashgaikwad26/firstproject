const {Pool}=require('pg');
const dbconfig=require('./dbconfig');
const pool=new Pool(dbconfig);
const dbconst=require('./dbConstants.js');
const dbErrorHandler=require('./dbErrorHandler');
const getCategoryMasterTable=dbconst.getCategoryMasterTable();
const getExercisesTable=dbconst.getExercisesTable();

async function getCategory(){
    try{
        
            let query=`select * from ${getCategoryMasterTable} order by locked`;
            let result=await pool.query(query);
            // console.log(result.rows)

            return result.rows;

    }
    catch (error) {
        console.log(error.code);
        // if(error.code=='ENOTFOUND')
        //     {
        //         message='Please check your internet connection'
        //         code=408
        //     }
        //     else{
        //         message='Oops! something went wrong please try again'
        //         code=500
        //     }
        //     return {
        //         message:message,
        //         status: code,
        //         err: error,
        //     }
       let result=await dbErrorHandler.ErrorHandler(error.code)
       return result
    }

}

async function getcategorydetails(userid,category,subcategory,track,module)
{
    try{
        if(category!=undefined & subcategory!=undefined & track!=undefined & module!=undefined)
        {
            
            let query=`select * from ${getExercisesTable} where category='${category}' and subcategoryid='${subcategory}' and language='${track}' and module='${module}' order by level`;
            let res =await pool.query(query)
            console.log(res.rows)
            if(res.rows.length!=0)
            {

                return {
                    result:res.rows,
                    status:200
                }
            }
            else
            {
                return {
                    result:"not found",
                    status:404
                }    
            }
        }
        else{
            return {
                result:"not found",
                status:404
            }
        }
    }
    catch (error) {
        console.log(error.code);
        let result=await dbErrorHandler.ErrorHandler(error.code)
       return result
    }
}
// getCategory().then(res=>{
//     console.log(res)
// }

// )
// getcategorydetails('Basics','Operators','C','reader').then(res=>{
//     console.log(res)
// }
// )
module.exports={
    getCategory:getCategory,
    getcategorydetails:getcategorydetails
}
