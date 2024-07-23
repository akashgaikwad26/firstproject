import React from 'react'
// import Select from './Select'
import TextField from '@mui/material/TextField';

import { Button, Typography } from '@mui/material';
// const addUser=()=>{
//   e.target.
// }
import { useState } from 'react';
import axios from 'axios';

import ApiConfig from '../ApiConfig'
// import Alert from './TransitionAlerts'
import papa from 'papaparse';
import { DataGrid } from '@mui/x-data-grid';
import * as XLSX from 'xlsx';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { AlertTitle } from '@mui/material';
import {AiFillFileAdd} from 'react-icons/ai'
import xlfile from './bulk_inactive_users.xlsx'
import Table from './Table';
function BulkRemoveUsers() {

  const [selectFile, setFile] = useState();
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);
   const [msg, setmsg] = useState('')
  const [open, setOpen] = useState(false);
  const [alert,setalert]=useState('')
  const [exceldata,setdata]=useState([])
  let Api=new ApiConfig()
  // function getFile(e) {

  //   setFile(e.target.files[0])
  //   console.log(selectFile)
  //   papa.parse(e.target.files[0], {
  //     header: true,
  //     skipEmptyLines: true,
  //     complete: function (res) {
  //       console.log(res.data)
  //       for (let i = 0; i < res.data.length; i++) {
  //         if (users.indexOf(res.data[i].userid) == -1) {

  //           setUsers(users => users.concat(res.data[i].userid.replace(/^\s+|\s+$/gm,'')))
  //         }
  //       }
  //     }
  //   })

  //   console.log(users)
  // }

  const changeHandler=async(e)=>{
    console.log(e);
    const file=e.target.files[0];
    setFile(e.target.files[0])
    const data=await file.arrayBuffer();
    const workbook=XLSX.read(data)
    console.log("length",workbook.SheetNames.length);
    // console.log(workbook.Sheets[workbook.SheetNames[3]])
    const worksheet=workbook.Sheets[workbook.SheetNames[0]]
    const jsondata=XLSX.utils.sheet_to_json(worksheet);
    setdata(jsondata)
   console.log(jsondata)
  
  
}
  let result = '';



  let rows = []
  for (let i = 0; i < exceldata.length; i++) {
    if (rows.indexOf(exceldata === -1)) {

      rows.push({ id: exceldata[i].userid })
    }
  }
  async function inactivate() {
    if(selectFile==undefined)
    {
      setmsg('please choose file')
      setOpen(true)
      setalert('warning')
    }
    else{
      let uri = new ApiConfig().BaseURI
      let file = selectFile.name
      
      if (data.length > 0) {
        let rows=[]
  for(let i=0;i<data.length;i++)
  {
  
    rows.push({id:data[i]})
  }
        console.log(data)
        let res = await axios.get(Api.addApiKey(`${Api.BaseURI}/bulkUserDelete?data=${JSON.stringify(rows)}`))
        console.log(res.data)
        if (res.data.statusCode == 204) {
          setmsg(`number of user inactivated are ${rows.length} `)
          setOpen(true)
          setalert('success')
        }
        else {
          setmsg(res.data.message)
          setOpen(true)
          setalert('error')
  
        }
      }
      else {
  
  
        let res = await axios.get(Api.addApiKey(`${Api.BaseURI}/bulkUserDelete?data=${JSON.stringify(rows)}`))
        // if (res.data.statusCode == 204) {
  
          console.log(res.data.statusCode)
          result = res.data
          if (res.data.statusCode == 204) {
  
  
            setmsg(`number of user inactivated are ${rows.length}`)
            setOpen(true)
            //  console.log(msg)
            setalert('success')
  
          }
          else {
            setmsg(res.data.message)
            setOpen(true)
            setalert('error')
  
          }
        // }
      }
    }
   
  }



  const columns = [
    // {field:'id',headerName:'id',width:50},
    { field: 'id', headerName: 'User ID', width: 200 }

  ];
  // console.log(alert)
  return (
    <>
      <div style={{
        position: 'absolute',
        //top: '100px',
        height: "calc(100vh-100px)",
        width:'100%'

      }}>




        <Box sx={{
          width: '80%',
          justifyItems: 'center',
          position: 'relative',
          left: '150px',
          // bottom:'50px'
        }}>
          <Collapse in={open}
            sx={{

              justifyItems: 'center'

            }}
          >
            <Alert severity={alert}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >

                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{
                mb: 2, justifyContent: "center",
              }}
            ><AlertTitle>        {msg}
              </AlertTitle>

            </Alert>
          </Collapse>
        </Box>

        <Typography sx={{
          width: '82%',
          height: 685, //625
          boxShadow: 8,
          position: 'relative',
          left: '80px',
          top: '120px',
          bottom: '100px',
          marginBottom: '200px',
          padding: '50px',
          borderRadius: '20px',
        }}>
          
        <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '50px'
        }}>
          

      <Typography style={{
          position: 'relative',
          // right: '1em',
          color: '#1c84c3',
          //bottom: '50px',
          fontWeight: 700,
          //width: '110px',
          fontSize: '20px',
          backgroundColor: 'white',
          textAlign: 'center',
          borderRadius: '10px',
          //marginTop: '40px'
      }}> Inactive users</Typography>
      
        </div>
<div className='select-file'>
          <div style={{
          // postion: 'relative', rigth: '200px', color: '#1c84c3',
          // marginLeft: '00px'
          }}>

            <span className='select-text'
               style={{
                // marginBottom:'.5rem'
              //marginLeft: '40px',
              // paddingLeft: '14px',
              // position: 'relative',
              // bottom: '3rem',
              // right:'.9rem'
            }} >Select users from file </span>

          <span
          style={{
            // margin: '0px',
            // padding: '0px',
            // // marginLeft: '40px',
            // //         paddingLeft: '40px',
            // borderRadius: '10px',
            // position: 'relative',
            // bottom: '2.2rem',
            // left: '2rem'
          }}>

          <label htmlFor='file'>
            <AiFillFileAdd 
            style={{
              // margin: '0px',
              // padding: '0px',
              width: '2rem',
              height: '2rem'
            }}
            />
          </label>

            <input style={{
              width:'1px',
              height:'1px',
              //  marginLeft:'40px',
              //  paddingLeft:'40px',
              // position: 'relative',
              // bottom: '2rem',
              // right: '8rem'
              size:'1px'
            }} type='file' onChange={changeHandler} id='file' /><br />
            </span>
           
       </div>
       <a href={xlfile}
              download="Sample_Inactive_Users"
              target="_blank" rel="noreferrer">
              <button
                style={{ display: "flex", alignItems: "center" }}
                className="link-button small"
              >
                {/* <CgAsterisk color="red"/>-All Fields Required */}
                Download sample file
              </button>
       </a>
       </div>
          {/* <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[3]}
            checkboxSelection
            sx={{
              width: '100%',
              height: 400,
              postion: 'relative', top: 'em', left: '0em', boxShadow: 8,
              border: '2px solid #1c84c3',
            }}
            onSelectionModelChange={item => setData(item)}
          /> */}
          <Table
          rows={rows}
          headers={columns}
          setSelected={setData}
          data={data}
          />
          <Button 
          className='button primary'
          sx={{
            position: 'relative',
            //left: '55em',
            margin: '55px 525px',
            bottom: '1rem',
            boxShadow: 8, 
            width:'fit-content'
            //marginTop: '15px',
            // backgroundColor: '#1c84c3',
            // color: 'white',
            // "&:hover": {
            //   backgroundColor: '#fff',
            //   color: '#1c84c3', fontWeight: 600, border: '2px solid #1c84c3'
            // },
          }} 
          onClick={inactivate} >Inactivate users</Button>

         

        </Typography>

      </div>

    </>
  )
}

export default BulkRemoveUsers