import React from 'react'
import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import * as XLSX from 'xlsx';
import { DataGrid } from '@mui/x-data-grid';
import * as moment from 'moment';
import Apiconfig from '../ApiConfig';
import PulseLoader from "react-spinners/PulseLoader";
import './BulkAdduserDetails.css';
import axios from 'axios';
// import papa from 'papaparse'

import { Box,Collapse,Alert,CloseIcon, IconButton,AlertTitle} from '@mui/system'; 
function BulkAddUserdetails() {
    const [exceldata,setdata]=useState(null)
let Api=new Apiconfig();
// console.log(exceldata)

const [isLoading, setIsLoading] = useState(false);

const [dataselected,setselectedRows]=useState("");


const HandleFile=async(e)=>{
    console.log(e);
    const file=e.target.files[0];
    const data=await file.arrayBuffer();
    const workbook=XLSX.read(data)
    console.log("length",workbook.SheetNames.length);
    // console.log(workbook.Sheets[workbook.SheetNames[3]])
    const worksheet=workbook.Sheets[workbook.SheetNames[0]]
    const jsondata=XLSX.utils.sheet_to_json(worksheet);
    setdata(jsondata)
   console.log(jsondata)
}

function namesplitter(s,name){

  let s1='';
  let str=s.trim()
  if(str.includes(' ')==true){


    if(name=='first'){
      let i=0;

      while(str[i]!=' '){
        // console.log("s",s[i])
          s1=s1+str[i]
      
          i++
      }
  }
  else
  {
      let i=str.length-1;
      while(str[i]!=' '){
          s1=str[i]+s1;
          i--;
        
      }
      
  }
 
}



else{
  if(name=='first'){
  s1=str;
  }
  else{
    s1=undefined;
  }
}




  return s1;
  }

  const override = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20px",
    // borderColor: "olive",
    // backgroundColor: "red",
    // width: "100%",
  };


function checkproperty(firstname){
  let hh='';
  if(firstname!=undefined){
    hh=namesplitter(firstname,'first')
  }
  else{
    hh=undefined;
  }
  return hh;
}

function checkproperty1(firstname)
{
  let hh='';
  if(firstname!=undefined){
    hh=namesplitter(firstname,'second')
  }
  else{
    hh=undefined;
  }
  return hh;
}
// function changeHandler(event) {
//   // setSelectedFile(event.target.files[0]);
//   const file=event.target.files[0];

//   console.log(event.target.files[0])
//   // file = selectedFile
//   console.log('file', file)

//   // console.log(selectedFile)
//   papa.parse(event.target.files[0], {
//     header: true,
//     skipEmptyLines: true,
//     complete: function (res) {
//       console.log(res.data)
//       for (let i = 0; i < res.data.length; i++) {
//         // setUserid(userid => userid.concat(res.data[i].userid));
//         // setRole(role => role.concat(res.data[i].role));
//         console.log(res.data[i]);

//       }
//     }
//   })

// };


    // GetData('userGroup.csv');
    
 const handleSubmit=()=>{
  let obj={dataselected};
  setIsLoading(true)
  console.log("length",JSON.stringify(dataselected).length);
    axios.post(Api.addApiKey(`${Api.BaseURI}/adduserdetails`),obj).then((res)=>{
      setIsLoading(false)
      alert(res.data.message);
      console.log("not inserted data",res.data.notadded)
     
    })
 } 

 const columns = [
  // {field:'id',headerName:'id',width:50},
  { field: 'id', headerName: 'ID', width: 200 },
  { field: 'First_Name', headerName: 'First_Name', width: 130 },
  { field: 'Last_Name', headerName: 'Last_Name', width: 130 },
  {
    field: 'MobileNo',
    headerName: 'MobileNo',
    width: 200,
  },
  { field: 'Gender', headerName: 'Gender', width: 100 },
  { field: 'Country', headerName: 'Country', width: 100 }, 
  { field: 'State', headerName: 'State', width: 100 },
  { field: 'City', headerName: 'City', width: 100 },
  { field: 'Education', headerName: 'Education', width: 100 },
  { field: 'Degree', headerName: 'Degree', width: 100 },
  { field: 'College', headerName: 'College', width: 100 },
  {field:'date_of_birth',headerName:'date_of_birth',width:100}

];
    
let rows=[];
if(exceldata!==null){
 
  // console.log("exceldata",exceldata);
for (let i = 0; i < exceldata.length; i++) {

  if (rows.indexOf(exceldata === -1))
  
    rows.push({ id: exceldata[i].Email,Email:exceldata[i].Email,First_Name:exceldata[i].hasOwnProperty('First_Name')==true?checkproperty(exceldata[i].First_Name):exceldata[i].First_Name,Last_Name:exceldata[i].hasOwnProperty('Last_Name')==true?exceldata[i].Last_Name:checkproperty1(exceldata[i].First_Name), MobileNo:exceldata[i].MobileNo, Gender:exceldata[i].Gender ,Country:exceldata[i].Country,State:exceldata[i].State,City:exceldata[i].City,Education:exceldata[i].Education,Degree:exceldata[i].Degree,College:exceldata[i].College,date_of_birth:exceldata[i].date_of_birth==undefined?'NA':moment(exceldata[i].date_of_birth).format("YYYY-MM-DD")})
}
}
    return(
        <div style={{ height: 400, width: '80%',boxShadow:8, marginBottom: 0, position: 'relative', top:'8rem', marginLeft: '75px' }}>
          <Box sx={{
              width: '80%',
              justifyItems: 'center',
              position: 'relative',
              left: '150px',
              top: '80px'
              // bottom:'50px'
            }}>

          <Button
          className='button primary'
          sx={{
                      position: 'relative',
                      left: '21rem',
                      bottom: '5.5rem',
                      boxShadow: 8
                      , marginTop: '15px',
                      // backgroundColor: '#1c84c3',
                      // color: 'white',
                      // "&:hover": {
                      //   backgroundColor: '#fff',
                      //   color: '#1c84c3', fontWeight: 600, border: '2px solid #1c84c3'
                      // },
          }}
           onClick={()=>{handleSubmit()}}>Add user details</Button>
        <div>  ;

          {/* <Button sx={{
            position: 'relative',
            left: '21rem',
            bottom: '5.5rem',
            boxShadow: 8
            , marginTop: '15px',
            backgroundColor: '#1c84c3',
            color: 'white',
            "&:hover": {
              backgroundColor: '#fff',
              color: '#1c84c3', fontWeight: 600, border: '2px solid #1c84c3'
            },
          }} onClick={()=>{handleSubmit()}}>Create</Button> */}

             <input style={{
            marginRight:'0.5rem',
            // marginLeft='0.5rem',
            position: 'relative',
            marginInlineStart: '0rem',
            bottom: '8.7rem', //5rem
            padding: '8.5px',
            boxShadow: 8
            , marginTop: '15px',
            backgroundColor: '#1c84c3',
            color: 'white',
            "&:hover": {
              backgroundColor: '#fff',
              color: '#1c84c3', fontWeight: 600, border: '2px solid #1c84c3'
            },
          }} type="file" onChange={(e)=>{HandleFile(e)
            // changeHandler(e)
          }}/>
            {/* <button onClick={()=>{handleSubmit()}}>ADD</button> */}
            </div>   
     </Box>
    {
      isLoading&&<PulseLoader
      color="#1c84c3"
      loading={isLoading}
      cssOverride={override}
      size={10}
      className='pulse-loader'
      aria-label="Loading Spinner"
      data-testid="loader"
      speedMultiplier={.5}
    />
    }
     {exceldata!==null?       <DataGrid
        rows={rows}
        columns={columns}
        pageSize={12}
        rowsPerPageOptions={[14]}
        // checkboxSelection
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRows = rows.filter((row) =>
            selectedIDs.has(row.id),
          );
  
          setselectedRows(selectedRows);
          
        }}
        checkboxSelection
        // onSelectionModelChange={rows => setdata(rows)}
        sx={{ postion: 'relative', top: '4em',boxShadow:8,
        border: '2px solid #1c84c3',
          }}
        // onSelectionModelChange={item => setData(item)}
      />:""}
     


      </div>
        
          

    )
}


export default BulkAddUserdetails;