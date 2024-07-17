const {Pool} =require('pg');
const dbconfig=require('./dbconfig');
const pool=new Pool(dbconfig);
const dbErrorHandler=require('./dbErrorHandler');
const dbConst=require('./dbConstants')
const getApiKeyTable=dbConst.getApiKeyTable()
 async function generateKey()
{
	var d = new Date().getTime();
	
	var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c)
	{
		var r = (d + Math.random()*16)%16 | 0;
		d = Math.floor(d/16);
		return (c=='x' ? r : (r&0x3|0x8)).toString(16);
	});

return uuid;
}

async function generateSercetKey()
{
	var d = new Date().getTime();
	
	var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c)
	{
		var r = (d + Math.random()*30)%30 | 0;
		d = Math.floor(d/16);
		return (c=='x' ? r : (r&0x3|0x8)).toString(16);
	});

return uuid;
}

async function createApiKey(origin){
// let origin='localhost:3000'
 const CLIENT_API_KEY=await generateKey()
 const CLIENT_SECRET_KEY=await generateSercetKey()
//  let query=`select count(client_api_key) from api_key_data where client_api_key=${CLIENT_API_KEY} and client_sercet_key=${CLIENT_SECRET_KEY};`
//  let result= await pool.query(query)
//  if(result.rows[0].count)
//  if(result.rows[0].count)
	if( origin!=undefined)
	{
		try{
			let query=`select count(client_origin) from ${getApiKeyTable} where client_origin='${origin}';`
			let result=await pool.query(query)
			console.log("count ",result.rows[0].count)
			if(result.rows[0].count>0)
			{
				query=`update ${getApiKeyTable} set client_public_key='${CLIENT_API_KEY}',client_secret_key='${CLIENT_SECRET_KEY}',registered_date=current_timestamp where client_origin='${origin}';`
				result=await pool.query(query);
				console.log(result)
				return {
					message:"api keys regenrated successfully",
					status:201
				}
			}
			else
			{

				query=`insert into ${getApiKeyTable} (client_public_key,client_secret_key,client_origin,registered_date) values ('${CLIENT_API_KEY}','${CLIENT_SECRET_KEY}','${origin}',current_timestamp);`
				result= await pool.query(query);
				console.log(result)
				console.log(CLIENT_API_KEY)
				console.log(CLIENT_SECRET_KEY)
				return {
					message:"api keys created successfully",
					status:201
				}
			}

		}
		catch (error) {
			console.log(error);
			let result=await dbErrorHandler.ErrorHandler(error.code)
			return result
		}
	}
	else
	{
		return {
			message:'not acceptable',
			status:406
		}
	}
	  
//  }
}

// createApiKey().then(res=>
//     {
//         console.log(res)
//     }
//     )

async function GetAllApi()
{
	try{

		let query=`select client_public_key,client_origin from ${getApiKeyTable}`;
		let res=await pool.query(query);
		console.log(res.rows[0])
		return {
			result:res.rows,
			status:200
		}
	}
	catch (error) {
		console.log(error.code);
		if(error.code=='ENOTFOUND')
			{
				message='Please check your internet connection'
				code=408
			}
			else if(error.code==53300)
            {
                message='Please try again'
                code=503
            }
			else{
				message='Oops! something went wrong please try again'
				code=500
			}
			return {
				message:message,
				status: code,
				err: error,
			}
	}
}
// GetAllApi().then(res=>{
// 	console.log(res)
// })

async function UpdateApiKey(origin)
{
	let query=`update `
}


module.exports={
    createApiKey:createApiKey,
	GetAllApi:GetAllApi
}