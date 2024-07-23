const email=require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
 const readcsv=require('./readExcel');
 const { Pool, Client, DatabaseError } = require('pg');
let dbconfig = require('./dbconfig');
const pool = new Pool(dbconfig);
 const path=require('path')
 const dbConstants=require('./dbConstants')
 const dbErrorHandler=require('./dbErrorHandler');

 const getUserMasterTable=dbConstants.getUserMasterTable()
 const getUserMailHistoryTable=dbConstants.getUserMailHistoryTable()

async function sendMail(filePath,type){

// let filePath='mailTestData.csv';
var result='';
let cnt=0;
//  var data=await readcsv.GetData(filePath);
var notsent=[]
try{

    let transporter=email.createTransport({
        
        pool:true,
        maxConnections:100,
        maxMassages:'100',
        host:'smtp.gmail.com',
        port:587,
    // secure:false,
    // requireTLS:true,
    
    auth:{
         
        // user:'ganeshpswami184@gmail.com',
        // pass:'irevhleanwnoypxw'
        user:'javed.inamdar@datasciencelab.in',
        pass:'tfnatvxamojafxud'
       
    }
    
    
});
console.log(filePath)

for(i=0;i<filePath.length;i++)
{
    console.log(filePath[i]);
    const handlebarsOptions={
        viewEngine: {
            partialsDir: path.resolve('./views/'),
            defaultLayout: false,
        },
        viewPath: path.resolve('./views/'),
    }
    transporter.use('compile',hbs(handlebarsOptions));
    
    let sql=`SELECT count(password),password FROM ${getUserMasterTable} WHERE userid='${filePath[i]}' group by password`;
    var password= await pool.query(sql)
     console.log(password.rowCount)
    if(password.rows[0].count>0)
    {
        cnt+=1;

              
        
    
        let name=filePath[i]
        name=name.substring(0,name.indexOf('@'))
        if(type==='WELCOME-USER')
        {
            var mailOptions={
                from:'javed.inamdar@datasciencelab.in',
                to:filePath[i],
                subject:'Welcome To Pravinyam',
            template:type,
            context:{
                name:name,
                userid:filePath[i],
                password:password.rows[0].password,
                link:'https://octopus-app-wb3kb.ondigitalocean.app/'
            }
        }
        
    }
    else if(type==='GENERAL')
    {
        var mailOptions={
            from:'javed.inamdar@datasciencelab.in',
            to:filePath[i],
            subject:'Welcome To Pravinyam',
            template:type,
            context:{
                name:name
                
            }
        }
    }
    else{
        var mailOptions={
            from:'javed.inamdar@datasciencelab.in',
            to:filePath[i],
            subject:'Welcome To Pravinyam',
            template:type,
            context:{
                name:name
            }
        }
    }
    
 

    transporter.sendMail(mailOptions,(err,info)=>{
        
        if(err)
        {
            console.log(err.message)
            
            
            // return  result
        } 
        else{
            let name= filepath[i]
            console.log('name',name);
            
            let sql2=`insert into ${getUserMailHistoryTable} values('${name}',current_timestamp,'${type}')`;
            var result1=pool.query(sql2).then(res=>{
                
                console.log("insert ",result1)
                
                console.log(info.response);
                
            });
            transporter.close()
            
        }
        
        
        
        
        
    })
 
}
    else{
        notsent.push(filePath[i])

    }
  
    // pool.end().then((result,err)=>{
        // if (err) throw err
        // else{
            //     console.log(result)
            // }
            // })
            // let value=await pool.end()
        }
        console.log("not sent ",notsent)
    result= `email sent Successfully are ${cnt} out of ${filePath.length}`;
    return result
    } 
    catch (error) {
        console.log(error);
        let result=await dbErrorHandler.ErrorHandler(error)
       return result
    }


}


async function sendMailfile(filePath,type){

    // let filePath='mailTestData.csv';
    var result='';
     var data=await readcsv.GetData(filePath);
    let transporter=email.createTransport({
    pool:true,
    maxConnections:20,
    maxMassages:100,
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        
        auth:{
            user:'ganeshpswami184@gmail.com',
            pass:'irevhleanwnoypxw'
            
        }
    
    
    });
    console.log(data)
    
    for(i=0;i<data.length;i++)
    {
        const handlebarsOptions={
            viewEngine: {
                partialsDir: path.resolve('./views/'),
                defaultLayout: false,
            },
            viewPath: path.resolve('./views/'),
        }
        transporter.use('compile',hbs(handlebarsOptions));
        
        let sql=`SELECT password FROM public.pravinyam_usermaster WHERE userid='${data[i].userid}'`;
         var password= await pool.query(sql)
        //  console.log(password.rows[0].password)
         
    
        
         
            
        
        var mailOptions={
            from:'ganeshpswami184@gmail.com',
            to:data[i].userid,
            subject:'Welcome To Pravinyam',
            template:type,
            context:{
                role:data[i].role,
                userid:data[i].userid,
                // password:password.rows[0].password
            }
        }
    
        transporter.sendMail(mailOptions,(err,info)=>{
            if(err)
            {
                console.log(err)
            } 
            else{
        //         let sql2=`insert into public.user_mail_send_history values('${data[i].userid}',current_timestamp,'WELCOME-USER')`;
        //  var result1=pool.query(sql2).then(res=>{
    
        //      console.log("insert ",result1)
        //             result="<h1>Eamil Send Successfully</>"
        
        //             console.log(info.response);
                    
        //  });
       
            }
             
    
            
            
            
        })
        transporter.close
    }
    console.log(result)
    // pool.end().then((result,err)=>{
    // if (err) throw err
    // else{
    //     console.log(result)
    // }
    // })
    // let value=await pool.end()
    return result;
    
    
    }


    // sendMailfile('mailTestData.csv','WELCOME-USER').then(res=>{
    //     console.log(res)
    // })

module.exports={
    sendMail:sendMail
}
 