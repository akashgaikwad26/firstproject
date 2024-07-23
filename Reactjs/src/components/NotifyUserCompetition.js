import React, { useState } from 'react'
  
import { Button , Typography} from '@mui/material';
import axios from 'axios';
import ApiConfig from '../ApiConfig';
function NotifyUserCompetition() {

  const [file,setFile]=useState()

  function handleFile(e){
setFile(e.target.files[0])
console.log(file.name)

  }
  let uri=new ApiConfig().BaseURI



function sendMail()
{
   console.log("clicked")
   console.log(file.name)
  
  axios.get(`${uri}/sendmail?filePath=${file.name}`).then((result => {
    console.log(result)
      
  
  }))
}


  return (
    <>

    <Typography style={{ 
      border:'2px solid #1c84c3',
    width:'50%',
    position:'relative',
    left:'80px',
    top:'3em',
    bottom:'100px',
    marginBottom:'0px',
    padding:'50px'
  
  }}><Typography style={{position:'relative',
   bottom:'70px',
  paddingLeft:'10px',
  paddingRight:'10px',
  width:'250px',
  fontSize:'20px' ,
  backgroundColor:'white',
   textAlign:'center'}}>Competition Notify</Typography>
  
    <div style={{postion:'relative',rigth:'200px',marginLeft:'200px'}}>
     
   <span style={{
     
   position:'relative',
   bottom:'30px',
   right:'6em'}} > Enter The File Path</span>  
   
     <input style={{
      position:'relative',
     bottom:'30px'}} type='file' onChange={handleFile} placeholder=' Enter The Filepath' /><br />

      
    
      
    
         <Button sx={{
           position:'relative',
           left:'20em',
           marginTop:'15px',
          backgroundColor: '#1c84c3',
          color: 'white',
          "&:hover": {
            backgroundColor: '#fff',
            color: '#1c84c3', fontWeight: 800, border: '3px solid #1c84c3'
          },
        }}onClick={sendMail} >Send Mail</Button>
      
        </div>
        </Typography>

    </>
  )
}

export default NotifyUserCompetition