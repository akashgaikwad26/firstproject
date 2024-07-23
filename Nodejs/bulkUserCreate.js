 
const { Pool, Client, DatabaseError } = require('pg');
let dbconfig = require('./dbconfig');
const pool = new Pool(dbconfig);
var excel = require('./readExcel');
const db_user=require('./dbUser');
const { password } = require('./dbconfig');

 




async function createBulkUser(user_group,Data)
{
  let result;
    cnt=0;
   
      
   console.log(Data.userid)
  let length =Object.keys(Data).length
    console.log("length "+length)
    for(i=0;i<length;i++)
    {
      
      console.log("i "+i)
       userid=Data[i].id
      let password=()=>{let pass=Math.random().toString(36).slice(2)+Math.random().toString(36).toUpperCase().slice(2)
        
        return pass;
      }
       role=Data[i].role
      user_group=user_group;
       
      try{
    result=await db_user.createNewUser(userid,password(),role,user_group);
   console.log(result.status)


     if(result.status==201)
     {
       cnt+=1;
      }
     
    }
    catch(err)
    {
      console.log(err)
    }
    
    
  }
  let message=`number of user inserted are ${cnt} out of ${Data.length }`;
  return {
    message:message,
    statusCode:result.status
  };

 
}
 
 
async function createBulkUserFile(user_group,filePath)
{
  let result;
    cnt=0;
   
    let Data=await excel.GetData(filePath)
    console.log("filePath "+filePath);
    
   let length=Object.keys(Data).length;
  console.log(Data.userid)
     console.log("length "+length)
    for(i=0;i<length;i++)
    {
      
      console.log("i "+i)
       userid=Data[i].userid
      let password=()=>{let pass=Math.random().toString(36).slice(2)+Math.random().toString(36).toUpperCase().slice(2)
        
        return pass;
      }
       role=Data[i].role
      user_group=user_group;
       
      try{
    result=await db_user.createNewUser(userid,password(),role,user_group);
   console.log(result.status)


     if(result.status==201)
     {
       cnt+=1;
      }
     
    }
    catch(err)
    {
      console.log(err)
    }
    
    
  }
  let message=`number of user inserted are ${cnt} out of ${Data.length }`;
  return {
    message:message,
    statusCode:result.status
  };

 
}
 module.exports ={createBulkUser:createBulkUser,
                  createBulkUserFile:createBulkUserFile
};