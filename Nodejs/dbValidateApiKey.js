const {Pool} =require('pg');
const dbconfig=require('./dbconfig');
const pool =new Pool(dbconfig)
const dbErrorHandler=require('./dbErrorHandler');


async function ValidateUser(client_public_key,client_secret_key)
{
    let message
  let code
    if(client_public_key!=undefined & client_secret_key!=undefined)
    {
        console.log("public",client_public_key)
        try{

            let query=`select count(client_public_key) from public.api_key_data where client_public_key='${client_public_key}' and client_secret_key='${client_secret_key}';`
            let result=await pool.query(query);
            // console.log(result)
            return result.rows[0].count
        }
        catch (error) {
            console.log(error.code);
            let result=await dbErrorHandler.ErrorHandler(error.code)
            return result
        }
    }
    else{
        return 0
    }

}


// ValidateUser('4cafd348268f479cbab68f825e5fbaca',"1011d121d1b137f017041145b14113791d11181b1b1919181b").then(res=>{
//     console.log(res)
// })


module.exports={
    ValidateUser:ValidateUser
}