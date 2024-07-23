 
const { Pool, Client, DatabaseError } = require('pg');
let dbconfig = require('./dbconfig');
const pool = new Pool(dbconfig);
var excel = require('./readExcel');
const db_user=require('./dbUser');
const { password } = require('./dbconfig');

 




async function deleteBulkUser(Data)
{
    cnt=0;
   
      let length=Object.keys(Data).length
    console.log('length ',length)
    for(i=0;i<length;i++)
    {
      
      
    userid=Data[i].id
    console.log(userid)
   try{

     var result=await db_user.deleteUser(userid);
      if(result.status==204)
     {
       cnt+=1;
      }
      else
      {
        console.log("eamil "+userid);
        console.log("fail to delete")
      }
    }
    catch(err)
    {
      console.log(err);
    }
    
    
  }
  let message=`number of user deleted are ${cnt}`;
  return {
    message:message,
    statusCode:204
  };

 
}

async function deleteBulkUserFile(filePath)
{
    cnt=0;
   
    let Data=await excel.GetData(filePath)
    console.log("filePath "+filePath);
    let length=Object.keys(Data).length
    console.log('length ',length)
    for(i=0;i<length;i++)
    {
      
      
    userid=Data[i].userid
    console.log(userid)
   try{

     var result=await db_user.deleteUser(userid);
      if(result.status==204)
     {
       cnt+=1;
      }
      else
      {
        console.log("eamil "+userid);
        console.log("fail to delete")
      }
    }
    catch(err)
    {
      console.log(err);
    }
    
    
  }
  let message=cnt;
  return {
    message:cnt,
    statusCode:204
  };

 
}

async function deleteBulkUserFile(filePath)
{
    cnt=0;
   
    let Data=await excel.GetData(filePath)
    console.log("filePath "+filePath);
    let length=Object.keys(Data).length
    console.log('length ',length)
    for(i=0;i<length;i++)
    {
      
      
      // console.log(Data[i].userid)
   userid=Data[i].userid
    console.log(userid)
   try{

     var result=await db_user.deleteUser(userid);
     //    console.log(result.status)
     if(result.status==204)
     {
       cnt+=1;
      }
      else
      {
        console.log("eamil "+userid);
        console.log("fail to delete")
      }
    }
    catch(err)
    {
      console.log(err);
    }
    
    
  }
  let message=`number of user deleted are ${cnt}`;
  return {
    message:message,
    statusCode:204
  };

 
}

 

  

module.exports ={deleteBulkUser:deleteBulkUser,
                  deleteBulkUserFile:deleteBulkUserFile
};